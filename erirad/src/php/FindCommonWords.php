<?php
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
/*

$count = 0;

$sqlGetSnippetText = "SELECT snippettext FROM snippet";
$resultSnippetTexts = mysqli_query($connection, $sqlGetSnippetText);

while($row = mysqli_fetch_array($resultSnippetTexts)){
    $snippetTextList[] = $row['snippettext'];
    foreach($snippetTextList as $str){
        $ary = explode(',',$str);
            foreach($ary as $word){
                if($keyword = strpos($word, 'IOT') || strpos($word, 'AI') || strpos($word, 'Radio')){
                    $tagName = $keyword;
                    if($tagName != false){
                        $count ++;
                        
                        if($count > 50){
                            $sqlInsertNewTag = "INSERT INTO tag VALUES ($tagName)";
                            mysqli_query($connection, $sqlInsertNewTag);
                        }
    
                    }
                }
                
                
            }
 
    }

}
echo 'The word has not been used enough times';

*/

    $text = "hello hello bye johan jon georg georg georg";
    $stop_words = array("a", "you", "if", "the");
    $max_count = 10;
    $string = preg_replace('/ss+/i', '', $text);
    $string = trim($string); // trim the string
    $string = preg_replace('/[^a-zA-Z -]/', '', $text); // only take alphabet characters, but keep the spaces and dashes too…
    $string = strtolower($text); // make it lowercase

    preg_match_all('/\b.*?\b/i', $string, $match_words);
    $match_words = $match_words[0];

    foreach ( $match_words as $key => $item ) {
        if ( $item == '' || in_array(strtolower($item), $stop_words) || strlen($item) <= 3 ) {
            unset($match_words[$key]);
        }
    }  

    $word_count = str_word_count( implode(" ", $match_words) , 1); 
    $frequency = array_count_values($word_count);
    arsort($frequency);
    
    //arsort($word_count_arr);
    $keywords = array_slice(array_keys($frequency), 0, $max_count);
    $count = max($keywords);
    $tagName = $keywords[0];
    if($count > 50){
        $sqlInsertNewTag = "INSERT INTO tag VALUES ($tagName)";
        mysqli_query($connection, $sqlInsertNewTag);
    }else{
        echo 'word has not been used enough times';
    }
    

    
    
    
    
