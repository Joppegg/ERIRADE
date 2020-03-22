<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$reportText = mysqli_escape_string($connection, $_POST['textValues']);
$employeeId = mysqli_escape_string($connection, $_POST['employeeId']);
$employeeInputId = mysqli_escape_string($connection, $_POST['employeeInputId']);

$sqlGetReportId = "SELECT reportId FROM employeeInput WHERE inputId = '$employeeInputId'";
$resultEmployeeId = mysqli_query($connection, $sqlGetReportId);
$list = mysqli_fetch_assoc($resultEmployeeId);
$inputId = $list['reportId'];

//172 inputId.

$sqlUpdateStatus = "UPDATE employeeInput SET submitted = 'true' WHERE inputId = '$employeeInputId'";
mysqli_query($connection, $sqlUpdateStatus);

$sqlSetTrue = "UPDATE report SET submitted = 'true' WHERE reportId = '$inputId'";
mysqli_query($connection, $sqlSetTrue);

//splitting reportText into single strings and adding them to one array
$arr = explode(' ', trim($reportText));

//getting all tagNames
$sqlGetTags = "SELECT tagName FROM tag";
$resultTags = mysqli_query($connection, $sqlGetTags);
while($row = mysqli_fetch_array($resultTags)){
    $tags[] = $row['tagName'];
}

//looping through list of tagNames and checking if the strings in reportText matches the list of tags
foreach($tags as $tagName){
    if(in_array($tagName,$arr)){
        $tag = $tagName;
    }
}

//getting tagId from the tags that are in reportText
$sqlGetTagId = "SELECT tagId FROM tag WHERE tagName = '$tag'";
$resultTagId = mysqli_query($connection, $sqlGetTagId);
$tagIdList = mysqli_fetch_assoc($resultTagId);
$tagId = $tagIdList['tagId'];


//ugly version to get report id

$sqlInsertSnippet = "INSERT INTO snippet (reportId, snippetText) VALUES ('$inputId','$reportText')";
$resultInsertedSnippet = mysqli_query($connection, $sqlInsertSnippet);

//getting snippetId 
$sqlGetSnippetId = "SELECT snippetId FROM snippet WHERE reportId = '$inputId'";
$resultSnippetId = mysqli_query($connection, $sqlGetSnippetId);
$snippetIdList = mysqli_fetch_assoc($resultSnippetId);
$snippetId = $snippetIdList['snippetId'];

//inserting into snippettag based on the tags that are found in reporttext
$sqlInsertSnippettag = "INSERT INTO snippettag (snippetId, tagId) VALUES ('$snippetId','$tagId')";
mysqli_query($connection, $sqlInsertSnippettag);

?>