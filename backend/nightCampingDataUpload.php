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
    die("Connection failed: " . $conn->connect_error);
}

// Prepare the data
$title = "Night Camping";
$price = 1499;
$discount = ''; // Example discount amount
$images = json_encode([
    ["img" => "../src/assets/nightCamps/nightCamps.webp", "title" => "image one"],
    ["img" => "../src/assets/nightCamps/nightcampsone.webp", "title" => "image two"],
    ["img" => "../src/assets/nightCamps/nightcampstwo.webp", "title" => "image three"],
    ["img" => "../src/assets/nightCamps/nightcampsthree.webp", "title" => "image four"],
    ["img" => "../src/assets/nightCamps/nightcampsfour.webp", "title" => "image five"],
]);
$inclusions = json_encode([
    "Food (snacks, dinner and breakfast)",
    "Camping tents (three sharing basis)",
    "Tea and snacks",
    "Music and Bonfire",
    "Open air movie screening",
    "Cycling",
    "Indoor and outdoor games",
]);
$exclusions = json_encode([
    "No transportation will be provided",
]);
$itinerary = json_encode([
    [
        "day" => "day One",
        "details" => [
            "4:30pm - Assemble at the campsite and get to know each other",
            "5:00 pm - Camping tent allotment followed by Tea and snacks",
            "5:30 pm - Indoor and Outdoor games & cycling around the jungle (and volleyball, badminton, carroms and other fun games)",
            "8:00 pm - Dinner",
            "9:00 pm - We will start some DJ music with the bonfire",
            "10:30 pm - Open air Movie screening under the stars",
        ],
        "text" => "End of Day One",
    ],
    [
        "day" => "day Two",
        "details" => [
            "8:00 am - Breakfast time",
            "9:00 am - group photo sessions",
            "Pack up the day with some beautiful memories and new friends",
        ],
        "text" => "End of Day Two",
    ],
]);

// Prepare the SQL statement
$sql = "
    INSERT INTO nightcamping (title, price, discount, images, inclusions, exclusions, itinerary)
    VALUES (?, ?, ?, ?, ?, ?, ?)
";

// Use a prepared statement to prevent SQL injection
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    die("Error preparing the statement: " . $conn->error);
}

// Bind the parameters
$stmt->bind_param(
    "sddssss",
    $title,
    $price,
    $discount,
    $images,
    $inclusions,
    $exclusions,
    $itinerary
);

// Execute the statement
if ($stmt->execute()) {
    echo "Data inserted successfully!";
} else {
    echo "Error inserting data: " . $stmt->error;
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
