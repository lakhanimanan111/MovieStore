<?php

	$updateStatus = 0;

	session_start();
	$userid = $_SESSION["userid"];
	$request_body = file_get_contents('php://input');
	$requestParams = json_decode( $request_body, true );
	$movieObject = $requestParams["movieObject"];
	

	$movieTitle = $movieObject["title"];
	require_once('../includes/dbconnect.php');
	$sqlGetMovieId = "select movieId from moviedata where title = '$movieTitle'";	
	$resultGetMovieId = $connection->query($sqlGetMovieId);
	if ($resultGetMovieId->num_rows > 0) {
		$row = $resultGetMovieId->fetch_assoc();
		$movieId = $row['movieId'];
		
	}

	$sqlInsertIntoCart = "insert into cart (userid, movieid, quantity) values ($userid, $movieId, 1)";
	$resultInsertIntoCart = $connection->query($sqlInsertIntoCart);
	if ($resultInsertIntoCart === TRUE) {
		$updateStatus = 1;		
	}
	echo $updateStatus;

?>
