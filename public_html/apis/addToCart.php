<?php

	include 'ChromePhp.php';

	$updateStatus = 0;

	session_start();
	/*$userid = $_SESSION["userid"];
	if(!isset($userid)) {
		echo $updateStatus;
		return;
	}*/

	$request_body = file_get_contents('php://input');
	$requestParams = json_decode( $request_body, true );
	$movieObject = $requestParams["movieObject"];
	//ChromePhp::log($movieObject);
	

	$movieTitle = $movieObject["title"];
	ChromePhp::log($movieTitle);
	//$movieTitle = mysql_real_escape_string($movieTitle);

	require_once('../includes/dbconnect.php');

	//Get movie id for the selected movie
	$sqlGetMovieId = "select movieId from moviedata where title = '$movieTitle'";	
	ChromePhp::log($sqlGetMovieId);
	$resultGetMovieId = $connection->query($sqlGetMovieId);
	ChromePhp::log($resultGetMovieId->num_rows);
	if ($resultGetMovieId->num_rows > 0) {
		$row = $resultGetMovieId->fetch_assoc();
		$movieId = $row['movieId'];
		
	}
	ChromePhp::log($movieId);

	//update cart with the selected movie
	//$sqlInsertIntoCart = "insert into cart (userId, movieId, quantity) values ($userid, $movieId, 1)";
	$sqlInsertIntoCart = "insert into cart (userId, movieId, quantity) values (1, $movieId, 1)";
	ChromePhp::log($sqlInsertIntoCart);
	$resultInsertIntoCart = $connection->query($sqlInsertIntoCart);
	if ($resultInsertIntoCart === TRUE) {
		$updateStatus = 1;		
	}
	ChromePhp::log($updateStatus);
	echo $updateStatus;

?>