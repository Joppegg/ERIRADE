<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$reportText = mysqli_escape_string($connection, $_POST['textValues']);
$employeeId = mysqli_escape_string($connection, $_POST['employeeId']);

$sqlCreateReport = "INSERT INTO report (employeeId, submitted) VALUES ('$employeeId','true')";
mysqli_query($connection, $sqlCreateReport);

echo($reportText);
//ugly version to get report id
$sqlGetReportId = "SELECT reportId FROM report WHERE employeeId = '$employeeId' ORDER BY reportId DESC LIMIT 1";
$resultReportId = mysqli_query($connection, $sqlGetReportId);
$list = mysqli_fetch_assoc($resultReportId);
$reportId = $list['reportId'];
echo ($reportId);

$sqlInsertSnippet = "INSERT INTO snippet (reportId, snippetText) VALUES ('$reportId','$reportText')";
$resultInsertedSnippet = mysqli_query($connection, $sqlInsertSnippet);

?>