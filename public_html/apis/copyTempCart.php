<?php
	
	//include 'ChromePhp.php';
	session_start();
	
	require_once('../includes/dbconnect.php');
	
	$sql = "insert into cart SELECT * FROM tempcart where quantity > 0";
	
	$resultinsert = $connection->query($sql);

	
	if ($resultinsert === TRUE) {
			
		$sqlDelete = "delete from tempcart";
		$resultDelete = $connection->query($sqlDelete);

		if($resultDelete == TRUE)
			echo 1;
	}

?>
