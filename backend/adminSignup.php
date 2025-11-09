<?php
header('Content-Type: application/json');

// Allowed origins
$allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://griffinn360adventure.com',
    'https://www.griffinn360adventure.com'
];

// Get the origin that sent the request
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Set the CORS headers
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Access-Control-Max-Age: 3600');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error_log.txt');

$config = require __DIR__ . '/config.php'; // Load the config.php file

$servername = $config['servername'];
$username = $config['username'];
$dbpassword = $config['dbpassword'];
$dbname = $config['dbname'];

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $adminId = $data['adminId'];
    $adminPassword = $data['adminPassword'];

    $errorMessage = '';

    // Validate input fields
    if (empty($adminId) || empty($adminPassword)) {
        $errorMessage .= "Username and password are required.";
    }

    if ($errorMessage != '') {
        $response = [
            'success' => false,
            'message' => $errorMessage,
        ];

        http_response_code(400);
        echo json_encode($response);
        exit;
    } else {
        $hashedPassword = password_hash($adminPassword, PASSWORD_DEFAULT);
        $conn = new mysqli($servername, $username, $dbpassword, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Check if admin already exists
        $stmt = $conn->prepare("SELECT COUNT(*) FROM admin WHERE adminId = ?");
        $stmt->bind_param("s", $adminId);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        $stmt->close();

        if ($count > 0) {
            $response = [
                'success' => false,
                'message' => "Admin already exists.",
            ];
            http_response_code(409);
            echo json_encode($response);
            exit;
        } else {
            // Insert new admin
            $stmt = $conn->prepare("INSERT INTO admin (adminId, adminPassword) VALUES (?, ?)");

            if ($stmt === false) {
                die("Error preparing statement: " . $conn->error);
            }

            $stmt->bind_param("ss", $adminId, $hashedPassword);

            if ($stmt->execute()) {
                $response = [
                    'success' => true,
                    'message' => "Admin signup successful.",
                ];
                http_response_code(201);
                echo json_encode($response);
                exit;
            } else {
                http_response_code(500);
                echo json_encode([
                    'success' => false,
                    'message' => "Signup failed due to a technical issue. Please try again later.",
                ]);
                exit;
            }
        }

        $stmt->close();
        $conn->close();
    }
}
