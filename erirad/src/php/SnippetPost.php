<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$snippetText = mysqli_escape_string($connection, isset($_POST['text']));

$sql = "INSERT INTO snippet (snippetText) VALUES ('$snippetText')";


mysqli_query($connection, $sql);
?>