<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Origin: https://griffinn360adventures.com");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


$config= require __DIR__ . '/config.php'; // Load the config.php file

$servername = $config['servername'];
$username=$config['username'];
$dbpassword = $config['dbpassword'];
$dbname = $config['dbname'];

// Example response for a successful request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = json_decode(file_get_contents('php://input'), true);

    $name = $data['name'];
    $email = $data['email'];
    $number = $data['number'];
    $password = $data['password'];


    $errorMessage = '';

    if ($name == '' || $email == '' || $number == '' || $password == '') {
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
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $conn = new mysqli($servername, $username, $dbpassword, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        // checking whether the user exists
        $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE email = ? OR number = ?");
        $stmt->bind_param("ss", $email, $number);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        if ($count > 0) {
            $response = [
                'success' => false,
                'message' => "User already existed",
            ];
            http_response_code(409);
            // Set the response header to application/json
            header('Content-Type: application/json');
            // Return a JSON response
            echo json_encode($response);
            exit; // Ensure no further output is sent
        }
        // if the user is not existed
        else {

            try {
                // Close the first statement before preparing a new one
            $stmt->close();

            $stmt = $conn->prepare("INSERT INTO users (name, number, email, password) VALUES (?, ?, ?, ?)");

            if ($stmt === false) {
                die("Error preparing statement: " . $conn->error);
            }

            $stmt->bind_param("ssss", $name, $number, $email, $hashedPassword);

            if ($stmt->execute()) {
                // Sending back a success message
                $response = [
                    'success' => true,
                    'message' => "signup successful",
                ];
                http_response_code(201);

                // Set the response header to application/json
                header('Content-Type: application/json');

                // Return a JSON response
                echo json_encode($response);
                exit; // Ensure no further output is sent
            }
            } catch (Exception $e) {

                http_response_code(500); // Internal Server Error
                echo json_encode([
                    'success' => true,
                    'message' => 'Signup failed due to a technical issue. Please try again later.',
                    'details' => $e->getMessage() // Optional: only show in dev mode for debugging
                ]);
            }
            
        } 
    }
}
