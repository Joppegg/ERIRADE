<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$fromDate = mysqli_escape_string($connection, $_POST['fromDate']);
$toDate = mysqli_escape_string($connection, $_POST['toDate']);
//$fromDate = '2020-02-13 21:29:43';
//$toDate = '2020-02-25 11:49.35';
$submitted = 'true';

$sqlGetDates = "SELECT reportId FROM employeeinput WHERE submitted = '$submitted' AND submittedDate BETWEEN '$fromDate' AND '$toDate'";
$resultList = mysqli_query($connection, $sqlGetDates);

while($row = mysqli_fetch_array($resultList)){
    $reportIdList[] = $row;
    $rep = $row['reportId'];
   // echo $rep;
    
        
        $sqlGetSnippet = "SELECT snippettext FROM snippet WHERE reportId = '$rep'";
        $resultSnippetText = mysqli_query($connection, $sqlGetSnippet);

        while($rowSnippet = mysqli_fetch_array($resultSnippetText)){
            $snippetTextList[] = $rowSnippet;
        }
    
}
echo json_encode($snippetTextList);