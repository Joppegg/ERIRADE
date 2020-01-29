<?php
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);


$firstName = mysqli_escape_string($connection, $_POST['firstName']);
$lastName = mysqli_escape_string($connection, $_POST['lastName']);
$email = mysqli_escape_string($connection, $_POST['email']);
$phoneNumber = mysqli_escape_string($connection, $_POST['phoneNumber']);


    $sql = "INSERT INTO employee (firstName, lastName, email, phoneNumber) VALUES ('".$firstName."','".$lastName."','".$email."','".$phoneNumber."')";
    mysqli_query($connection, $sql);



?>