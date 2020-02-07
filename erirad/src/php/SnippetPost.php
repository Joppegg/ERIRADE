<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$snippets = json_decode(json_encode($_POST['textValues']));
$matrix = json_decode(json_encode($_POST['matrix']));
$employeeId = mysqli_escape_string($connection, $_POST['employeeId']);


echo json_encode("employee ID: " .$employeeId);



$sqlInsertReport = "INSERT INTO report (employeeId) VALUES ('$employeeId')";
mysqli_query($connection, $sqlInsertReport);




foreach($snippets as $parentkey=> $snippetText){
    $saveKey = $parentkey;
    
    
    $getLatestReportId = "SELECT reportId FROM report ORDER BY reportId DESC LIMIT 1";
    $resultLatest = mysqli_query($connection, $getLatestReportId);

    $latestReportId = mysqli_fetch_assoc($resultLatest);
    $reportId = $latestReportId['reportId'];

    
    $sqlInsertSnippet = "INSERT INTO snippet (reportId, snippetText) VALUES ('$reportId','$snippetText')";
    mysqli_query($connection, $sqlInsertSnippet);

    $sqlFindSnippetId = "SELECT snippetId FROM snippet WHERE reportId = '$reportId'";
    $resultSnippetId = mysqli_query($connection, $sqlFindSnippetId);

    while($row = mysqli_fetch_array($resultSnippetId)){
        for ($i = 0; $i < sizeof($row); $i++) {
            $snippetId = $row[$i];
            

            foreach($matrix as $tags){
  
                var_dump($matrix);
                var_dump($tags);
                  foreach($tags as $key => $tagId){
                      echo json_encode('Tag ID: ' .$tagId. ' Should be added to Snippet Number: '.$parentkey.' ');
                      
                      $sqlInsertSnippetTag = "INSERT INTO snippettag (snippetId, tagId) VALUES ('$snippetId','$tagId')";
                      mysqli_query($connection, $sqlInsertSnippetTag);
                  }
              }
                    
                    
                
                
            }
            
            
        }
    
    
}
    
    

    $sqlGetReportId = "SELECT reportId FROM report WHERE employeeId = '63'";


    $resultReportId = mysqli_query($connection, $sqlGetReportId);
    $resultCheckReportId = mysqli_num_rows($resultReportId);

    
    $row = mysqli_fetch_array($resultReportId);
    $reportId = $row['reportId'];

?>