<?php

	//include 'ChromePhp.php';

	$updateStatus = 0;

	session_start();
	$userid = $_SESSION["userid"];

	$request_body = file_get_contents('php://input');
	$requestParams = json_decode( $request_body, true );
	$movieObject = $requestParams["movieObject"];
	

	$movieTitle = $movieObject["title"];
	//$movieTitle = mysql_real_escape_string($movieTitle);

	require_once('../includes/dbconnect.php');

	//Get movie id for the selected movie
	$sqlGetMovieId = "select movieId from moviedata where title = '$movieTitle'";	
	$resultGetMovieId = $connection->query($sqlGetMovieId);
	if ($resultGetMovieId->num_rows > 0) {
		$row = $resultGetMovieId->fetch_assoc();
		$movieId = $row['movieId'];
		
	}

	//update cart with the selected movie
	$sqlInsertIntoCart = "insert into cart (userId, movieId, quantity) values ($userid, $movieId, 1)";
	//$sqlInsertIntoCart = "insert into cart (userId, movieId, quantity) values (1, $movieId, 1)";
	$resultInsertIntoCart = $connection->query($sqlInsertIntoCart);
	if ($resultInsertIntoCart === TRUE) {
		$updateStatus = 1;		
	}
	echo $updateStatus;

?>