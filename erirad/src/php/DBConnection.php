<?php
$server = "localhost";
$user = "root";
$pwd = "";
$db = "erirad";

$connection = mysqli_connect($server, $user, $pwd, $db);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}
echo "Connected successfully";
?> 