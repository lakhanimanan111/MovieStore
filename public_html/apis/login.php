<?php 
session_start();
$request_body = file_get_contents('php://input');
$requestParams = json_decode( $request_body, true );
//parse_str($request_body, $requestParams);
$username = $requestParams["username"];
$password = $requestParams["password"];
require_once('../includes/dbconnect.php');
$sql = "select * from user where username = '$username' and passwordhash = '$password'";
$result = $connection->query($sql);
$login = 0;
if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
		
			$_SESSION["username"] = $username;
			$login = 1;
			
			
		}
	} 
	echo $login;
?>
