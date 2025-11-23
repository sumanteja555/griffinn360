<?php

// Set up allowed origins
$allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://griffinn360adventure.com',
    'https://www.griffinn360adventure.com'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Check if the origin is allowed
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
} else {
    header("Access-Control-Allow-Origin: https://griffinn360adventure.com");
    header("Access-Control-Allow-Credentials: true");
}

// Always expose allowed methods and headers for CORS responses (not only OPTIONS)
// This helps avoid preflight failures if the server responds without these headers.
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");
// Handle OPTIONS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Max-Age: 86400");    // Cache preflight for 24 hours
    header("Content-Type: application/json");
    exit(0);
}

// Set content type for all responses
header("Content-Type: application/json");

// Support method override so clients can send POST with X-HTTP-Method-Override: PUT
// This is a fallback for environments where PUT requests are blocked before hitting PHP
$requestMethod = $_SERVER['REQUEST_METHOD'];
if ($requestMethod === 'POST') {
    $override = $_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'] ?? null;
    if (!$override && isset($_POST['_method'])) {
        $override = $_POST['_method'];
    }
    if ($override) {
        $requestMethod = strtoupper($override);
    }
}

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
if ($requestMethod === "GET") {
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
if ($requestMethod === "PUT") {
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
