
<?php 
session_start();
session_unset(); 
session_destroy(); 

require_once('../includes/dbconnect.php');

$sqlDelete = "delete from tempcart";
$resultDelete = $connection->query($sqlDelete);

?>
