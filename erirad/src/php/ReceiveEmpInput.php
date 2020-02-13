<?php 
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);


//$empId = mysqli_escape_string($connection, $_POST['employeeId']);

$empId = '5';
$sqlJoined = "SELECT e.employeeId, e.requestId, e.reportId, e.submitted, r.title, r.description, r.authorId FROM employeeinput e JOIN reportrequest r ON e.requestId = r.requestId WHERE e.employeeId = '$empId'";

$allEmpInput = array();
$resultJoined = mysqli_query($connection, $sqlJoined);
while($rowEmpInput = mysqli_fetch_array($resultJoined)){
    $allEmpInput[] = $rowEmpInput;
    //måste ta bort hela raden i arrayen liksom
    //hittar endast värdet som är true och tar bort det värdet men de andra elementen är fortf kvar
    /*
    $submitted = 'true';
    foreach($allEmpInput as $arr){
        if (($key = array_search($submitted, $arr)) !== false) {
            print_r($arr);
            unset($arr[$key]);
            unset($arr['submitted']);
            print_r($arr);
        }
    }
    */
}
echo json_encode($arr);



