<?php
	
	//include 'ChromePhp.php';
	session_start();
	$request_body = file_get_contents('php://input');
	$requestParams = json_decode( $request_body, true );
	$searchString = $requestParams["searchString"];
	require_once('../includes/dbconnect.php');
	/*$sql = "select movieid, title, genre, description, actors, director, rating, year, runtime_minutes, price from moviedata where title like '%$searchString%'";*/

	$sql = "select m.movieid, m.title, m.genre, m.description, m.rating, m.year, m.runtime_minutes, m.price, (SELECT imageurl FROM movieimages WHERE movieid = m.movieid limit 1) as imageurl from moviedata as m where m.title like '%$searchString%'";
	
	mysqli_set_charset($connection, 'utf8mb4');
	$result = $connection->query($sql);

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
