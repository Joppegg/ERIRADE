<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);


$snippets = json_decode($_GET['textValues']);
//$employeeId = mysqli_escape_string($_POST, ['employeeId']);


    $snippetId = $snippets[0];
    $snippetText = $snippets[1];

    $sqlGetReportId = "SELECT reportId FROM report WHERE employeeId IS NULL";

    $resultReportId = mysqli_query($connection, $sqlGetReportId);
    $resultCheckReportId = mysqli_num_rows($resultReportId);

    if($resultCheckReportId > 1){
        $row = mysqli_fetch_array($resultReportId);
        $reportId = $row['reportId'];
    }

    $sqlInsertSnippet = "INSERT INTO snippet (snippetId, reportId, snippetText) VALUES ('$snippetId','$reportId','$snippetText')";
    mysqli_query($connection, $sqlInsertSnippet);
    


?>