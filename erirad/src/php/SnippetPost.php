<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$snippets = json_decode(json_encode($_POST['textValues']));
$matrix = json_decode(json_encode($_POST['matrix']));
$employeeId = mysqli_escape_string($connection, $_POST['employeeId']);

$latestReportId = mysqli_escape_string($connection, $_POST['reportId']);
echo json_encode("employee ID: " .$employeeId);

foreach($snippets as $parentkey=> $snippetText){
    $saveKey = $parentkey;
    
    $sqlInsertSnippet = "INSERT INTO snippet (reportId, snippetText) VALUES ('$latestReportId','$snippetText')";
    $resultInsertedSnippet = mysqli_query($connection, $sqlInsertSnippet);

    $sqlFindSnippetId = "SELECT snippetId FROM snippet WHERE reportId = '$latestReportId'";
    $resultSnippetId = mysqli_query($connection, $sqlFindSnippetId);
    $num = mysqli_num_rows($resultSnippetId);
    if($num > 0){

        while($row = mysqli_fetch_array($resultSnippetId)){
            for ($i = 0; $i < sizeof($row); $i++) {
                $snippetId = $row[$i];
                
    
                foreach($matrix as $tags){
      
                    //var_dump($matrix);
                    //var_dump($tags);
                      foreach($tags as $key => $tagId){
                          echo json_encode('Tag ID: ' .$tagId. ' Should be added to Snippet Number: '.$parentkey.' ');
                          
                          $sqlInsertSnippetTag = "INSERT INTO snippettag (snippetId, tagId) VALUES ('$snippetId','$tagId')";
                          mysqli_query($connection, $sqlInsertSnippetTag);
                      }
                }
            }
        }
    
    }else{
        echo json_encode("The query rendered an empty result");
    }
    
}
    //Check if the snippet is inserted - update row in report if it is
    if($resultInsertedSnippet){
        $reportSubmitted = 'true';
        $sqlUpdateReport = "UPDATE report SET submitted = '$reportSubmitted' WHERE reportId = '$latestReportId'";
        $resultUpdated = mysqli_query($connection, $sqlUpdateReport);

        //update the employeeinput row if report is submitted
        if($resultUpdated){
            
            $empInputSubmitted = 'true';
            $sqlUpdateEmpInput = "UPDATE employeeinput SET submitted = '$empInputSubmitted' WHERE reportId = '$latestReportId'";
            mysqli_query($connection, $sqlUpdateEmpInput);
        }
    }


?>