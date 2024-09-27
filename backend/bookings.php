<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// Include database configuration file
include 'dbConfig.php';

$conn = new mysqli($servername, $username, $dbpassword, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the JSON body from the request
    $data = json_decode(file_get_contents("php://input"), true);

    // Assign values from the JSON data
    $name = $data['name'];
    $mobileNumber = $data['mobileNumber'];
    $email = $data['email'];
    $persons = $data['persons'];
    $travelDate = $data['travelDate'];
    $eventName = $data['eventName'];
    $amount = $data['amount'];
    $paymentId = $data['paymentId'];
    $orderId = $data['orderId'];

    // Prepare the SQL query
    $sql = "INSERT INTO bookings (name, mobile_number, email, persons, travel_date, event_name, amount, payment_id, order_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    if ($stmt = $conn->prepare($sql)) {
        // Bind parameters
        $stmt->bind_param("sssissdss", $name, $mobileNumber, $email, $persons, $travelDate, $eventName, $amount, $paymentId, $orderId);

        // Execute the query
        if ($stmt->execute()) {
            // Return success response
            echo json_encode(["status" => "success", "message" => "Booking stored successfully."]);
        } else {
            // Return error if execution failed
            echo json_encode(["status" => "error", "message" => "Error storing booking."]);
        }

        // Close the statement
        $stmt->close();
    } else {
        // Return error if query preparation failed
        echo json_encode(["status" => "error", "message" => "Error preparing query."]);
    }

    // Close the connection
    $conn->close();
}

