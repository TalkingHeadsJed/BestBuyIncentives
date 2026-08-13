<?php
declare(strict_types=1);

// First-party, same-origin gated-download lead endpoint for the High-Ticket
// Closing Playbook. Mirrors the consultation endpoint's durable-acceptance,
// idempotency, rate-limit, attribution and CRM-webhook + retry-queue contract.

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');

const PLAYBOOK_DOWNLOAD_URL = '/downloads/BestBuyIncentives_High-Ticket_Closing_Playbook.pdf';
// Server-side registry: a client can only unlock a known asset (never an arbitrary path).
const ASSET_DOWNLOADS = [
    'high-ticket-closing-playbook' => '/downloads/BestBuyIncentives_High-Ticket_Closing_Playbook.pdf',
    'discounted-travel-voucher-one-page-guide' => '/downloads/BestBuyIncentives_Discounted-Travel-Voucher_One-Page-Guide.pdf',
    'revenue-dashboard' => '/downloads/BestBuyIncentives_Revenue_Dashboard.xlsx',
    'sales-team-training-script' => '/downloads/BestBuyIncentives_Sales-Team_Training-Script.txt',
];

const FREE_EMAIL_DOMAINS = [
    'gmail.com', 'googlemail.com', 'yahoo.com', 'ymail.com', 'rocketmail.com',
    'hotmail.com', 'hotmail.co.uk', 'outlook.com', 'live.com', 'msn.com',
    'aol.com', 'icloud.com', 'me.com', 'mac.com', 'protonmail.com', 'proton.me',
    'pm.me', 'gmx.com', 'gmx.net', 'mail.com', 'yandex.com', 'zoho.com',
    'hey.com', 'fastmail.com', 'tutanota.com', 'hushmail.com',
];

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
function is_business_email(string $email): bool {
    $email = strtolower(trim($email));
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) return false;
    $domain = substr(strrchr($email, '@') ?: '', 1);
    if ($domain === '') return false;
    if (in_array($domain, FREE_EMAIL_DOMAINS, true)) return false;
    foreach (FREE_EMAIL_DOMAINS as $free) if (str_ends_with($domain, '.' . $free)) return false;
    return true;
}
function operational_log(string $storage, string $submissionId, string $state): void {
    $entry = json_encode(['at' => gmdate(DATE_ATOM), 'submission_hash' => hash('sha256', $submissionId), 'state' => $state], JSON_UNESCAPED_SLASHES) . PHP_EOL;
    @file_put_contents($storage . DIRECTORY_SEPARATOR . 'playbook-operations.log', $entry, FILE_APPEND | LOCK_EX);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['accepted' => false, 'error_code' => 'method_not_allowed', 'message' => 'Use POST.', 'retryable' => false]);
}

