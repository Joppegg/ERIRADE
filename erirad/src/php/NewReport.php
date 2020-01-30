<?php
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$employeeId = mysqli_escape_string($connection, $_POST['employeeId']);
$submitted = mysqli_escape_string($connection, $_POST['submitted']);

$sql = "INSERT INTO report (employeeId, submitted) VALUES ('$employeeId', '$submitted')";

mysqli_query($connection, $sql);

?>