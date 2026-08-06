<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');

function respond(int $status, array $body, array $headers = []): never {
    http_response_code($status);
    foreach ($headers as $name => $value) header($name . ': ' . $value);
    echo json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function header_value(string $name): string {
    $key = 'HTTP_' . strtoupper(str_replace('-', '_', $name));
    return trim((string)($_SERVER[$key] ?? ''));
}

function clean_string(mixed $value, int $max): string {
    if (!is_string($value)) return '';
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F<>]/u', '', $value) ?? '';
    return trim(substr($value, 0, $max));
}

function next_business_due(bool $priority): string {
    $due = new DateTimeImmutable('now', new DateTimeZone('UTC'));
    if ($priority) return $due->modify('+1 hour')->format(DATE_ATOM);
    $due = $due->modify('+1 day');
    while (in_array((int)$due->format('N'), [6, 7], true)) $due = $due->modify('+1 day');
    return $due->format(DATE_ATOM);
}

function operational_log(string $storage, string $submissionId, string $state): void {
    $entry = json_encode([
        'at' => gmdate(DATE_ATOM),
        'submission_hash' => hash('sha256', $submissionId),
        'state' => $state,
    ], JSON_UNESCAPED_SLASHES) . PHP_EOL;
    @file_put_contents($storage . DIRECTORY_SEPARATOR . 'operations.log', $entry, FILE_APPEND | LOCK_EX);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['accepted' => false, 'error_code' => 'method_not_allowed', 'message' => 'Use POST.', 'retryable' => false]);
}

$origin = header_value('Origin');
if ($origin !== '') {
    $originHost = strtolower((string)parse_url($origin, PHP_URL_HOST));
    if (!in_array($originHost, ['bestbuyincentives.com', 'www.bestbuyincentives.com'], true)) {
        respond(403, ['accepted' => false, 'error_code' => 'origin_rejected', 'message' => 'Origin rejected.', 'retryable' => false]);
    }
}

