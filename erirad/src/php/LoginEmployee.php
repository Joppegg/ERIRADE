<?php
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
session_start();

$username = mysqli_escape_string($connection, $_POST['username']);
$password = mysqli_escape_string($connection, $_POST['password']);

echo 'username: ' .$username. ' ';
echo 'password: ' .$password. ' ';



$sqlLogin = "SELECT * FROM Employee WHERE username ='$username'";
$resultLogin = mysqli_query($connection, $sqlLogin);
$resultCheck = mysqli_num_rows($resultLogin);
if($resultCheck < 1){
    echo 'user does not exist';
}else{
    if($row = mysqli_fetch_assoc($resultLogin)){
        $hashedPwdCheck = password_verify($password, $row['pwd']);
        if($hashedPwdCheck == false){
            echo 'wrong password';
        }else if($hashedPwdCheck == true){
           
            
            isset($_SESSION['firstName']);
            isset($_SESSION['lastName']);
            isset($_SESSION['email']);
            isset($_SESSION['phoneNumber']);
            isset($_SESSION['userName']);
            
            echo 'login successful';
            //skriver inte ut variablerna.
            echo (isset($_SESSION['employeeId']));
     
        }
    }
}


?>