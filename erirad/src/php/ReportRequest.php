<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$report = (array)json_decode(json_encode($_POST['report']));

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
        echo json_encode($requests);
    }
}


