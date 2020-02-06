<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$selectedTags = json_decode(json_encode($_POST['tags']));




$snippetIdAndText = array();
foreach($selectedTags as $tagId){

    $sqlGetSnippetId = "SELECT snippetid FROM snippettag WHERE tagId = '$tagId'";
    $resultSnippets = mysqli_query($connection, $sqlGetSnippetId);

    while($rowSnippetId = mysqli_fetch_array($resultSnippets)){

        $snippetSpecificId = $rowSnippetId['snippetid'];
        
        $sqlGetSnippetTextAndId = "SELECT DISTINCT snippetId, snippetText FROM snippet WHERE snippetId ='$snippetSpecificId'";
        $resultSnippetTextAndId = mysqli_query($connection, $sqlGetSnippetTextAndId);

        while ($rowSnippetIdAndtext = mysqli_fetch_array($resultSnippetTextAndId)){
            $snippetIdAndText[] = $rowSnippetIdAndtext; 
        }



    
    }
}


echo json_encode($snippetIdAndText);



?>