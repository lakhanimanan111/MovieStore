
<?php 


require_once('../includes/dbconnect.php');
$username = $_GET["username"];

$sql = "select * from user where username = '$username'";
$result = $connection->query($sql);
$resultArray = array();
$userExists = 0;
if ($result->num_rows > 0) {
		$userExists = 1;
		}

echo $userExists;


?>
