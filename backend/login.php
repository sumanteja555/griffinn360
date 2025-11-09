<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Create error log
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error_log.txt');

header('Content-Type: application/json');

// Define allowed origins
$allowedOrigins = array(
    'http://localhost:5173',
    'https://griffinn360adventure.com',
    'https://www.griffinn360adventure.com'
);

// Get the origin that sent the request
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Set the CORS headers
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Max-Age: 3600");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Include JWT library
require_once __DIR__ . '/../vendor/autoload.php';
date_default_timezone_set('UTC');

$config= require __DIR__ . '/config.php'; // Load the config.php file

use \Firebase\JWT\JWT;

// Set your secret key for signing the JWT
$secret_key = $config['jwt_secret_key'];

$servername = $config['servername'];
$username=$config['username'];
$dbpassword = $config['dbpassword'];
$dbname = $config['dbname'];

// Example response for a successful request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $number = $data['email'];
    $password = $data['password'];

    $errorMessage = '';

    if ($number == '' || $password == '') {
        $errorMessage .= "Please fill all the fields";
    }

    if ($errorMessage != '') {
        $response = [
            'success' => false,
            'message' => $errorMessage,
        ];

        http_response_code(400);

        // Set the response header to application/json
        header('Content-Type: application/json');

        // Return a JSON response
        echo json_encode($response);
        exit; // Ensure no further output is sent
    } else {
        $conn = new mysqli($servername, $username, $dbpassword, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $stmt = $conn->prepare("SELECT name, password FROM users WHERE number = ?");
        $stmt->bind_param("s", $number);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->bind_result($name, $hashedPassword);
            $stmt->fetch();

            // Verify the password
            if (password_verify($password, $hashedPassword)) {

                // generation of jwt token
                $issuedAt = time();
                $expirationTime = $issuedAt + 3600;

                $payload = [
                    "iss" => "https://griffinn360adventures.com/",  // Issuer
                    "aud" => "https://griffinn360adventures.com/",  // Audience
                    "iat" => $issuedAt,           // Issued at
                    "exp" => $expirationTime,     // Expiration time
                    "data" => [
                        "number" => $number,     // User mobile or email
                    ]
                ];

                $jwt = JWT::encode($payload, $secret_key, 'HS256');
                // Sending back a success message
                $response = [
                    'success' => true,
                    'message' => "logged in successfully",
                    'token' => $jwt,
                    'username'=>$name

                ];
                http_response_code(200);
                // Set the response header to application/json
                header('Content-Type: application/json');
                // Return a JSON response
                echo json_encode($response);
                exit; // Ensure no further output is sent
            } else {
                // Sending back a success message
                $response = [
                    'success' => false,
                    'message' => "password is invalid",

                ];
                http_response_code(401);

                // Set the response header to application/json
                header('Content-Type: application/json');

                // Return a JSON response
                echo json_encode($response);
                exit; // Ensure no further output is sent
            }
        } else {
            // Sending back a success message
            $response = [
                'success' => false,
                'message' => "no user found",
            ];
            http_response_code(501);

            // Set the response header to application/json
            header('Content-Type: application/json');

            // Return a JSON response
            echo json_encode($response);
            exit; // Ensure no further output is sent
        }
    }
}
