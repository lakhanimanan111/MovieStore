<?php
	
	//include 'ChromePhp.php';
	session_start();
	
	require_once('../includes/dbconnect.php');

	$sql = "select sum(quantity) as count from tempcart";
	
	
	$result = $connection->query($sql);

	$rows = array();
	if ($result->num_rows > 0) {
			$row = $result->fetch_assoc();
			$result = $row['count'];
	}

	//$result = json_encode($rows);

	//ChromePhp::log($result);

	echo $result;

?>
