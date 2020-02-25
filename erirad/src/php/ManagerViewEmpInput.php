<?php
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$requestId = mysqli_escape_string($connection, $_POST['requestId']);
//$empId = '5';
$submitted = 'true';
$sqlGetEmpInputText = "SELECT e.employeeId, e.reportId, e.submitted, e.submittedDate FROM employeeinput e JOIN reportrequest r ON e.requestId = r.requestId WHERE e.submitted = '$submitted' AND requestId = '$requestId'";
$resultEmpInput = mysqli_query($connection, $sqlGetEmpInputText);

while($rowEmpInput = mysqli_fetch_array($resultEmpInput)){
    $formatListEmpInput[] = $rowEmpInput;
    
}

echo json_encode($formatListEmpInput);