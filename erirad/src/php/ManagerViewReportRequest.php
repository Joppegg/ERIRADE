<?php
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

//$empId = mysqli_escape_string($connection, $_POST['employeeId']);
$empId = '5';
$sqlGetReportRequestInput = "SELECT requestId, title, description, creationTime FROM reportrequest WHERE authorId = '$empId'";
$resultReportRequest = mysqli_query($connection, $sqlGetReportRequestInput);

while($rowReportRequest = mysqli_fetch_array($resultReportRequest)){
    $formatListReportRequest[] = $rowReportRequest;
    
}
echo json_encode($formatListReportRequest);
