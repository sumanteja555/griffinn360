<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: https://www.griffinn360adventure.com");
header("Access-Control-Allow-Methods: GET");

echo json_encode([
    "status" => "success",
    "message" => "Backend is reachable",
    "php_version" => PHP_VERSION,
    "time" => date('Y-m-d H:i:s')
]);