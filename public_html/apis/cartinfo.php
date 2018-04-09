<?php 

session_start();
$userid = $_SESSION["userid"];
require_once('../includes/dbconnect.php');

$sql = "select m.title, m.genre,m.description,c.quantity from cart as c join moviedata as m on c.movieid = m.movieid where c.userid = '$userid'";
$result = $connection->query($sql);
$resultArray = array();
if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
		$row_Array = array('title' => $row["title"], 'genre' =>  $row["genre"], 'description' => $row["description"], 'quantity' => $row["quantity"]);	
		$resultArray[] = $row_Array;
		}
		
	} 
	//echo $userid;
	echo json_encode($resultArray, JSON_FORCE_OBJECT);
	
?>
