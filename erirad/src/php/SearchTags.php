<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$selectedTags = json_decode(json_encode($_POST['selectedTags']));
//$selectedTags = array('1', '2');

foreach($selectedTags as $tagId){
    $sqlGetSnippetId = "SELECT snippetid FROM snippettag WHERE tagId = '$tagId'";
    $resultSnippets = mysqli_query($connection, $sqlGetSnippetId);

    while($rowSnippetId = mysqli_fetch_array($resultSnippets)){
        foreach($rowSnippetId as $snippetId){
            echo json_encode($snippetId);
            
            $sqlGetSnippetText = "SELECT snippetText FROM snippet WHERE snippetId = '$snippetId'";
            $resultSnippetText = mysqli_query($connection, $sqlGetSnippetText);
            
            while($rowSnippetText = mysqli_fetch_array($resultSnippetText)){
                foreach($rowSnippetText as $snippetText){
                    echo json_encode($snippetText);
                }
            }
        }
    }
}






?>