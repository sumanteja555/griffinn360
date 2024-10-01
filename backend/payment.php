<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// payment.php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Origin: https://griffinn360adventures.com");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

define('PUBLIC_PATH', $_SERVER['DOCUMENT_ROOT']);// . '/griffinn360adventures'

$config= require __DIR__ . '/config.php'; // Load the config.php file


// Include the Razorpay PHP SDK via Composer's autoload
require '../vendor/autoload.php';

use Razorpay\Api\Api;

// Initialize Razorpay API with the loaded keys
$api = new Api($config['razorpay_key_id'], $config['razorpay_key_secret']);


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    
    exit();
}

// Process request
$data = json_decode(file_get_contents('php://input'), true);

$amountWithOutTax = $data['amount'];
$tax = $amountWithOutTax * 0.03;
$taxAmount = $amountWithOutTax + $tax;

// Order details
$amount = $taxAmount* 100; // Convert to paise
$currency = 'INR';
$receipt = 'gi360a'; // Unique receipt ID

// Create an order
$orderData = [
    'receipt'         => $receipt,
    'amount'          => $amount, // Amount in paise
    'currency'        => $currency,
    'payment_capture' => 1 // Auto-capture
];

$order = $api->order->create($orderData);

// Send order ID and other details to the frontend
$response = [
    'orderId' => $order['id'],
    'amount'  => $amount,
    'currency' => $currency,
];

// For testing, return received data as JSON
echo json_encode($response);
exit();


