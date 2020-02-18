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
    $formatListReportRequest = array(
        'requestId' => $rowReportRequest['requestId'],
        'title' => $rowReportRequest['title'],
        'description' => $rowReportRequest['description'],
        'creationTime' => $rowReportRequest['creationTime'],
    );
    echo json_encode($formatListReportRequest);
}
$submitted = 'true';
$sqlGetEmpInputText = "SELECT e.employeeId, e.reportId, e.submitted, e.submittedDate FROM employeeinput e JOIN reportrequest r ON e.requestId = r.requestId WHERE e.submitted = '$submitted' AND r.authorId = '$empId'";
$resultEmpInput = mysqli_query($connection, $sqlGetEmpInputText);

while($rowEmpInput = mysqli_fetch_array($resultEmpInput)){
    $formatListEmpInput = array(
        'employeeId' => $rowEmpInput['employeeId'],
        'reportId' => $rowEmpInput['reportId'],
        'submitted' => $rowEmpInput['submitted'],
        'submittedDate' => $rowEmpInput['submittedDate']
    );
    echo json_encode($formatListEmpInput);
}