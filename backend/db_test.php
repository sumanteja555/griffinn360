<?php
// Enable error reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Log errors to a file
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error_log.txt');

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: https://www.griffinn360adventure.com");

try {
    // Load config
    $config = require __DIR__ . '/config.php';
    
    // Try to connect
    $conn = new mysqli(
        $config['servername'],
        $config['username'],
        $config['dbpassword'],
        $config['dbname']
    );

    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Test query
    $result = $conn->query("SELECT 1");
    if ($result === false) {
        throw new Exception("Query failed: " . $conn->error);
    }

    // Return success
    echo json_encode([
        "status" => "success",
        "message" => "Database connection successful",
        "config" => [
            "host" => $config['servername'],
            "database" => $config['dbname'],
            "user" => $config['username']
            // Not showing password for security
        ],
        "server" => [
            "php_version" => PHP_VERSION,
            "mysql_version" => $conn->server_info,
            "current_time" => date('Y-m-d H:i:s')
        ]
    ]);

} catch (Exception $e) {
    // Log error
    error_log("Database Test Error: " . $e->getMessage());
    
    // Return error details
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage(),
        "file" => basename($e->getFile()),
        "line" => $e->getLine()
    ]);
}