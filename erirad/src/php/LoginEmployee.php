<?php
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$username = mysqli_escape_string($connection, $_POST['username']);
$password = mysqli_escape_string($connection, $_POST['password']);

$sqlLogin = "SELECT * FROM Employee WHERE username ='$username'";
$resultLogin = mysqli_query($connection, $sqlLogin);
$resultCheck = mysqli_num_rows($resultLogin);
if($resultCheck < 1){
    echo 'user do not exist';
}else{
    if($row = mysqli_fetch_assoc($resultLogin)){
        $hashedPwdCheck = password_verify($password, $row['password']);
        if($hashedPwdCheck == false){
            echo 'wrong password';
        }else if($hashedPwdCheck == true){
           
            $_SESSION['firstName'];
            $_SESSION['lastName'];
            $_SESSION['email'];
            $_SESSION['phoneNumber'];

            echo 'login success';
        }
    }
}


?>