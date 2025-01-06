<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


// Database configuration
$config = require __DIR__ . '/config.php';
$servername = $config['servername'];
$username = $config['username'];
$dbpassword = $config['dbpassword'];
$dbname = $config['dbname'];

// Establish connection
$conn = new mysqli($servername, $username, $dbpassword, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Fetch activities
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $sql = "SELECT id, title, price, points, discount FROM adventure_park";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $activities = [];
        while ($row = $result->fetch_assoc()) {
            $row['points'] = json_decode($row['points'], true); // Decode JSON points
            $activities[] = $row;
        }
        echo json_encode(["status" => "success", "data" => $activities]);
    } else {
        echo json_encode(["status" => "success", "data" => [], "message" => "No activities found."]);
    }
    exit();
}

// Update an activity
if ($_SERVER["REQUEST_METHOD"] === "PUT") {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['id'], $input['price'], $input['points'], $input['discount'])) {
        echo json_encode(["status" => "error", "message" => "Missing required fields."]);
        exit();
    }

    $id = (int)$input['id'];
    $price = (float)$input['price'];
    $points = json_encode($input['points']);
    $discount = (float)$input['discount'];

    $sql = "UPDATE adventure_park SET price = ?, points = ?, discount = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("dsdi", $price, $points, $discount, $id);
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Activity updated successfully."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to update activity."]);
        }
        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Error preparing the SQL statement."]);
    }
    exit();
}

// Handle unsupported methods
echo json_encode(["status" => "error", "message" => "Unsupported request method."]);

// Close connection
$conn->close();

?>
