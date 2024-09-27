<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  http_response_code(200);
  exit();
}

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$number = $data['mobileNumber'];
$email = $data['email'];
$persons = $data['persons'];
$amount = $data['amount'];
$date = $data['date'];
$orderId = $data['orderId'];
$paymentId = $data['payemntId'];
$tripName = $data['tripName'];


// Validate the data (optional)
if (json_last_error() !== JSON_ERROR_NONE) {
  echo json_encode(['error' => 'Invalid JSON']);
  exit;
}
// User email and admin email
$userEmail = $email;
$adminEmail = "bookings@griffinn360adventures.com";

// Subject and message for the email
$subject = 'Griff Inn 360 Adventures - Booking Confirmation';


// message
$htmlContent = '
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .container {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        border-radius: 20px;
        padding: 3rem 0;
        width: 80%;
        height: 80%;
        text-align: center;
      }
      .bookingDetails {
        display: flex;
        flex-direction: column;
        width: 50%;
        height: 100%;
        gap: 1rem;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
      }
      .bookingDetails > p {
        font-weight: bold;
      }
      .bookingDetails > p > span {
        font-weight: 500;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Thank You for your booking With Griff Inn 360 Adventures</h1>
      <div class="bookingDetails">';
$htmlContent .= "<p>Booking Name: <span> . $name .</span></p> <br>";
$htmlContent .= "<p>Mobile Number: <span> . $number. </span></p>";
$htmlContent .= "<p>Email Id: <span> .$email .</span></p>";
$htmlContent .= "<p>No. of persons: . $persons .</span></p>";
$htmlContent .= "<p>Total Price <span> . $amount. </span></p>";
$htmlContent .= "<p>Booking Date: <span> .$date.</span></p>";
$htmlContent .= "<p>Order Id: <span> . $orderId .</span></p>";
$htmlContent .= "<p>Payment Reference Number: <span> . $paymentId .</span></p>";
$htmlContent .= "<p>Trip/Trek Name: <span> . $tripName . </span></p>";
$htmlContent .= '
</div>
</div>
</body>

</html>
';

// Headers for the email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: GrIFF INN 360 ADVENTURES <no-reply@griffinn360adventures.com>' . "\r\n";


// Sending email to the user
$mailStatus = mail($userEmail, $subject, $htmlContent, $headers);

// Sending email to the admin
$adminMail = mail($adminEmail, $subject, $htmlContent, $headers);


$response = [
  'userEmail' => $mailStatus, // or false based on email sending result
  'adminEmail' => $adminMail,
];

header('Content-Type: application/json');
echo json_encode($response);
