<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Include JWT library
require_once '../vendor/autoload.php';
define('PUBLIC_PATH', $_SERVER['DOCUMENT_ROOT'] . '/griffinn360adventures');

$config= require PUBLIC_PATH . '/config.php'; // Load the config.php file

use \Firebase\JWT\JWT;

// Set your secret key for signing the JWT
$secret_key = $config['jwt_secret_key'];

$servername = $config['servername'];
$username=$config['username'];
$dbpassword = $config['dbpassword'];
$dbname = $config['dbnamem'];

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
