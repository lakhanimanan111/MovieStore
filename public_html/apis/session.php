<?php 
session_start();
$sessionArray = array('isLogin' => $_SESSION["isLoggedIn"], 'isAdmin' => $_SESSION["isAdmin"]);

echo json_encode($sessionArray);
 
 
 ?>
