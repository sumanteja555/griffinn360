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
    echo json_encode(['status' => 'error', 'message' => 'Server misconfiguration: dependencies missing.']);
    error_log('Missing vendor/autoload.php in adminBookings.php');
    exit;
}

require_once $autoload;
date_default_timezone_set('UTC');
$config = require __DIR__ . '/config.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret_key = $config['jwt_secret_key'];
$servername = $config['servername'];
$username = $config['username'];
$dbpassword = $config['dbpassword'];
$dbname = $config['dbname'];

// JWT Helper Functions
function getAuthorizationHeader() {
    $headers = null;
    if (isset($_SERVER['Authorization'])) {
        $headers = trim($_SERVER["Authorization"]);
    } else if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
        if (isset($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        }
    }
    return $headers;
}

function getBearerToken() {
    $headers = getAuthorizationHeader();
    if (!empty($headers)) {
        if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
            return $matches[1];
        }
    }
    return null;
}

// Handle GET request for fetching bookings
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $token = getBearerToken();
    
    if (!$token) {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'No token provided']);
        exit;
    }

    try {
        $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
        
        // Connect to database
        $conn = new mysqli($servername, $username, $dbpassword, $dbname);
        if ($conn->connect_error) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
            exit;
        }

        // Get page and limit parameters
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
        $offset = ($page - 1) * $limit;

        // Fetch bookings with pagination
        $query = "SELECT id, name, mobile_number, amount, event_name, persons, travel_date 
                 FROM bookings 
                 ORDER BY travel_date DESC 
                 LIMIT ? OFFSET ?";
                 
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ii", $limit, $offset);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $bookings = [];
        while ($row = $result->fetch_assoc()) {
            $bookings[] = [
                'id' => $row['id'],
                'name' => $row['name'],
                'mobile_number' => $row['mobile_number'],
                'amount' => $row['amount'],
                'event_name' => $row['event_name'],
                'persons' => $row['persons'],
                'travel_date' => $row['travel_date']
            ];
        }

        error_log("Fetched " . count($bookings) . " bookings for page $page");
        
        echo json_encode([
            'status' => 'success',
            'data' => $bookings
        ]);

    } catch (Exception $e) {
        error_log("JWT Error: " . $e->getMessage());
        http_response_code(401);
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid token'
        ]);
    }
    exit;
}
