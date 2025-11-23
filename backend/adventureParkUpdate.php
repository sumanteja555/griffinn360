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

// Handle OPTIONS request for CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Max-Age: 86400");    // Cache preflight for 24 hours
    header("Content-Type: application/json");
    exit(0);
}

// Content-Type should be JSON for responses
header("Content-Type: application/json");

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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
    error_log("Connection failed: " . $conn->connect_error);
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Define the path to the uploads directory
$uploadsDir = realpath(__DIR__ . '/../uploads/adventureActivities/'); // Adjust this path if necessary

// Handle PUT request
if ($_SERVER["REQUEST_METHOD"] === "PUT") {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if ($input === null) {
        echo json_encode(["status" => "error", "message" => "Invalid JSON data."]);
        exit();
    }

    // Check for required fields in the input
    if (!isset($input['id'], $input['price'], $input['points'], $input['discount'])) {
        echo json_encode(["status" => "error", "message" => "Missing required fields."]);
        exit();
    }

    $id = (int)$input['id'];
    $price = (float)$input['price'];
    $points = json_encode($input['points']);
    $discount = (float)$input['discount'];

    // Initialize $imgPath
    $imgPath = null;

    // Retrieve existing image path from the database
    $sql = "SELECT img FROM adventure_park WHERE id = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->bind_result($existingImgPath);
        if ($stmt->fetch()) {
            $existingImgPath = $existingImgPath ?? null;
        }
        $stmt->close();
    }

    // Handle image upload
    if (isset($input['image']) && !empty($input['image'])) {
        $imageData = $input['image'];

        // Validate and decode Base64 image data
        if (preg_match('/^data:image\/webp;base64,/', $imageData)) {
            // Remove the Base64 header
            $imageData = substr($imageData, strpos($imageData, ',') + 1);
            $decodedImage = base64_decode($imageData);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid image type. Only WebP is supported."]);
            exit();
        }

        // Generate a new file name or reuse the existing file name
        if (!empty($existingImgPath)) {
            $fileName = basename($existingImgPath);
        } else {
            $fileName = uniqid() . '.webp';
        }

        // Ensure the directory exists
        if (!is_dir($uploadsDir)) {
            mkdir($uploadsDir, 0755, true);
        }

        $filePath = $uploadsDir . DIRECTORY_SEPARATOR . $fileName;
        $imgPath = '/uploads/adventureActivities/' . $fileName;

        // Save the image to the server
        if (file_put_contents($filePath, $decodedImage) === false) {
            echo json_encode(["status" => "error", "message" => "Failed to save image file."]);
            exit();
        }
    } else {
        $imgPath = $existingImgPath; // Keep the existing image path if no new image is provided
    }

    // Update activity details in the database
    $sql = "UPDATE adventure_park SET price = ?, points = ?, discount = ?, img = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("dsdsi", $price, $points, $discount, $imgPath, $id);
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Activity updated successfully."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to update activity."]);
        }
        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to prepare SQL statement."]);
    }

    exit();
}

// Handle unsupported methods
echo json_encode(["status" => "error", "message" => "Unsupported request method."]);

// Close database connection
$conn->close();
?>
