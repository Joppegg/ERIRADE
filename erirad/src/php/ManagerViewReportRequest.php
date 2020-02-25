<?php
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$submittedTrue = 'true';
$submitted = '';



$empId = mysqli_escape_string($connection, $_POST['employeeId']);
//$empId = '5';
$sqlGetRequestId = "SELECT requestId FROM reportrequest WHERE authorId = '$empId'";
$resultRequestId = mysqli_query($connection, $sqlGetRequestId);

while($rowRequestId = mysqli_fetch_array($resultRequestId)){
    //$formatListReportRequest[] = $rowRequestId;
    $requestId = $rowRequestId['requestId'];
    
    $sqlAllRequestsSubmitted = "SELECT * FROM employeeinput WHERE submitted != '$submittedTrue' AND requestId = '$requestId'";
    $resultRequestsSubmitted = mysqli_query($connection, $sqlAllRequestsSubmitted);
    
    $countOfRows = mysqli_num_rows($resultRequestsSubmitted);
    if($countOfRows == 0){
        $submitted = 'true';
        $sqlUpdateStatus = "UPDATE reportrequest SET isSubmitted = '$submitted' WHERE requestId = '$requestId'";
        mysqli_query($connection, $sqlUpdateStatus);
    }else{
        
    }
}

$sqlGetReportRequestInput = "SELECT requestId, title, description, creationTime, isSubmitted FROM reportrequest WHERE authorId = '$empId'";
$resultReportRequest = mysqli_query($connection, $sqlGetReportRequestInput);
while($row = mysqli_fetch_array($resultReportRequest)){
    $formatListReportRequest[] = $row;
}
echo json_encode($formatListReportRequest);
