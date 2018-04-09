
<?php 
session_start();
require_once('../includes/dbconnect.php');
$request_body = file_get_contents('php://input');
$requestParams = json_decode( $request_body, true );
$username = $requestParams["username"];
$password = $requestParams["password"];
$firstname = $requestParams["firstname"];
$lastname = $requestParams["lastname"];

$sql = "insert into user (username, firstname, lastname, passwordhash, isadmin) values('$username', '$firstname', '$lastname', '$password', 0)";
$result = $connection->query($sql);
?>
