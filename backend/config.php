<?php
/**
 * backend/config.php
 *
 * Returns a flat associative array with database connection settings.
 * Manually toggle between 'development' and 'production' using $env below.
 *
 * The calling code expects keys: 'servername', 'username', 'dbpassword', 'dbname'
 */

// 🔧 MANUAL TOGGLE: Change this to 'production' when deploying live
$env = 'production';  // or 'production'

$configSets = [
    'development' => [
        'servername' => '127.0.0.1',
        'username'   => 'root',
        'dbpassword' => '',
        'dbname'     => 'griffinn360',
        'jwt_secret_key' => 'griffinn360',
        // Razorpay test keys (replace with your test keys during development)
        'razorpay_key_id' => 'rzp_test_RddMhb2ue5ne5o',
        'razorpay_key_secret' => '1n0jlLOWE8VJ23uNQZDUC5Bb'
    ],
    'production' => [
        'servername' => 'localhost',
        'username'   => 'u770927083_griffinn360',
        'dbpassword' => 'Griff@8991',
        'dbname'     => 'u770927083_griffinn360',
        'jwt_secret_key' => 'griffinn360',
        // Razorpay live keys - REPLACE with real production keys before going live
        'razorpay_key_id' => 'rzp_live_RdfMrRfmPQ8xXO',
        'razorpay_key_secret' => 'VfhN2kHhHhCHYzHfJ7U34zud'
    ],
];

// Fallback safety check
if (!array_key_exists($env, $configSets)) {
    $env = 'production';
}

$config = $configSets[$env];

// Validate the hostname (avoid using URLs like https://example.com)
if (isset($config['servername']) && preg_match('#^https?://#i', $config['servername'])) {
    throw new Exception("Invalid database host '{$config['servername']}'. 
    The DB host must be a hostname or IP (e.g. 'localhost' or '127.0.0.1'), not a URL.");
}

return $config;
