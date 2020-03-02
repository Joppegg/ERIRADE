<?php
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

//$requestId = mysqli_escape_string($connection, $_POST['requestId']);

$requestId = '59';
$submitted = 'true';
$sqlGetEmpInputReportId = "SELECT employeeId, reportId, submitted, submittedDate FROM employeeinput WHERE submitted = '$submitted' AND requestId = '$requestId'";
$resultEmpInputReportId = mysqli_query($connection, $sqlGetEmpInputReportId);

while($rowEmpInput = mysqli_fetch_assoc($resultEmpInputReportId)){
    $reportId = $rowEmpInput['reportId'];
    
    $sqlGetSnippetText = "SELECT snippetText, snippetId FROM snippet WHERE reportId = '$reportId'";
    $resultSnippetText = mysqli_query($connection, $sqlGetSnippetText);
    
    while($rowSnipp = mysqli_fetch_assoc($resultSnippetText)){
        $snippetTextList[] = $rowSnipp;
        $snippetId = $rowSnipp['snippetId'];
        
        
        $sqlGetTags = "SELECT tagId FROM snippettag WHERE snippetId = '$snippetId'";
        $resultTags = mysqli_query($connection, $sqlGetTags);

        while($rowTags = mysqli_fetch_assoc($resultTags)){
            $tagId = $rowTags['tagId'];

            $sqlGetTagName = "SELECT tagName FROM tag WHERE tagId = '$tagId'";
            $resultTagName = mysqli_query($connection, $sqlGetTagName);

            while($rowTagName = mysqli_fetch_assoc($resultTagName)){
                $tagNameList[] = $rowTagName;
                //print_r($tagNameList);
                array_push($snippetTextList, $tagNameList);
            }
        }
        
        
    }
 
}
//print_r($snippetTextList);
echo json_encode($snippetTextList);
