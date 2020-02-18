<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$submitted = 'true';
$allEmpInput = array();
$empId = mysqli_escape_string($connection, $_POST['employeeId']);

$empId = '5';

$sqlJoined = "SELECT e2.firstName, e2.lastName, e.employeeId, e.requestId, e.reportId, e.submitted, r.title, r.description, r.authorId FROM employeeinput e JOIN reportrequest r ON e.requestId = r.requestId JOIN employee e2 ON r.authorId = e2.employeeId WHERE e.employeeId = '$empId' AND e.submitted != '$submitted'";

$resultJoined = mysqli_query($connection, $sqlJoined);
while($rowEmpInput = mysqli_fetch_array($resultJoined)){
    $allEmpInput[] = $rowEmpInput;

}

echo json_encode($allEmpInput);
