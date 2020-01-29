<?php
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$sqlFetch = "SELECT * FROM tag";
$result = mysqli_query($connection, $sqlFetch);

$tags = array();
while($row = mysqli_fetch_assoc($result)){
    $tags[] = $row;
}
echo json_encode($tags);

?>