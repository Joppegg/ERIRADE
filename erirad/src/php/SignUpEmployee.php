<?php

require 'DBConnection.php';

$firstName = mysqli_real_escape_string($connection, $_POST('firstName'));
$lastName = mysqli_real_escape_string($connection, $_POST('firstName'));
$email = mysqli_real_escape_string($connection, $_POST('firstName'));
$phoneNumber = mysqli_real_escape_string($connection, $_POST('firstName'));

if(empty($firstName) || empty($lastName) || empty($email) || empty($phoneNumber)){
    echo 'please fill in all fields';
}
else{
    $sql = "INSERT INTO employee (firstName, lastName, email, phoneNumber) VALUES ('".$firstName."','".$lastName."','".$email."','".$phoneNumber."','".$embedCode."');
}


?>