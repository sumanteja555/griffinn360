<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Origin: https://griffinn360adventures.com");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$config= require __DIR__ . '/config.php';; // Load the config.php file


// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}


header('Content-Type: application/json');

// Get the payment details from the request
$data = json_decode(file_get_contents('php://input'), true);

if (empty($data)) {
    echo json_encode([
        'error' => 'No data received']);
    exit();
}


$razorpayPaymentId = $data['razorpay_payment_id'];
$razorpayOrderId = $data['razorpay_order_id'];
$razorpaySignature = $data['razorpay_signature'];

$razorpayKeySecret = $config['razorpay_key_secret']; 

// Generate a signature using the order ID and payment ID
$generatedSignature = hash_hmac('sha256', $razorpayOrderId . "|" . $razorpayPaymentId, $razorpayKeySecret);

// Compare the signatures
if (hash_equals($generatedSignature, $razorpaySignature)) {
    // Payment is successful
    $response = ['status' => 'success', 'payemntId' => $razorpayPaymentId, 'orderId' => $razorpayOrderId];
} else {
    // Payment failed
    $response = ['status' => 'failure'];
}


echo json_encode($response);

