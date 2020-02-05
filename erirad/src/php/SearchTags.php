<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

//$selectedTags = json_decode(json_encode($_POST['selectedTags']));
$selectedTags = array(1, 2);

// foreach selectedTag:
// Select snippetId from snippetTag where tagId = $selectedTags
//     foreach snippetId
//        select * from Snippet where SnippetId = snippetId
//          echo (snippetId, snippetText)
//
//
//
//
foreach($selectedTags as $tagId){

    $sqlGetSnippetId = "SELECT snippetid FROM snippettag WHERE tagId = '$tagId'";
    $resultSnippets = mysqli_query($connection, $sqlGetSnippetId);

    while($rowSnippetId = mysqli_fetch_array($resultSnippets)){
        echo(json_encode( $tagId . ":". $rowSnippetId['snippetid']));

        /*
        foreach($rowSnippetId as $snippetId){
         
            $sqlGetSnippetText = "SELECT * FROM snippet WHERE snippetId = '$snippetId'";
            $resultSnippetText = mysqli_query($connection, $sqlGetSnippetText);
            
            while($rowSnippetText = mysqli_fetch_array($resultSnippetText)){
                /*
                foreach($rowSnippetText as $snippetText){
                    echo json_encode("Snippet ID: " .$snippetId. " ");
                    echo json_encode("Text: " .$snippetText. " ");
                }
               
              //  echo(json_encode($rowSnippetText));
            }
       }*/  
    }
}






?>