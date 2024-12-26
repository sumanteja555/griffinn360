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

    $sql = "SELECT * FROM volunteers LIMIT ? OFFSET ?";
    if ($stmt = $conn->prepare($sql)) {
        // Ensure limit and offset are integers
        $limit = (int)$limit;
        $offset = (int)$offset;
    
        // Bind the parameters correctly
        $stmt->bind_param("ii", $limit, $offset);
    
        $stmt->execute();
        $result = $stmt->get_result();
    
        $volunteers = [];
        while ($row = $result->fetch_assoc()) {
            $volunteers[] = $row;
        }
    
        if (empty($volunteers)) {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "No volunteers found on the requested page."]);
        } else {
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "data" => $volunteers,
            ]);
        }
    
        $stmt->close();
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error preparing query for fetching volunteers."]);
    }
    
}

// Close the connection
$conn->close();
?>
