<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$reportId = mysqli_escape_string($connection, $_POST['reportId']);
$empId = mysqli_escape_string($connection, $_POST['employeeId']);

echo $reportId;
echo $empId;

