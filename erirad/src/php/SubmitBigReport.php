<?php
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$textVal = mysqli_escape_string($connection, $_POST['report']);

/*
Need to have empID to generate a reportId (empId of person logged in as the author of the report)
$employeeID = mysqli_escape_string($connection, $_POST['employeeId']);
$submitted = '0';

Generating a reportId: 
$sqlInsertReport = "INSERT INTO report (employeeId, submitted) VALUES ('$employeeID', '$submitted')";
mysqli_query($connection, $sqlInsertReport);
*/


$sqlInsertSnippet = "INSERT INTO snippet (reportId, snippettext) VALUES ('120','$textVal')";
mysqli_query($connection, $sqlInsertSnippet);


