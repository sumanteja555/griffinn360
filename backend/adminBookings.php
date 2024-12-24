<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Origin: https://griffinn360adventures.com");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$config = require __DIR__ . '/config.php'; // Load the config.php file

$servername = $config['servername'];
$username = $config['username'];
$dbpassword = $config['dbpassword'];
$dbname = $config['dbname'];

$conn = new mysqli($servername, $username, $dbpassword, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}


if ($_SERVER["REQUEST_METHOD"] == "GET") {

    // Get `page` and `limit` parameters from the request, with default values
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
    $offset = ($page - 1) * $limit;

    // Prepare the SQL query to fetch bookings with pagination
    $sql = "SELECT * FROM bookings LIMIT ? OFFSET ?";
    
    if ($stmt = $conn->prepare($sql)) {

         // Ensure $limit and $offset are integers
    $limit = (int)$limit;
    $offset = (int)$offset;
        $stmt->bind_param("ii", $limit, $offset);

        $stmt->execute();
        $result = $stmt->get_result();

        $bookings = [];
        while ($row = $result->fetch_assoc()) {
            $bookings[] = $row;
        }

        if (empty($bookings)) {
            echo json_encode(["status" => "success", "data" => [], "message" => "No bookings found for the requested page."]);
        } else {
            echo json_encode(["status" => "success", "data" => $bookings]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Error preparing query for fetching bookings."]);
    }
}

// Close the connection
$conn->close();
?>
