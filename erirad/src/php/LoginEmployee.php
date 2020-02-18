<?php
header("Access-Control-Allow-Origin: *");
header( "Content-type: application/json" );
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
session_start();

$username = mysqli_escape_string($connection, $_POST['username']);
$password = mysqli_escape_string($connection, $_POST['password']);


$sqlLogin = "SELECT * FROM Employee WHERE username ='$username'";
$resultLogin = mysqli_query($connection, $sqlLogin);
$resultCheck = mysqli_num_rows($resultLogin);
if($resultCheck < 1){
    echo '1';
}else{
    if($row = mysqli_fetch_assoc($resultLogin)){
        $hashedPwdCheck = password_verify($password, $row['pwd']);
        if($hashedPwdCheck == false){
            echo '2';
        }else if($hashedPwdCheck == true){
           
            
            isset($_SESSION['firstName']);
            isset($_SESSION['lastName']);
            isset($_SESSION['email']);
            isset($_SESSION['phoneNumber']);
            isset($_SESSION['userName']);
            isset($_SESSION['role']);
            //skriver inte ut variablerna.
            
            //Echo en array
            $jsonAnswer = array(
                'code' => '2',
                'employeeId' => $row['employeeId'],
                'firstName' => $row['firstName'],
                'lastName' => $row['lastName'],
                'role' => $row['role']
            );
            echo json_encode($jsonAnswer);
    
        }
    }
}


?>