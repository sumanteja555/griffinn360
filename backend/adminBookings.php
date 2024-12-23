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

// SQL query to fetch all data from the bookings table
$sql = "SELECT * FROM bookings";
$result = $conn->query($sql);

$bookings = [];

// Check if the query returned any results
if ($result->num_rows > 0) {
    // Fetch each row and add it to the $bookings array
    while ($row = $result->fetch_assoc()) {
        $bookings[] = $row;
    }
}

// Return the bookings in JSON format
header('Content-Type: application/json');
echo json_encode($bookings);

// Close the database connection
$conn->close();
?>
