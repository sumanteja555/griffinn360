<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$config = require __DIR__ . '/config.php'; // Load the config.php file

$servername = $config['servername'];
$username = $config['username'];
$dbpassword = $config['dbpassword'];
$dbname = $config['dbname'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Decode incoming JSON payload
    $data = json_decode(file_get_contents('php://input'), true);

    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $mobile_number = $data['mobile'] ?? '';
    $profession = $data['profession'] ?? '';
    $address = $data['address'] ?? '';
    $linkedin_url = $data['linkedin'] ?? '';
    $instagram_url = $data['instagram'] ?? '';
    $experience = $data['experience'] ?? '';
    $other_info = $data['otherInfo'] ?? '';
    $selected_options = isset($data['contributions']) ? implode(",", $data['selected_options']) : '';

    // Validation
    $errorMessage = '';
    if ($name === '' || $email === '' || $mobile_number === '') {
        $errorMessage .= "Name, email, and mobile number are required.";
    }

    if ($errorMessage !== '') {
        $response = [
            'success' => false,
            'message' => $errorMessage,
        ];
        http_response_code(400);
        echo json_encode($response);
        exit;
    }

    // Database connection
    $conn = new mysqli($servername, $username, $dbpassword, $dbname);

    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => "Database connection failed: " . $conn->connect_error
        ]);
        exit;
    }

    // Check if a volunteer with the same email or mobile number already exists
    $stmt = $conn->prepare("SELECT COUNT(*) FROM volunteers WHERE email = ? OR mobile_number = ?");
    $stmt->bind_param("ss", $email, $mobile_number);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();

    if ($count > 0) {
        $response = [
            'success' => false,
            'message' => "A volunteer with the provided email or mobile number already exists.",
        ];
        http_response_code(409);
        echo json_encode($response);
        exit;
    }

    $stmt->close();

    // Insert the new volunteer data
    try {
        $stmt = $conn->prepare("INSERT INTO volunteers (name, email, mobile_number, profession, address, linkedin_url, instagram_url, experience, other_info, selected_options) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        if ($stmt === false) {
            throw new Exception("Error preparing statement: " . $conn->error);
        }

        $stmt->bind_param("ssssssssss", $name, $email, $mobile_number, $profession, $address, $linkedin_url, $instagram_url, $experience, $other_info, $selected_options);

        if ($stmt->execute()) {
            $response = [
                'success' => true,
                'message' => "Volunteer registration successful.",
            ];
            http_response_code(201);
            echo json_encode($response);
            exit;
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Volunteer registration failed due to a technical issue. Please try again later.',
            'details' => $e->getMessage() // Optional: For debugging
        ]);
    } finally {
        $stmt->close();
        $conn->close();
    }
}

?>
