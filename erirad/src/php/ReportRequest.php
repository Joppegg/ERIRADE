<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$report = (array)json_decode(json_encode($_POST['report']));
$listOfEmployees = $report['employees'];
print_r($listOfEmployees);
//problem: tar endast det första empId - måste loopa igenom men då kan det bli knas
$empId = reset($listOfEmployees)->employeeId;


//$report = json_decode(json_encode($_POST['report']));
//Det är för att report-objektet kommer in. I det så ligger title, author osv.

$authorId = mysqli_escape_string($connection, $_POST['requesterId']);
$title = $report['title'];
$description = $report['description'];
$deadline = $report['deadline'];
$time = time();
$timestamp = (date("Y/m/d H:i:s",$time));

//inserting a request into DB
$sqlInsertReportRequest = "INSERT INTO reportrequest (authorId, title, description, deadline, creationTime) VALUES ('$authorId', '$title', '$description', '$deadline', '$timestamp')";
mysqli_query($connection, $sqlInsertReportRequest);

//notice for that a report has been requested from a specific user 
$sqlGetRequest = "SELECT * FROM reportrequest WHERE authorId = '$authorId'";
$resultRequest = mysqli_query($connection, $sqlGetRequest);
$numberOfRows = mysqli_num_rows($resultRequest);

if($numberOfRows > 0){
    while($row = mysqli_fetch_assoc($resultRequest)){
        $requests[] = $row;
        $requestId = $row['requestId'];
        echo json_encode($requests);
    }
}

foreach($listOfEmployees as $employee){

    print_r($employee);
    $empId = $employee->employeeId;
    echo $empId;
    $submitted = "false";
    $accepted = "false";
    $submittedDate = "null";


    //inserting into report to generate a reportId :)
    $submitted = "no";
    $sqlCreateNewReport = "INSERT INTO report (employeeId, submitted) VALUES ('$empId', '$submitted')";
     mysqli_query($connection, $sqlCreateNewReport);

    //getting the generated reportId to be used as FK in employeeInput
    $sqlGetReportId = "SELECT reportId FROM report WHERE employeeId = '$empId' ORDER BY reportId DESC LIMIT 1";
    $resultReportId = mysqli_query($connection, $sqlGetReportId);
    $list = mysqli_fetch_assoc($resultReportId);
    $reportId = $list['reportId'];
    $sqlInsertEmployeeInput = "INSERT INTO employeeinput (employeeid, requestid, reportid, submitted, accepted, submittedDate) VALUES ('$empId', '$requestId', '$reportId', '$submitted', '$accepted', '$submittedDate')";
    mysqli_query($connection, $sqlInsertEmployeeInput);
    }




