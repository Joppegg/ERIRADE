<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);


$empFirstName = mysqli_escape_string($connection, $_POST['firstName']);
$empLastName = mysqli_escape_string($connection, $_POST['lastName']);


$sqlFindEmployeeId = "SELECT employeeId FROM employee WHERE firstName = '$empFirstName' AND lastName = '$empLastName'";
$resultFindEmployeeId = mysqli_query($connection, $sqlFindEmployeeId);
$resultEmployeeId = mysqli_fetch_assoc($resultFindEmployeeId);
$employeeId = $resultEmployeeId['employeeId'];

if($resultEmployeeId != null){
    $sqlFindReportId = "SELECT reportId FROM report WHERE employeeId = '$employeeId'";
    $resultFindReportId = mysqli_query($connection, $sqlFindReportId);
    
    while($rowReportId = mysqli_fetch_array($resultFindReportId)){
        $reportId = $rowReportId['reportId'];

        $sqlFindSnippetText = "SELECT snippetText FROM snippet WHERE reportId = '$reportId'";
        $resultFindSnippetText = mysqli_query($connection, $sqlFindSnippetText);
        while($rowSnippetText = mysqli_fetch_array($resultFindSnippetText)){
            $snippetText[] = $rowSnippetText;
        }
    }
    
    echo json_encode($snippetText);
}
else{
    $empNotExists = 'The employee does not exist';
    echo json_encode($empNotExists);
}
    







?>