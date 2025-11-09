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
$env = 'development';  // or 'production'

$configSets = [
    'development' => [
        'servername' => '127.0.0.1',
        'username'   => 'root',
        'dbpassword' => '',
        'dbname'     => 'griffinn360',
    ],
    'production' => [
        'servername' => 'localhost', // 
        'username'   => 'u770927083_griffinn360',
        'dbpassword' => 'Griff@8991',
        'dbname'     => 'u770927083_griffinn360',
    ],
];

// Fallback safety check
if (!array_key_exists($env, $configSets)) {
    $env = 'development';
}

$config = $configSets[$env];

// Validate the hostname (avoid using URLs like https://example.com)
if (isset($config['servername']) && preg_match('#^https?://#i', $config['servername'])) {
    throw new Exception("Invalid database host '{$config['servername']}'. 
    The DB host must be a hostname or IP (e.g. 'localhost' or '127.0.0.1'), not a URL.");
}

return $config;
