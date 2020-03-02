<?php
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$requestId = mysqli_escape_string($connection, $_POST['requestId']);

//$requestId = '43';
$submitted = 'true';
$sqlGetEmpInputReportId = "SELECT employeeId, reportId, submitted, submittedDate FROM employeeinput WHERE submitted = '$submitted' AND requestId = '$requestId'";
$resultEmpInputReportId = mysqli_query($connection, $sqlGetEmpInputReportId);

while($rowEmpInput = mysqli_fetch_assoc($resultEmpInputReportId)){
    $reportId = $rowEmpInput['reportId'];
    
    $sqlGetSnippetText = "SELECT snippetText FROM snippet WHERE reportId = '$reportId'";
    $resultSnippetText = mysqli_query($connection, $sqlGetSnippetText);
    
    while($rowSnipp = mysqli_fetch_assoc($resultSnippetText)){
        $snippetTextList[] = $rowSnipp['snippetText'];
        
        $str = '';
        foreach($snippetTextList as $snippetText){
            $str .= $snippetText . "\n";
            
        }
    }
 
}

echo json_encode(nl2br($str));
