<?php
/**
 * backend/config.php
 *
 * Returns a flat associative array with database connection settings.
 * Selected by the `APP_ENV` environment variable ('development' or 'production').
 *
 * Recommended usage:
 * - For local development: set `APP_ENV=development` (or leave unset)
 * - For production: set `APP_ENV=production` and provide PROD_* env vars
 *
 * The calling code expects keys: 'servername', 'username', 'dbpassword', 'dbname'
 */

$env = getenv('APP_ENV') ?: 'development';

$configSets = [
    'development' => [
        'servername' => getenv('DEV_DB_HOST') ?: '127.0.0.1',
        'username'   => getenv('DEV_DB_USER') ?: 'root',
        'dbpassword' => getenv('DEV_DB_PASS') ?: '',
        'dbname'     => getenv('DEV_DB_NAME') ?: 'griffinn360',
    ],
    'production' => [
        'servername' => getenv('PROD_DB_HOST') ?: '127.0.0.1',
        'username'   => getenv('PROD_DB_USER') ?: 'prod_user',
        'dbpassword' => getenv('PROD_DB_PASS') ?: 'change_me',
        'dbname'     => getenv('PROD_DB_NAME') ?: 'griffinn360',
    ],
];

if (!array_key_exists($env, $configSets)) {
    // Fallback to development if APP_ENV is unexpected
    $env = 'development';
}

return $configSets[$env];
