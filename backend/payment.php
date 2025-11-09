<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error_log.txt');

// payment.php
header('Content-Type: application/json');

// Allowed origins
$allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://griffinn360adventure.com',
    'https://www.griffinn360adventure.com'
];
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Access-Control-Max-Age: 3600');

define('PUBLIC_PATH', $_SERVER['DOCUMENT_ROOT']);

$config = require __DIR__ . '/config.php'; // Load the config.php file

// Guard: ensure composer autoload exists
$autoload = __DIR__ . '/../vendor/autoload.php';
if (!file_exists($autoload)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server misconfiguration: dependencies missing. Run composer install.'
    ]);
    error_log('Missing vendor/autoload.php in payment.php');
    exit;
}

require $autoload;

use Razorpay\Api\Api;

// If this is a preflight request, return OK
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Process request
$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data) || !isset($data['amount'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request payload']);
    exit;
}

$amountWithOutTax = floatval($data['amount']);
$tax = $amountWithOutTax * 0.03;
$taxAmount = $amountWithOutTax + $tax;

// Order details
$amount = intval(round($taxAmount * 100)); // Convert to paise and ensure integer
$currency = 'INR';
$receipt = 'gi360a_' . time(); // Unique receipt ID

$orderData = [
    'receipt'         => $receipt,
    'amount'          => $amount, // Amount in paise
    'currency'        => $currency,
    'payment_capture' => 1 // Auto-capture
];

try {
    // Validate and log Razorpay credentials
    if (empty($config['razorpay_key_id']) || empty($config['razorpay_key_secret'])) {
        error_log('Payment.php error: Missing Razorpay credentials');
        throw new Exception('Razorpay credentials are not configured.');
    }
    
    if ($config['razorpay_key_id'] === 'rzp_live_xxxxxxx' || $config['razorpay_key_secret'] === 'rzp_live_secret_xxxxx') {
        error_log('Payment.php error: Using placeholder Razorpay credentials');
        throw new Exception('Invalid Razorpay credentials. Please configure real API keys.');
    }

    error_log('Initializing Razorpay with key_id: ' . substr($config['razorpay_key_id'], 0, 8) . '...');

    $api = new Api($config['razorpay_key_id'], $config['razorpay_key_secret']);
    $order = $api->order->create($orderData);

    // Send order ID and other details to the frontend
    $response = [
        'success'  => true,
        'orderId'  => isset($order['id']) ? $order['id'] : null,
        'order_id' => isset($order['id']) ? $order['id'] : null,
        'amount'   => $amount,
        'currency' => $currency,
        'razorpay_key_id' => $config['razorpay_key_id']
    ];

    echo json_encode($response);
    exit();

} catch (Exception $e) {
    http_response_code(500);
    $msg = $e->getMessage();
    error_log('payment.php error: ' . $msg);
    echo json_encode([
        'success' => false,
        'message' => 'Payment initialization failed',
        'details' => $msg
    ]);
    exit();
}


