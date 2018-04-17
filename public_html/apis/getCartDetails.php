<?php 

include 'ChromePhp.php';
session_start();

$userid = $_SESSION["userid"];

require_once('../includes/dbconnect.php');

$sql = "select m.movieid, m.title, m.genre, m.description, c.quantity, m.price, (SELECT imageurl FROM movieimages WHERE movieid = m.movieid limit 1) as imageurl, (SELECT stockavailable from inventory where movieid = m.movieid) as stockavailable from tempcart as c join moviedata as m on c.movieid = m.movieid where c.userid = '$userid'";
$result = $connection->query($sql);
$resultArray = array();
if ($result->num_rows > 0) {

		while($row = $result->fetch_assoc()) {	
			$resultArray[] = $row;
		} 
	ChromePhp::log($resultArray);
	echo json_encode($resultArray, JSON_FORCE_OBJECT);

} else {

	return;

}
?>
