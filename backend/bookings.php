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


$conn = new mysqli($servername, $username, $dbpassword, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: "]));
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Handle booking submission (existing code)
    $data = json_decode(file_get_contents("php://input"), true);

    $name = $data['name'];
    $mobileNumber = $data['mobileNumber'];
    $email = $data['email'];
    $persons = $data['persons'];
    $travelDate = $data['travelDate'];
    $eventName = $data['eventName'];
    $amount = $data['amount'];
    $paymentId = $data['paymentId'];
    $orderId = $data['orderId'];

    $sql = "INSERT INTO bookings (name, mobile_number, email, persons, travel_date, event_name, amount, payment_id, order_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("sssissdss", $name, $mobileNumber, $email, $persons, $travelDate, $eventName, $amount, $paymentId, $orderId);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Booking stored successfully."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error storing booking."]);
        }
        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Error preparing query."]);
    }

} elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Handle fetching bookings
    $mobile_number = $_GET['number']; // Assuming the user_id is passed in the GET request

    // Prepare the SQL query to fetch bookings
    $sql = "SELECT * FROM bookings WHERE mobile_number = ? ORDER BY created_at DESC";
    
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("i", $mobile_number);

        $stmt->execute();
        $result = $stmt->get_result();

        $bookings = [];
        while ($row = $result->fetch_assoc()) {
            $bookings[] = $row;
        }

        // Return the bookings in JSON format
        echo json_encode($bookings);

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Error preparing query for fetching bookings."]);
    }
}

// Close the connection
$conn->close();
?>
