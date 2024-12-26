<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Origin: https://griffinn360adventures.com");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

date_default_timezone_set('UTC');

// Include the JWT library (Install via Composer or download manually)
require_once '../vendor/autoload.php'; // Adjust the path if necessary
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

$config = require __DIR__ . '/config.php'; // Load the config.php file

$servername = $config['servername'];
$username = $config['username'];
$dbpassword = $config['dbpassword'];
$dbname = $config['dbname'];
$secret_key = $config['jwt_secret_key']; // Use the secret key for token verification

$conn = new mysqli($servername, $username, $dbpassword, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

function verify_token($jwt, $secret_key) {
    try {
        // Decode the JWT token
        $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
        return $decoded;
    } catch (Exception $e) {
        return null; // Invalid token or expired token
    }
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {

    // Get the token from the Authorization header
    $auth_header = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';
    if (strpos($auth_header, 'Bearer ') === 0) {
        $token = substr($auth_header, 7); // Remove "Bearer " prefix
    } else {
        echo json_encode(["status" => "error", "message" => "Authorization token is missing."]);
        exit();
    }

    // Verify the token
    $decoded_token = verify_token($token, $secret_key);
    if (!$decoded_token) {
        echo json_encode(["status" => "error", "message" => "Invalid or expired token."]);
        exit();
    }

    // Get `page` and `limit` parameters from the request, with default values
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
    $offset = ($page - 1) * $limit;

    // Prepare the SQL query to fetch volunteers with pagination
    $sql = "SELECT * FROM volunteers LIMIT ? OFFSET ?";
    
    if ($stmt = $conn->prepare($sql)) {
        // Ensure $limit and $offset are integers
        $limit = (int)$limit;
        $offset = (int)$offset;
        $stmt->bind_param("ii", $limit, $offset);

        $stmt->execute();
        $result = $stmt->get_result();

        $volunteers = [];
        while ($row = $result->fetch_assoc()) {
            $volunteers[] = $row;
        }

        if (empty($volunteers)) {
            echo json_encode(["status" => "success", "data" => [], "message" => "No volunteers found for the requested page."]);
        } else {
            echo json_encode(["status" => "success", "data" => $volunteers]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Error preparing query for fetching volunteers."]);
    }
}

// Close the connection
$conn->close();

?>
