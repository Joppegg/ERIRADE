<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);


$empId = mysqli_escape_string($connection, $_POST['employeeId']);
//DENNA QUERY:
$sqlJoined = "SELECT e.employeeId, e.requestId, e.reportId, r.title, r.description, r.authorId FROM employeeinput e JOIN reportrequest r ON e.requestId = r.requestId WHERE e.employeeId = '$empId'";

$resultJoined = mysqli_query($connection, $sqlJoined);
while($rowEmpInput = mysqli_fetch_array($resultJoined)){
    $requestId = $rowEmpInput['requestId'];
    $reportId = $rowEmpInput['reportId'];
    $title = $rowEmpInput['title'];
    $description = $rowEmpInput['description'];
    $authorId = $rowEmpInput['authorId'];
    $elements = array();
    array_push($elements, $requestId, $reportId, $title, $description, $authorId);
    echo json_encode($elements);
    
}