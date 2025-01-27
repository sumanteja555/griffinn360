<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$config = require __DIR__ . '/config.php';
$servername = $config['servername'];
$username = $config['username'];
$dbpassword = $config['dbpassword'];
$dbname = $config['dbname'];

$conn = new mysqli($servername, $username, $dbpassword, $dbname);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = $_POST['id'];
    $targetDir = __DIR__ . '/../uploads/adventureActivities/'; // Adjusted path

    // Check if directory exists, and create it if not
    if (!is_dir($targetDir)) {
        if (!mkdir($targetDir, 0777, true)) {
            echo json_encode(["status" => "error", "message" => "Failed to create target directory."]);
            exit();
        }
    }

    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $sql = "SELECT img FROM adventure_park WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $row = $result->fetch_assoc();
            $oldFilePath = $targetDir . basename($row['img']);

            // Delete old file if it exists
            if (file_exists($oldFilePath)) {
                unlink($oldFilePath);
            }

            // Use the same filename for the new file
            $newFilePath = $targetDir . basename($row['img']);
            if (move_uploaded_file($_FILES['file']['tmp_name'], $newFilePath)) {
                echo json_encode(["status" => "success", "message" => "Image updated successfully."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to save the uploaded file."]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Activity not found."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "No file uploaded or upload error occurred."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Unsupported request method."]);
}

$conn->close();

?>
