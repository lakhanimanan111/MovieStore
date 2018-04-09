<?php
	
	//echo "Inside search php";
	//include 'ChromePhp.php';
	session_start();
	$request_body = file_get_contents('php://input');
	$requestParams = json_decode( $request_body, true );
	$searchString = $requestParams["searchString"];
	require_once('../includes/dbconnect.php');
	$sql = "select title, genre, description, actors, director, rating, year, runtime_minutes  from moviedata where title like '%$searchString%'";
	
	//ChromePhp::log($sql);
	mysqli_set_charset($connection, 'utf8mb4');
	$result = $connection->query($sql);
	
	//ChromePhp::log($result->num_rows);

	$rows = array();
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			$rows[] = $row;
		}
	}

	$result = json_encode($rows);

	//ChromePhp::log($result);

	echo $result;

?>