
<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);



$snippets = json_decode(json_encode($_POST['textValues']));
$matrix = json_decode(json_encode($_POST['matrix']));

print_r($matrix);
foreach($matrix as $tags){
    //print_r($tags);
    foreach($tags as $tagId){
        // echo json_encode($tagId);
    }
}

foreach($snippets as $snippetText){
    
    
    $reportId = '13';
  
    $sqlInsertSnippet = "INSERT INTO snippet (reportId, snippetText) VALUES ('$reportId','$snippetText')";
    mysqli_query($connection, $sqlInsertSnippet);

    $sqlFindSnippetId = "SELECT snippetId FROM snippet WHERE reportId = '$reportId'";
    $resultSnippetId = mysqli_query($connection, $sqlFindSnippetId);

    while($row = mysqli_fetch_array($resultSnippetId)){
        for ($i = 0; $i < sizeof($row); $i++) {
            $snippetId = $row[$i];
            echo json_encode($snippetId);
            foreach($tags as $tagId){
                $sqlInsertSnippetTag = "INSERT INTO snippettag (snippetId, tagId) VALUES ('$snippetId','$tagId')";
                mysqli_query($connection, $sqlInsertSnippetTag);
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