<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$sqlGetAll = "SELECT * FROM employee";
$result = mysqli_query($connection, $sqlGetAll);
while($row = mysqli_fetch_assoc($result)){
    $allEmployees[] = $row;
    echo json_encode($allEmployees);
    
}