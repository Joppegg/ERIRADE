<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$arr = array();

//Finns en bugg i loopen tror jag som skriver ut fler snippettexts än vad som finns i databasen
$empFirstName = mysqli_escape_string($connection, $_POST['firstName']);
$empLastName = mysqli_escape_string($connection, $_POST['lastName']);

$sqlFindEmployeeId = "SELECT employeeId FROM employee WHERE firstName = '$empFirstName' AND lastName = '$empLastName'";
$resultFindEmployeeId = mysqli_query($connection, $sqlFindEmployeeId);
$resultEmployeeId = mysqli_fetch_assoc($resultFindEmployeeId);
$employeeId = $resultEmployeeId['employeeId'];


if($resultEmployeeId != null){
    $sqlFindReportId = "SELECT reportId FROM report WHERE employeeId = '$employeeId'";
    $resultFindReportId = mysqli_query($connection, $sqlFindReportId);
    
    $countReportId = myqsli_num_rows($resultFindReportId);

    if($countReportId > 0){
        while($rowReportId = mysqli_fetch_array($resultFindReportId)){
            $reportId = $rowReportId['reportId'];
    
            $sqlFindSnippetText = "SELECT snippetText FROM snippet WHERE reportId = '$reportId'";
            $resultFindSnippetText = mysqli_query($connection, $sqlFindSnippetText);
            while($rowSnippetText = mysqli_fetch_assoc($resultFindSnippetText)){
                $snippetText[] = $rowSnippetText;
    
            
                foreach($snippetText as $str){
                    array_push($arr, $str);
                }
    
            }
        }
        echo json_encode($arr);
    }else{
        $noReports = 'The selected employee has not made any reports yet';
        echo json_encode($noReports);
    }
}
else{
    $empNotExists = 'The employee does not exist';
    echo json_encode($empNotExists);
}
    







?>