<?php
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);



$sqlGetSnippetText = "SELECT snippettext FROM snippet";
$resultSnippetTexts = mysqli_query($connection, $sqlGetSnippetText);

while($row = mysqli_fetch_assoc($resultSnippetTexts)){
    $textlist[] = $row['snippettext'];
    foreach($textlist as $snippetText){
        $ary = explode(' ',$snippetText);
        print_r($ary);
        foreach($ary as $text){
            
            $stop_words = array("a", "you", "if", "the", "this", "that", "about", "entry", "report", "have", "with", "is", "where", "attended", "meetings", "discussed", "multiple", "snippets");
            $max_count = 100;
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
        
           
            $keywords = array_slice(array_keys($frequency), 0, $max_count);
            
            if(sizeof($keywords) != 0){
                $keywordsUnique = array_unique($keywords);
                foreach($keywordsUnique as $word){
                    //echo $word;
                }
                $count = 10;
                if($count > 100){
                    
                    $sqlInsertNewTag = "INSERT INTO tag (tagName) VALUES ($count)";
                    mysqli_query($connection, $sqlInsertNewTag);
                }else{
                //echo 'word has not been used enough times'; 
                }
            }
            
            
        }

    }
    
}
