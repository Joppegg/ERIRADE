<?php
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);


$firstName = mysqli_escape_string($connection, $_POST['firstName']);
$lastName = mysqli_escape_string($connection, $_POST['lastName']);
$email = mysqli_escape_string($connection, $_POST['email']);
$phoneNumber = mysqli_escape_string($connection, $_POST['phoneNumber']);
$username = mysqli_escape_string($connection, $_POST['username']);
$password = mysqli_escape_string($connection, $_POST['password']);


$sql = "INSERT INTO employee (firstName, lastName, email, phoneNumber) VALUES ('".$firstName."','".$lastName."','".$email."','".$phoneNumber."')";
mysqli_query($connection, $sql);

if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
    echo 'wrong format for email';
}else{
    $sql = "SELECT username FROM employee";
    $result = mysqli_query($connection, $sql);
    $resultCheck = mysqli_num_rows($result);

    if($resultCheck > 1){
        echo 'username already exists';
    }else{
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $sqlSignUp = "INSERT INTO employee (firstName, lastName, email, phoneNumber, pwd) VALUES ('.$firstName.','.$lastName.','$email.','.$phoneNumber.','.$username.','.$hashedPassword.'";
        echo 'sign up success';
    }
}
?>