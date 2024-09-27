<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Include JWT library
require_once '../vendor/autoload.php';

use \Firebase\JWT\JWT;

// Set your secret key for signing the JWT
$secret_key = "Vsum@n@1312";

include 'dbConfig.php';

// Your existing PHP code here (e.g., for handling signup)

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
<<<<<<< HEAD
<<<<<<< HEAD
            'message' => $data,
=======
            'message' => $errorMessage,
>>>>>>> master
=======
            'message' => $data,
>>>>>>> origin/main
        ];

        http_response_code(200);

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

<<<<<<< HEAD
<<<<<<< HEAD
        $stmt = $conn->prepare("SELECT password FROM users WHERE number = ?");
=======
        $stmt = $conn->prepare("SELECT name, password FROM users WHERE number = ?");
>>>>>>> master
=======
        $stmt = $conn->prepare("SELECT password FROM users WHERE number = ?");
>>>>>>> origin/main
        $stmt->bind_param("s", $number);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
<<<<<<< HEAD
<<<<<<< HEAD
            $stmt->bind_result($hashedPassword);
=======
            $stmt->bind_result($name, $hashedPassword);
>>>>>>> master
=======
            $stmt->bind_result($hashedPassword);
>>>>>>> origin/main
            $stmt->fetch();

            // Verify the password
            if (password_verify($password, $hashedPassword)) {

                // generation of jwt token
                $issuedAt = time();
                $expirationTime = $issuedAt + 404800;

                $payload = [
                    "iss" => "http://localhost",  // Issuer
                    "aud" => "http://localhost",  // Audience
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
                    'username'=>$name
>>>>>>> master
=======
>>>>>>> origin/main
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
