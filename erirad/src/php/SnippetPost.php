<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$snippets = json_decode(json_encode($_POST['textValues']));
$matrix = json_decode(json_encode($_POST['matrix']));
$employeeId = mysqli_escape_string($connection, $_POST['employeeId']);


echo json_encode("employee ID: " .$employeeId);


//vill ju inte skapa en ny report, vill ju ha det reportId som är requestat i empInput
//så jävla snygg query
$sqlGetReportIdFromEmpInput = "SELECT reportId FROM employeeInput ORDER BY reportId DESC LIMIT 1";
$result = mysqli_query($connection, $sqlGetReportIdFromEmpInput);
$latestReportIdFromEmpInputList = mysqli_fetch_assoc($result);
$latestReportIdFromEmpInput = $latestReportIdFromEmpInputList['reportId'];
echo $latestReportIdFromEmpInput;



foreach($snippets as $parentkey=> $snippetText){
    $saveKey = $parentkey;
    
    /*
    $getLatestReportId = "SELECT reportId FROM report ORDER BY reportId DESC LIMIT 1";
    $resultLatest = mysqli_query($connection, $getLatestReportId);

    $latestReportId = mysqli_fetch_assoc($resultLatest);
    $reportId = $latestReportId['reportId'];
    */
    
    $sqlInsertSnippet = "INSERT INTO snippet (reportId, snippetText) VALUES ('$latestReportIdFromEmpInput','$snippetText')";
    $resultInsertedSnippet = mysqli_query($connection, $sqlInsertSnippet);

    $sqlFindSnippetId = "SELECT snippetId FROM snippet WHERE reportId = '$latestReportIdFromEmpInput'";
    $resultSnippetId = mysqli_query($connection, $sqlFindSnippetId);

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

}
    //Check if the snippet is inserted - update row in report if it is
    if($resultInsertedSnippet){
        $reportSubmitted = 'true';
        $sqlUpdateReport = "UPDATE report SET submitted = '$reportSubmitted' WHERE reportId = '$latestReportIdFromEmpInput'";
        $resultUpdated = mysqli_query($connection, $sqlUpdateReport);

        //update the employeeinput row if report is submitted
        if($resultUpdated){
            
            $empInputSubmitted = 'true';
            $sqlUpdateEmpInput = "UPDATE employeeinput SET submitted = '$empInputSubmitted' WHERE reportId = '$latestReportIdFromEmpInput'";
            mysqli_query($connection, $sqlUpdateEmpInput);
        }
    }


?>