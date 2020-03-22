<?php
header("Access-Control-Allow-Origin: *");
require 'DBConnection.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$requestId = mysqli_escape_string($connection, $_POST['requestId']);

$submitted = 'true';
$sqlGetEmpInputReportId = "SELECT tag.tagId, tag.tagName, employeeinput.employeeId, snippet.snippetId, snippet.snippetText, employee.firstName, employee.lastName FROM reportrequest JOIN employeeinput ON employeeinput.requestId = reportrequest.requestId JOIN report ON report.reportId = employeeinput.reportId JOIN snippet ON snippet.reportId = report.reportId JOIN employee ON employee.employeeId = employeeinput.employeeId JOIN snippettag ON snippet.snippetId = snippettag.snippetId JOIN tag ON tag.tagId = snippettag.tagId WHERE reportrequest.requestId = '$requestId'";
$resultEmpInputReportId = mysqli_query($connection, $sqlGetEmpInputReportId);
while($rowEmpInput = mysqli_fetch_array($resultEmpInputReportId)){
    $list[] = $rowEmpInput;


}
echo json_encode($list);


