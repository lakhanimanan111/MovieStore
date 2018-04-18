<?php 

session_start();
$orderStatus = 0;
if(isset($_SESSION['userid'])){
$userid = $_SESSION["userid"];
require_once('../includes/dbconnect.php');
$cartsql = "select GROUP_CONCAT(p.quantitypurchased SEPARATOR ', ') as quantities, p.orderid, GROUP_CONCAT(m.title SEPARATOR ', ') as titles, GROUP_CONCAT(imageurl SEPARATOR ',') as images, GROUP_CONCAT(m.price SEPARATOR ', ') as price from purchasehistory as p join (select title, price, movieid, (SELECT imageurl FROM movieimages as i WHERE i.movieid = movieid limit 1) as imageurl from moviedata)as m on p.movieid  = m.movieid where userid='$userid' group by orderid";
$result = $connection->query($cartsql);
$resultArray = array();
if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
	$movieList = explode(',', $row["titles"]);
	$quantityList = explode(',', $row["quantities"]);
	$imageList = explode(',', $row["images"]);
	$priceList = explode(',', $row["price"]);
	$arrayLength = sizeof($movieList);
	
	$movieDetails = array();
	for ($i = 0; $i < $arrayLength; $i++) {
    $movieInfo = array('title' => $movieList[$i], 'quantity' =>  $quantityList[$i], 'imageurl' => $imageList[$i], 'cost' => $priceList[$i]);	
	$movieDetails[] = $movieInfo;	
	}
	$orderDetails = array("orderid"=>$row["orderid"], "moviedetails"=>$movieDetails);
	$resultArray[] = $orderDetails;
	}
	}
	echo json_encode($resultArray, JSON_FORCE_OBJECT);
}
else{
	echo 0;
	}

?>
 
