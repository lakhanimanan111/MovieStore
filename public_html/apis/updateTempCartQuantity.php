<?php
	
	
	session_start();
	$request_body = file_get_contents('php://input');
	$requestParams = json_decode( $request_body, true );
	$movieid = $requestParams["movieid"];
	$quantity = $requestParams["quantity"];
	$userid = $_SESSION["userid"];

	require_once('../includes/dbconnect.php');

	$sql = "update cart set quantity = '$quantity' where movieid = '$movieid' and userid = '$userid'";
	 
	
	$result = $connection->query($sql);

	$rows = array();
	if ($resultInsertIntoCart === TRUE) {
		$updateStatus = 1;		
	}
	echo $updateStatus;
?>
