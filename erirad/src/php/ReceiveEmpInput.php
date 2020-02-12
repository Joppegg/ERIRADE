<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);


$empId = mysqli_escape_string($connection, $_POST['employeeId']);
//DENNA QUERY:
//$empId = '5';
$sqlJoined = "SELECT e.employeeId, e.requestId, e.reportId, r.title, r.description, r.authorId FROM employeeinput e JOIN reportrequest r ON e.requestId = r.requestId WHERE e.employeeId = '$empId'";

$allEmpInput = array();
$resultJoined = mysqli_query($connection, $sqlJoined);
while($rowEmpInput = mysqli_fetch_array($resultJoined)){
    $allEmpInput[] = $rowEmpInput;
 
}
echo json_encode($allEmpInput);
