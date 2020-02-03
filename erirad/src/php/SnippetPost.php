
<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);



$snippets = json_decode(json_encode($_POST['textValues']));

echo $snippets[0];
echo $snippets[1];

foreach($snippets as $snippetText){
    echo $snippetText;
    
    
    $sqlGetReportId = "SELECT reportId FROM report WHERE employeeId = '63'";

    $resultReportId = mysqli_query($connection, $sqlGetReportId);
    $resultCheckReportId = mysqli_num_rows($resultReportId);

    
    $row = mysqli_fetch_array($resultReportId);
    $reportId = $row['reportId'];
    
        
    
    $sqlInsertSnippet = "INSERT INTO snippet (reportId, snippetText) VALUES ('$reportId','$snippetText')";
    mysqli_query($connection, $sqlInsertSnippet);

}
    

    

   
    


?>