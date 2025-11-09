<?php
$allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://griffinn360adventure.com',
    'https://www.griffinn360adventure.com'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Max-Age: 86400");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}


// ==========================
// ✅ Error Reporting
// ==========================
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error_log.txt');

header('Content-Type: application/json');

// ==========================
// ✅ Main PHP Logic
// ==========================
$autoload = __DIR__ . '/../vendor/autoload.php';
if (!file_exists($autoload)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server misconfiguration: dependencies missing.']);
    error_log('Missing vendor/autoload.php in adminLogin.php');
    exit;
}

require_once $autoload;
date_default_timezone_set('UTC');
$config = require __DIR__ . '/config.php';

use Firebase\JWT\JWT;

$secret_key = $config['jwt_secret_key'];
$servername = $config['servername'];
$username = $config['username'];
$dbpassword = $config['dbpassword'];
$dbname = $config['dbname'];

// ==========================
// ✅ Handle POST request
// ==========================
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $adminId = $data['adminId'] ?? '';
    $adminPassword = $data['adminPassword'] ?? '';

    if (empty($adminId) || empty($adminPassword)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Please fill all fields.']);
        exit;
    }

    $conn = new mysqli($servername, $username, $dbpassword, $dbname);
    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
        exit;
    }

    $stmt = $conn->prepare("SELECT adminId, adminPassword FROM admin WHERE adminId = ?");
    $stmt->bind_param("s", $adminId);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($adminId, $hashedPassword);
        $stmt->fetch();

        if (password_verify($adminPassword, $hashedPassword)) {
            $issuedAt = time();
            $expirationTime = $issuedAt + 3600;

            $payload = [
                "iss" => "https://griffinn360adventures.com/",
                "aud" => "https://griffinn360adventures.com/",
                "iat" => $issuedAt,
                "exp" => $expirationTime,
                "data" => ["adminId" => $adminId]
            ];

            $jwt = JWT::encode($payload, $secret_key, 'HS256');
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'message' => 'Logged in successfully',
                'token' => $jwt,
                'adminId' => $adminId
            ]);
            exit;
        } else {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Invalid password.']);
            exit;
        }
    } else {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'No user found.']);
        exit;
    }
}
