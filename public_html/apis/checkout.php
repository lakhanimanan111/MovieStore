<?php 

session_start();
$orderStatus = 0;
if(isset($_SESSION['userid'])){
$userid = $_SESSION["userid"];
require_once('../includes/dbconnect.php');
$cartsql = "select m.title, m.movieid, m.genre,m.description,c.quantity from cart as c join moviedata as m on c.movieid = m.movieid where c.userid = '$userid'";
$result = $connection->query($cartsql);
$resultArray = array();
$orderid = uniqid();
$purchaseSql = "";
$inventorySql = "";
$cartsql = "";
if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
		$movieid = $row["movieid"];
		$quantity = $row["quantity"];
		$purchaseSql .= "insert into purchasehistory (userid, movieid, quantitypurchased, orderid) values ($userid, $movieid,$quantity, '$orderid'); ";
		$inventorySql .= "update inventory set stockavailable = stockavailable - $quantity where movieid = $movieid;";
		$cartsql .= "delete from cart where userid = $userid;";
		$sqlDelete = "delete from tempcart;";
		}
	}
	$sql = $purchaseSql . $inventorySql . $cartsql . $sqlDelete;
	if ($connection->multi_query($sql) === TRUE) {
		$orderStatus = 1;
	}	
	
	echo $orderStatus;
}else{
	$orderStatus = 2;
	echo $orderStatus;
	}

?>
