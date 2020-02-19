<?php
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$submittedTrue = 'true';
$submitted = '';
//$empId = mysqli_escape_string($connection, $_POST['employeeId']);
$empId = '5';
$sqlGetReportRequestInput = "SELECT requestId, title, description, creationTime FROM reportrequest WHERE authorId = '$empId'";
$resultReportRequest = mysqli_query($connection, $sqlGetReportRequestInput);

while($rowReportRequest = mysqli_fetch_array($resultReportRequest)){
    $formatListReportRequest[] = $rowReportRequest;
    $requestId = $rowReportRequest['requestId'];

    $sqlAllRequestsSubmitted = "SELECT COUNT (*) AS count FROM employeeinput WHERE submitted != '$submittedTrue' AND requestId = '$requestId'";
    $resultRequestsSubmitted = mysqli_query($connection, $sqlAllRequestsSubmitted);
    $countOfRows = mysqli_num_rows($resultReportRequest);
    if($countOfRows == 0){
        $submitted = 'true';
        array_push($formatListReportRequest, $submitted);
        print_r($formatListReportRequest);
    }else{
        
        foreach($formatListReportRequest as $arr){
            $submitted = 'false';
            array_push($arr, $submitted);
            echo json_encode($arr);
        }
        
    }
    
}
