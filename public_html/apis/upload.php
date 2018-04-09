<?php
//POST /fileupload/789 
//image file upload for movie number 789

// require_once('../includes/dbconnect.php');

include 'ChromePhp.php';

// $conn = $connection;


// $params = $_SERVER['PATH_INFO'];
// $requestMethod = $_SERVER['REQUEST_METHOD'];

// if(isset($params))
// {
// 	$paramint = str_replace('/','',$params );
// 	if(is_numeric($paramint))
// 	{

		/* Location */
		$location = '../images/';

		// Count total files
		$countfiles = count($_FILES['file']['name']);
		$filename_arr = array(); 

		// Looping all files
		for ( $i = 0;$i < $countfiles;$i++ ){
		    $filename = $_FILES['file']['name'][$i];  
		    // Upload file    
		    $ret = move_uploaded_file($_FILES['file']['tmp_name'][$i],$location.$filename);     
		    $filename_arr[] = $filename;
 
		    // echo $filename;
		    // echo $ret;
		    //add entry into the db
		 //    $query = "INSERT INTO `movieimages`(`movieid`, `imageurl`) VALUES (".$paramint.",'".$filename."')";

			// $result = mysqli_query ($conn,$query);
			
		}

		// $arr = array('name' => $filename_arr);
		echo json_encode($filename_arr);

// 	}
// }


?>