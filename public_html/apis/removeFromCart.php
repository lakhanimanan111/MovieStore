<?php

	$updateStatus = 0;

	session_start();
	$userid = $_SESSION["userid"];

	$request_body = file_get_contents('php://input');
	$requestParams = json_decode( $request_body, true );
	$movieId = $requestParams["movieid"];
	

	require_once('../includes/dbconnect.php');

	$sqlDeleteFromCart = "delete from cart where movieid = '$movieId' and userid = '$userid'";
	$resultDeleteFromCart = $connection->query($sqlDeleteFromCart);
	if ($resultDeleteFromCart === TRUE) {
		$updateStatus = 1;		
	}
	echo $updateStatus;

?>