$origin = header_value('Origin');
if ($origin !== '') {
    $originHost = strtolower((string)parse_url($origin, PHP_URL_HOST));
    $requestHost = strtolower((string)($_SERVER['HTTP_X_FORWARDED_HOST'] ?? $_SERVER['HTTP_HOST'] ?? ''));
    $requestHost = trim(explode(',', $requestHost)[0]);
    $requestHost = explode(':', $requestHost)[0];
    $sameOrigin = ($requestHost !== '' && $originHost === $requestHost);
    if (!$sameOrigin && !in_array($originHost, ['bestbuyincentives.com', 'www.bestbuyincentives.com'], true)) {
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
foreach (['playbook-leads', 'rate-limits'] as $directory) if (!is_dir($storageReal . DIRECTORY_SEPARATOR . $directory)) @mkdir($storageReal . DIRECTORY_SEPARATOR . $directory, 0700, true);

$rateSecret = trim((string)getenv('BBI_RATE_LIMIT_SECRET'));
if (strlen($rateSecret) < 32) respond(503, ['accepted' => false, 'error_code' => 'delivery_unavailable', 'message' => 'Request security is not configured.', 'retryable' => true]);
$ipHash = hash_hmac('sha256', (string)($_SERVER['REMOTE_ADDR'] ?? 'unknown'), $rateSecret);
$rateFile = $storageReal . DIRECTORY_SEPARATOR . 'rate-limits' . DIRECTORY_SEPARATOR . 'pb_' . $ipHash . '.json';
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
if ($rate['count'] > 15) respond(429, ['accepted' => false, 'error_code' => 'rate_limited', 'message' => 'Too many requests. Try again later.', 'retryable' => true], ['Retry-After' => '900']);

if (clean_string($input['website_honeypot'] ?? '', 100) !== '') respond(422, ['accepted' => false, 'error_code' => 'spam_rejected', 'message' => 'Request rejected.', 'retryable' => false]);

$teamSizes = ['', '1', '2–5', '6–20', '21–50', '51+'];
$useCases = ['', 'Close qualified deals faster', 'Increase close rate', 'Create urgency without deeper discounting', 'Re-engage stalled opportunities', 'Equip a sales team with a closing tool', 'Other'];
$limits = ['first_name' => 80, 'last_name' => 80, 'work_email' => 254, 'company' => 160, 'role' => 120, 'phone' => 40];
$data = [];
foreach ($limits as $field => $max) $data[$field] = clean_string($input[$field] ?? '', $max);
$data['sales_team_size'] = clean_string($input['sales_team_size'] ?? '', 20);
$data['sales_use_case'] = clean_string($input['sales_use_case'] ?? '', 120);
$assetId = clean_string($input['playbook_asset_id'] ?? '', 80) ?: 'high-ticket-closing-playbook';

$fieldErrors = [];
foreach (['first_name', 'last_name', 'company', 'work_email'] as $field) if (($data[$field] ?? '') === '') $fieldErrors[$field] = 'Required.';
if (($data['work_email'] ?? '') !== '' && !is_business_email($data['work_email'])) $fieldErrors['work_email'] = 'Enter a valid business email (no personal inboxes).';
if (!isset(ASSET_DOWNLOADS[$assetId])) $fieldErrors['playbook_asset_id'] = 'Unknown resource.';
if ($data['sales_team_size'] !== '' && !in_array($data['sales_team_size'], $teamSizes, true)) $fieldErrors['sales_team_size'] = 'Select a valid option.';
if ($data['sales_use_case'] !== '' && !in_array($data['sales_use_case'], $useCases, true)) $fieldErrors['sales_use_case'] = 'Select a valid option.';
if ($fieldErrors) respond(422, ['accepted' => false, 'error_code' => 'validation_failed', 'message' => 'Complete the required fields.', 'retryable' => false, 'field_errors' => $fieldErrors]);

$hidden = ['original_landing_page', 'original_referrer', 'original_source', 'original_medium', 'original_campaign', 'original_content', 'original_term', 'first_seen_at', 'converting_page', 'converting_referrer', 'latest_source', 'latest_medium', 'latest_campaign', 'latest_content', 'latest_term', 'page_type', 'conversion_method'];
$attribution = [];
foreach ($hidden as $field) $attribution[$field] = clean_string($input[$field] ?? '', (str_contains($field, 'page') || str_contains($field, 'referrer')) ? 2048 : 300);

$safeFile = hash('sha256', $submissionId) . '.json';
$recordPath = $storageReal . DIRECTORY_SEPARATOR . 'playbook-leads' . DIRECTORY_SEPARATOR . $safeFile;
if (is_file($recordPath)) {
    $existing = json_decode((string)@file_get_contents($recordPath), true);
    respond(202, ['accepted' => true, 'submission_id' => $submissionId, 'durable_state' => (string)($existing['durable_state'] ?? 'retry_queue_created'), 'asset_id' => (string)($existing['asset_id'] ?? $assetId), 'download_url' => (ASSET_DOWNLOADS[(string)($existing['asset_id'] ?? $assetId)] ?? PLAYBOOK_DOWNLOAD_URL)]);
}

$record = [
    'schema_version' => '1.0.0', 'submission_id' => $submissionId, 'lead_type' => 'playbook_gated_download',
    'asset_id' => $assetId, 'lead_created_at' => gmdate(DATE_ATOM),
    'durable_state' => 'retry_queue_created', 'qualification_status' => 'new',
    'contact' => $data, 'attribution' => $attribution,
    'delivery' => ['crm_attempts' => 0, 'crm_delivered_at' => null, 'last_error_code' => null],
];
$handle = @fopen($recordPath, 'x');
if ($handle === false) {
    if (is_file($recordPath)) {
        $existing = json_decode((string)@file_get_contents($recordPath), true);
        respond(202, ['accepted' => true, 'submission_id' => $submissionId, 'durable_state' => (string)($existing['durable_state'] ?? 'retry_queue_created'), 'asset_id' => (string)($existing['asset_id'] ?? $assetId), 'download_url' => (ASSET_DOWNLOADS[(string)($existing['asset_id'] ?? $assetId)] ?? PLAYBOOK_DOWNLOAD_URL)]);
    }
    respond(503, ['accepted' => false, 'error_code' => 'delivery_unavailable', 'message' => 'Request could not be stored.', 'retryable' => true]);
}
$written = fwrite($handle, json_encode($record, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
fflush($handle); fclose($handle); @chmod($recordPath, 0600);
if ($written === false || $written < 80) { @unlink($recordPath); respond(503, ['accepted' => false, 'error_code' => 'delivery_unavailable', 'message' => 'Request could not be stored.', 'retryable' => true]); }
operational_log($storageReal, $submissionId, 'retry_queue_created');

$recipient = (string)(getenv('BBI_SALES_NOTIFICATION_EMAIL') ?: 'karl@bestbuyincentives.com');
$subject = 'New BBI playbook download: ' . $data['company'];
$message = "A new gated playbook download is durably queued.\nSubmission: {$submissionId}\nAsset: {$assetId}\nCompany: {$data['company']}\nContact: {$data['first_name']} {$data['last_name']}\nWork email: {$data['work_email']}\nRole: {$data['role']}\nPhone: {$data['phone']}\nTeam size: {$data['sales_team_size']}\nUse case: {$data['sales_use_case']}\n";
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

respond(202, ['accepted' => true, 'submission_id' => $submissionId, 'durable_state' => $record['durable_state'], 'asset_id' => $assetId, 'download_url' => (ASSET_DOWNLOADS[$assetId] ?? PLAYBOOK_DOWNLOAD_URL)]);
