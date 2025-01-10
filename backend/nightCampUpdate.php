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

// Fetch all nightcamping data
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $sql = "SELECT id, title, price, images, inclusions, exclusions, itinerary, discount FROM nightcamping";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $data = [];
        while ($row = $result->fetch_assoc()) {
            // Decode JSON fields
            $row['images'] = json_decode($row['images'], true);
            $row['inclusions'] = json_decode($row['inclusions'], true);
            $row['exclusions'] = json_decode($row['exclusions'], true);
            $row['itinerary'] = json_decode($row['itinerary'], true);
            $data[] = $row;
        }
        echo json_encode(["status" => "success", "data" => $data]);
    } else {
        echo json_encode(["status" => "success", "data" => [], "message" => "No data found."]);
    }
    exit();
}

// Update nightcamping data
if ($_SERVER["REQUEST_METHOD"] === "PUT") {
    $input = json_decode(file_get_contents('php://input'), true);

    // Debug input received
    error_log("Received PUT data: " . print_r($input, true));

    if (!isset($input) || !is_array($input)) {
        echo json_encode(["status" => "error", "message" => "Invalid input data."]);
        exit();
    }

    foreach ($input as $item) {
        if (!isset($item['id'], $item['title'], $item['price'], $item['inclusions'], $item['exclusions'], $item['itinerary'], $item['discount'])) {
            echo json_encode(["status" => "error", "message" => "Missing required fields."]);
            exit();
        }

        $id = (int)$item['id'];
        $title = $item['title'];
        $price = (float)$item['price'];
        $inclusions = json_encode($item['inclusions']);
        $exclusions = json_encode($item['exclusions']);
        $itinerary = json_encode($item['itinerary']);
        $discount = (int)$item['discount'];

        $sql = "UPDATE nightcamping 
                SET title = ?, price = ?, inclusions = ?, exclusions = ?, itinerary = ?, discount = ? 
                WHERE id = ?";
        $stmt = $conn->prepare($sql);

        if ($stmt) {
            $stmt->bind_param("sdsdssii", $title, $price, $inclusions, $exclusions, $itinerary, $discount, $id);
            if ($stmt->execute()) {
                // Log success for each item
                error_log("Updated ID: $id successfully.");
            } else {
                error_log("Failed to update ID: $id.");
            }
            $stmt->close();
        } else {
            error_log("Error preparing SQL for ID: $id.");
        }
    }

    echo json_encode(["status" => "success", "message" => "Data updated successfully."]);
    exit();
}


// Handle unsupported methods
echo json_encode(["status" => "error", "message" => "Unsupported request method."]);

// Close connection
$conn->close();

?>
