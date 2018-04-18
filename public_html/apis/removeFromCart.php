<?php

	//include 'ChromePhp.php';

	$updateStatus = 0;

	session_start();
	$userid = $_SESSION["userid"];

	//Check of if user has logged in
	/*if(!isset($userid)) {
		echo $updateStatus;
		return;
	}*/

	$request_body = file_get_contents('php://input');
	$requestParams = json_decode( $request_body, true );
	$movieId = $requestParams["movieid"];
	

	require_once('../includes/dbconnect.php');

	//update cart with the selected movie
	$sqlDeleteFromCart = "delete from tempcart where movieid = '$movieId'";
	$resultDeleteFromCart = $connection->query($sqlDeleteFromCart);
	if ($resultDeleteFromCart === TRUE) {
		$updateStatus = 1;		
	}
	echo $updateStatus;

?>