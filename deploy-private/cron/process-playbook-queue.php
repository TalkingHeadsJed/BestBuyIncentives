<?php
declare(strict_types=1);

// Bounded-backoff retry of durably-queued playbook-download leads to the CRM.
// Mirrors process-consultation-queue.php but targets the playbook-leads queue.

if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }

$storage = trim((string)getenv('BBI_PRIVATE_STORAGE_DIR'));
$webhook = trim((string)getenv('BBI_CRM_WEBHOOK_URL'));
$token = trim((string)getenv('BBI_CRM_WEBHOOK_TOKEN'));
if ($storage === '' || $webhook === '' || !function_exists('curl_init')) { fwrite(STDERR, "Private storage, CRM webhook, and PHP curl are required.\n"); exit(2); }
$queue = realpath($storage . DIRECTORY_SEPARATOR . 'playbook-leads');
if ($queue === false) { fwrite(STDERR, "Playbook queue is unavailable.\n"); exit(2); }

$processed = 0; $delivered = 0; $failed = 0;
foreach (array_slice(glob($queue . DIRECTORY_SEPARATOR . '*.json') ?: [], 0, 100) as $file) {
    $handle = @fopen($file, 'c+');
    if ($handle === false || !flock($handle, LOCK_EX | LOCK_NB)) { if (is_resource($handle)) fclose($handle); continue; }
    $raw = stream_get_contents($handle); $record = json_decode($raw ?: '', true);
    if (!is_array($record) || ($record['durable_state'] ?? '') === 'crm_created') { flock($handle, LOCK_UN); fclose($handle); continue; }
    $attempts = (int)($record['delivery']['crm_attempts'] ?? 0);
    $lastAttempt = strtotime((string)($record['delivery']['last_attempt_at'] ?? '1970-01-01')) ?: 0;
    $delay = min(21600, 60 * (2 ** min($attempts, 8)));
    if (time() - $lastAttempt < $delay) { flock($handle, LOCK_UN); fclose($handle); continue; }
    $submissionId = (string)($record['submission_id'] ?? '');
    $headers = ['Content-Type: application/json', 'Idempotency-Key: ' . $submissionId];
    if ($token !== '') $headers[] = 'Authorization: Bearer ' . $token;
    $curl = curl_init($webhook);
    curl_setopt_array($curl, [CURLOPT_POST => true, CURLOPT_POSTFIELDS => json_encode($record), CURLOPT_HTTPHEADER => $headers, CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 10, CURLOPT_CONNECTTIMEOUT => 5]);
    curl_exec($curl); $status = (int)curl_getinfo($curl, CURLINFO_HTTP_CODE); curl_close($curl);
    $record['delivery']['crm_attempts'] = $attempts + 1;
    $record['delivery']['last_attempt_at'] = gmdate(DATE_ATOM);
    if ($status >= 200 && $status < 300) {
        $record['durable_state'] = 'crm_created'; $record['delivery']['crm_delivered_at'] = gmdate(DATE_ATOM); $record['delivery']['last_error_code'] = null; $delivered++;
    } else { $record['delivery']['last_error_code'] = 'crm_http_' . $status; $failed++; }
    ftruncate($handle, 0); rewind($handle); fwrite($handle, json_encode($record, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)); fflush($handle); flock($handle, LOCK_UN); fclose($handle); @chmod($file, 0600); $processed++;
}
echo json_encode(['processed' => $processed, 'delivered' => $delivered, 'failed' => $failed], JSON_UNESCAPED_SLASHES) . PHP_EOL;
