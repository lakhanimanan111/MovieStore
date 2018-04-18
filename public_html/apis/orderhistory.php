<?php 

session_start();
$orderStatus = 0;
if(isset($_SESSION['userid'])){
$userid = $_SESSION["userid"];
require_once('../includes/dbconnect.php');
$cartsql = "select GROUP_CONCAT(p.quantitypurchased SEPARATOR ', ') as quantities,GROUP_CONCAT(p.timestamp SEPARATOR ', ') as timestamp, p.orderid, GROUP_CONCAT(m.title SEPARATOR ', ') as titles, GROUP_CONCAT(imageurl SEPARATOR ',') as images, GROUP_CONCAT(m.price SEPARATOR ', ') as price from purchasehistory as p join (select title, price, movieid, (SELECT imageurl FROM movieimages as i WHERE i.movieid = d.movieid limit 1) as imageurl from moviedata as d)as m on p.movieid  = m.movieid where userid='$userid' group by orderid";
$result = $connection->query($cartsql);
$resultArray = array();
if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
	$movieList = explode(',', $row["titles"]);
	$timestamp = explode(',', $row["timestamp"]);
	$quantityList = explode(',', $row["quantities"]);
	$imageList = explode(',', $row["images"]);
	$priceList = explode(',', $row["price"]);
	$arrayLength = sizeof($movieList);
	
	$movieDetails = array();
	for ($i = 0; $i < $arrayLength; $i++) {
    $movieInfo = array('title' => $movieList[$i], 'quantity' =>  $quantityList[$i], 'imageurl' => $imageList[$i], 'cost' => $priceList[$i]);	
	$movieDetails[] = $movieInfo;	
	}
	$date = explode(' ', $timestamp[0]);
	$orderDetails = array("orderid"=>$row["orderid"], "timestamp"=>$date[0],"moviedetails"=>$movieDetails);
	$resultArray[] = $orderDetails;
	}
	}
	echo json_encode($resultArray, JSON_FORCE_OBJECT);
}
else{
	echo 0;
	}

?>
 
