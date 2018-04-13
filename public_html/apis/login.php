<?php 
//include 'ChromePhp.php';
session_start();
$request_body = file_get_contents('php://input');
$requestParams = json_decode( $request_body, true );
//parse_str($request_body, $requestParams);
$username = $requestParams["username"];
$password = $requestParams["password"];
require_once('../includes/dbconnect.php');
//$password = password_hash($password, PASSWORD_DEFAULT);
$sql = "select * from user where username = '$username'";
$result = $connection->query($sql);
$login = 0;
if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			
			$_SESSION["username"] = $row["username"];
			$_SESSION["userid"] = $row["userid"];
			$verify=password_verify($password,$row["passwordhash"]);
			if($row["isadmin"]==0)
			{
				$_SESSION["isAdmin"] = 0;
			}else{
				$_SESSION["isAdmin"] = 1;
				}
			if($verify)	
				$login = 1;
		
		}
		
	} 
	
	echo $login;
?>
