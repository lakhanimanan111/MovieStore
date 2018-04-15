<?php

	include 'ChromePhp.php';

	$updateStatus = 0;

	session_start();

	$userid = $_SESSION["userid"];

	if(isset($userid)) {

		$updateStatus = 1;
	}

	echo $updateStatus;

?>