$length = (int)($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($length <= 0 || $length > 32768) respond(413, ['accepted' => false, 'error_code' => 'validation_failed', 'message' => 'Request size is invalid.', 'retryable' => false]);

try {
    $raw = file_get_contents('php://input');
    $input = json_decode($raw ?: '', true, 32, JSON_THROW_ON_ERROR);
} catch (Throwable $error) {
    respond(400, ['accepted' => false, 'error_code' => 'validation_failed', 'message' => 'Invalid JSON.', 'retryable' => false]);
}
if (!is_array($input)) respond(400, ['accepted' => false, 'error_code' => 'validation_failed', 'message' => 'Invalid request.', 'retryable' => false]);

$submissionId = clean_string($input['submission_id'] ?? '', 100);
$idempotency = header_value('Idempotency-Key');
if (!preg_match('/^[A-Za-z0-9][A-Za-z0-9._:-]{15,99}$/', $submissionId) || !hash_equals($submissionId, $idempotency)) {
    respond(400, ['accepted' => false, 'error_code' => 'validation_failed', 'message' => 'Idempotency key is missing or invalid.', 'retryable' => false]);
}

$documentRoot = realpath((string)($_SERVER['DOCUMENT_ROOT'] ?? '')) ?: '';
$storage = trim((string)getenv('BBI_PRIVATE_STORAGE_DIR'));
if ($storage === '') $storage = dirname($documentRoot) . DIRECTORY_SEPARATOR . 'bbi-private';
if (!is_dir($storage) && !@mkdir($storage, 0700, true)) respond(503, ['accepted' => false, 'error_code' => 'delivery_unavailable', 'message' => 'Request storage is temporarily unavailable.', 'retryable' => true]);
$storageReal = realpath($storage) ?: '';
if ($storageReal === '' || ($documentRoot !== '' && str_starts_with(strtolower($storageReal), strtolower($documentRoot)))) {
    respond(503, ['accepted' => false, 'error_code' => 'delivery_unavailable', 'message' => 'Private request storage is not configured.', 'retryable' => true]);
}
foreach (['consultations', 'rate-limits'] as $directory) if (!is_dir($storageReal . DIRECTORY_SEPARATOR . $directory)) @mkdir($storageReal . DIRECTORY_SEPARATOR . $directory, 0700, true);

$rateSecret = trim((string)getenv('BBI_RATE_LIMIT_SECRET'));
if (strlen($rateSecret) < 32) respond(503, ['accepted' => false, 'error_code' => 'delivery_unavailable', 'message' => 'Request security is not configured.', 'retryable' => true]);
$ipHash = hash_hmac('sha256', (string)($_SERVER['REMOTE_ADDR'] ?? 'unknown'), $rateSecret);
$rateFile = $storageReal . DIRECTORY_SEPARATOR . 'rate-limits' . DIRECTORY_SEPARATOR . $ipHash . '.json';
$now = time();
$rate = ['window_started' => $now, 'count' => 0];
if (is_file($rateFile)) {
    $storedRate = json_decode((string)@file_get_contents($rateFile), true);
    if (is_array($storedRate) && ($now - (int)($storedRate['window_started'] ?? 0)) < 900) $rate = $storedRate;
}
if (($now - (int)$rate['window_started']) >= 900) $rate = ['window_started' => $now, 'count' => 0];
$rate['count'] = (int)$rate['count'] + 1;
@file_put_contents($rateFile, json_encode($rate), LOCK_EX);
@chmod($rateFile, 0600);
if ($rate['count'] > 10) respond(429, ['accepted' => false, 'error_code' => 'rate_limited', 'message' => 'Too many requests. Try again later.', 'retryable' => true], ['Retry-After' => '900']);

if (clean_string($input['website_honeypot'] ?? '', 100) !== '') respond(422, ['accepted' => false, 'error_code' => 'spam_rejected', 'message' => 'Request rejected.', 'retryable' => false]);

$allowed = [
    'industry' => ['Automotive', 'Home improvement', 'Real estate', 'Financial services', 'B2B services', 'Other high-ticket sales'],
    'sales_use_case' => ['Close qualified deals faster', 'Increase close rate', 'Create urgency without deeper discounting', 'Re-engage stalled opportunities', 'Equip a sales team with a closing tool', 'Other'],
    'sales_team_size' => ['', '1', '2–5', '6–20', '21–50', '51+'],
    'typical_sale_value' => ['', 'Under $2,500', '$2,500–$9,999', '$10,000–$24,999', '$25,000–$99,999', '$100,000+'],
    'estimated_eligible_transactions' => ['', '1–5', '6–15', '16–50', '51–100', '101+'],
    'timeline' => ['', 'Immediately', 'Within 30 days', 'Within 60 days', 'Within 90 days', 'Researching'],
];
$limits = ['full_name' => 160, 'work_email' => 254, 'company' => 160, 'role' => 120, 'phone' => 40, 'message' => 1500];
$data = [];
foreach ($limits as $field => $max) $data[$field] = clean_string($input[$field] ?? '', $max);
foreach ($allowed as $field => $values) {
    $data[$field] = clean_string($input[$field] ?? '', 120);
    if (!in_array($data[$field], $values, true)) respond(422, ['accepted' => false, 'error_code' => 'validation_failed', 'message' => 'One or more fields are invalid.', 'retryable' => false, 'field_errors' => [$field => 'Select a valid option.']]);
}
$required = ['full_name', 'work_email', 'company', 'industry', 'sales_use_case'];
$fieldErrors = [];
foreach ($required as $field) if (($data[$field] ?? '') === '') $fieldErrors[$field] = 'Required.';
if ($data['work_email'] !== '' && !filter_var($data['work_email'], FILTER_VALIDATE_EMAIL)) $fieldErrors['work_email'] = 'Enter a valid email.';
if ($fieldErrors) respond(422, ['accepted' => false, 'error_code' => 'validation_failed', 'message' => 'Complete the required fields.', 'retryable' => false, 'field_errors' => $fieldErrors]);

$hidden = ['original_landing_page', 'original_referrer', 'original_source', 'original_medium', 'original_campaign', 'original_content', 'original_term', 'first_seen_at', 'converting_page', 'converting_referrer', 'latest_source', 'latest_medium', 'latest_campaign', 'latest_content', 'latest_term', 'content_id', 'page_type', 'industry_source', 'conversion_method'];
$attribution = [];
foreach ($hidden as $field) $attribution[$field] = clean_string($input[$field] ?? '', str_contains($field, 'page') || str_contains($field, 'referrer') ? 2048 : 300);
if ($attribution['first_seen_at'] === '' || strtotime($attribution['first_seen_at']) === false) respond(422, ['accepted' => false, 'error_code' => 'validation_failed', 'message' => 'Attribution timestamp is invalid.', 'retryable' => false]);

$priority = in_array($data['timeline'], ['Immediately', 'Within 30 days'], true)
    || in_array($data['estimated_eligible_transactions'], ['51–100', '101+'], true)
    || in_array($data['typical_sale_value'], ['$25,000–$99,999', '$100,000+'], true);
$nextActionDue = next_business_due($priority);
$safeFile = hash('sha256', $submissionId) . '.json';
$recordPath = $storageReal . DIRECTORY_SEPARATOR . 'consultations' . DIRECTORY_SEPARATOR . $safeFile;
if (is_file($recordPath)) {
    $existing = json_decode((string)@file_get_contents($recordPath), true);
    respond(202, ['accepted' => true, 'submission_id' => $submissionId, 'durable_state' => (string)($existing['durable_state'] ?? 'retry_queue_created'), 'qualification_status' => (string)($existing['qualification_status'] ?? 'new'), 'next_action_due_at' => (string)($existing['next_action_due_at'] ?? $nextActionDue)]);
}

$record = [
    'schema_version' => '1.0.0', 'submission_id' => $submissionId, 'lead_created_at' => gmdate(DATE_ATOM),
    'durable_state' => 'retry_queue_created', 'qualification_status' => 'new',
    'priority' => $priority, 'next_action_due_at' => $nextActionDue,
    'contact' => $data, 'attribution' => $attribution,
    'delivery' => ['crm_attempts' => 0, 'crm_delivered_at' => null, 'last_error_code' => null],
];
$handle = @fopen($recordPath, 'x');
if ($handle === false) {
    if (is_file($recordPath)) {
        $existing = json_decode((string)@file_get_contents($recordPath), true);
        respond(202, ['accepted' => true, 'submission_id' => $submissionId, 'durable_state' => (string)($existing['durable_state'] ?? 'retry_queue_created'), 'qualification_status' => (string)($existing['qualification_status'] ?? 'new'), 'next_action_due_at' => (string)($existing['next_action_due_at'] ?? $nextActionDue)]);
    }
    respond(503, ['accepted' => false, 'error_code' => 'delivery_unavailable', 'message' => 'Request could not be stored.', 'retryable' => true]);
}
$written = fwrite($handle, json_encode($record, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
fflush($handle); fclose($handle); @chmod($recordPath, 0600);
if ($written === false || $written < 100) { @unlink($recordPath); respond(503, ['accepted' => false, 'error_code' => 'delivery_unavailable', 'message' => 'Request could not be stored.', 'retryable' => true]); }
operational_log($storageReal, $submissionId, 'retry_queue_created');

$recipient = (string)(getenv('BBI_SALES_NOTIFICATION_EMAIL') ?: 'sales@bestbuyincentives.com');
$subject = ($priority ? '[PRIORITY] ' : '') . 'New BBI consultation: ' . $data['company'];
$message = "A new consultation is durably queued.\nSubmission: {$submissionId}\nCompany: {$data['company']}\nContact: {$data['full_name']}\nWork email: {$data['work_email']}\nPhone: {$data['phone']}\nIndustry: {$data['industry']}\nUse case: {$data['sales_use_case']}\nNext action due: {$nextActionDue}\n";
@mail($recipient, $subject, $message, "From: website@bestbuyincentives.com\r\nReply-To: {$data['work_email']}\r\n");

$webhook = trim((string)getenv('BBI_CRM_WEBHOOK_URL'));
if ($webhook !== '' && function_exists('curl_init')) {
    $curl = curl_init($webhook);
    $headers = ['Content-Type: application/json', 'Idempotency-Key: ' . $submissionId];
    $token = trim((string)getenv('BBI_CRM_WEBHOOK_TOKEN'));
    if ($token !== '') $headers[] = 'Authorization: Bearer ' . $token;
    curl_setopt_array($curl, [CURLOPT_POST => true, CURLOPT_POSTFIELDS => json_encode($record), CURLOPT_HTTPHEADER => $headers, CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 5, CURLOPT_CONNECTTIMEOUT => 3]);
    curl_exec($curl); $status = (int)curl_getinfo($curl, CURLINFO_HTTP_CODE); curl_close($curl);
    $record['delivery']['crm_attempts'] = 1;
    if ($status >= 200 && $status < 300) {
        $record['durable_state'] = 'crm_created'; $record['delivery']['crm_delivered_at'] = gmdate(DATE_ATOM);
        operational_log($storageReal, $submissionId, 'crm_created');
    } else $record['delivery']['last_error_code'] = 'crm_http_' . $status;
    @file_put_contents($recordPath, json_encode($record, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);
}

respond(202, ['accepted' => true, 'submission_id' => $submissionId, 'durable_state' => $record['durable_state'], 'qualification_status' => 'new', 'next_action_due_at' => $nextActionDue]);
