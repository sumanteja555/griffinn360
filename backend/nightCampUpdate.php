<?php

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
    // Read input data
    $input = json_decode(file_get_contents('php://input'), true);

    // Validate input fields
    if (empty($input)) {
        echo json_encode(["status" => "error", "message" => "No data received."]);
        exit();
    }   
    if (
        empty($input['id']) ||
        empty($input['title']) ||
        !is_numeric($input['price']) ||
        !is_array($input['inclusions']) ||
        !is_array($input['exclusions']) ||
        !is_array($input['itinerary']) ||
        !is_numeric($input['discount'])
    ) {
        echo json_encode(["status" => "error", "message" => "Invalid or missing fields."]);
        exit();
    }
    

    // Sanitize and prepare data
    $id = (int)$input['id'];  // Ensuring id is an integer
    $title = $input['title'];
    $price = is_numeric($input['price']) ? (float)$input['price'] : 0.0;  // Ensure price is a float
    $inclusions = json_encode($input['inclusions']);
    $exclusions = json_encode($input['exclusions']);
    $itinerary = json_encode($input['itinerary']);
    $discount = is_numeric($input['discount']) ? (float)$input['discount'] : 0.0;  // Ensure discount is a float

    // Validate discount (it must be a positive number)
    if (is_nan($discount) || $discount < 0) {
        echo json_encode(["status" => "error", "message" => "Invalid discount value."]);
        exit();
    }

    // Prepare SQL query
    $sql = "UPDATE nightcamping SET title = ?, price = ?, inclusions = ?, exclusions = ?, itinerary = ?, discount = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        // Bind parameters to the SQL query
        $stmt->bind_param("sdsssdi", $title, $price, $inclusions, $exclusions, $itinerary, $discount, $id);

        // Execute the query
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Nightcamp updated successfully."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to update Nightcamp: " . $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Error preparing the SQL statement: " . $conn->error]);
    }
}

else {
    // Handle unsupported methods
    echo json_encode(["status" => "error", "message" => "Unsupported request method."]);
}   

// Close connection
$conn->close();

?>
