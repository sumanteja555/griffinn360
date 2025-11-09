<?php

header('Content-Type: application/json');
// header("Access-Control-Allow-Origin: *");  // Comment out wildcard for security
header("Access-Control-Allow-Origin: https://www.griffinn360adventure.com");
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
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Handle GET request to fetch adventure park activities
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $sql = "SELECT * FROM adventure_park";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $activities = [];
        while ($row = $result->fetch_assoc()) {
            // Decode JSON column `points` if it exists
            if (isset($row['points']) && !is_null($row['points'])) {
                $row['points'] = json_decode($row['points'], true);
            }
            $activities[] = $row;
        }

        echo json_encode(["status" => "success", "data" => $activities]);
    } else {
        echo json_encode(["status" => "success", "data" => [], "message" => "No activities found."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}

// Close database connection
$conn->close();

?>
