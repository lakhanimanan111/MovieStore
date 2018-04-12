<?php
//Here are proposed URIs for movies:
//POST http://www.example.com/movies for creating a new movie.
//GET http://www.example.com/movies for getting all the movie.
//GET|PUT|DELETE http://www.example.com/movies/66432
//for reading, updating, deleting movie 66432, respectively.

//DELETE http://www.example.com/movies/image deleting the image for that movie

require_once('../includes/dbconnect.php');
include 'ChromePhp.php';

$conn = $connection;


$params = $_SERVER['PATH_INFO'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

if(isset($params))
{
	$paramint = str_replace('/','',$params );
	if(is_numeric($paramint))
	{
		//id is given
		//check the request method'GET',  'PUT', 'DELETE'.
		if($requestMethod == 'GET')
		{
			//return the movie for the given id
			$query = "SELECT `movieid`, `title`, `genre`, `description`, `year`, `runtime_minutes`, `rating` FROM `moviedata` WHERE `isDeleted`!= 1 AND `movieid` = ".$paramint;

			$result = mysqli_query ($conn,$query);
			if(mysqli_num_rows($result) > 0) 
			{
				$row1 = mysqli_fetch_assoc($result);	
				$row1 = array_change_key_case($row1,CASE_LOWER);

				$rows = array();
				//get movie images
				$query1 = "SELECT `imageurl` FROM `movieimages` WHERE `movieid` = ".$paramint;	
				$result1 = mysqli_query ($conn,$query1);

				if(mysqli_num_rows($result1) > 0) 
				{
					while($row2 = mysqli_fetch_assoc($result1)) 
					{	
						$row2 = array_change_key_case($row2,CASE_LOWER);		
				 		$rows[] = $row2["imageurl"];
					} 
			 		$row1["imageurl"] =  $rows;
				}

				echo json_encode($row1);	
			} else {
				echo http_response_code(404);
			}

		}
		else if($requestMethod == 'PUT')
		{
			//update the movie for the given id
		    parse_str(file_get_contents("php://input"),$post_vars);

			$title = $post_vars['title'];
			$genre = $post_vars['genre'];
			$description = $post_vars['description'];
			$year = $post_vars['year'];
			$runtime_minutes = $post_vars['runtime_minutes'];
			$rating = $post_vars['rating'];
			$uploadedfilenames = json_decode($post_vars['uploaded_file_names']);

			//update row in moviedata table
			$query = "UPDATE `moviedata` SET `title`='".$title."',`genre`='".$genre."',`description`='".$description."',`year`=".$year.",`runtime_minutes`=".$runtime_minutes.",`rating`=".$rating." WHERE `movieid` = ".$paramint;
			$result = mysqli_query ($conn,$query);

			//insert all the picture file names into the movieimages table
			foreach ($uploadedfilenames as &$value) {
				$query3 = "INSERT INTO `movieimages`(`movieid`, `imageurl`) VALUES (".$paramint.",'".$value."')";
				$result3 = mysqli_query ($conn,$query3);	
			}
			echo $result;
		} 
		else if($requestMethod == 'DELETE')
		{
			//delete the movie for the given id
			//$query = "DELETE FROM `moviedata` WHERE `movieid` = ".$paramint;
			$query = "UPDATE `moviedata` SET `isDeleted`= 1 WHERE `movieid` = ".$paramint;
			$result = mysqli_query ($conn,$query);
			echo $result;
		}  
	} else {
		//not numeric meaning hitting /image api
		 if($requestMethod == 'DELETE')
		{
			//delete an image for a particular movie
			parse_str(file_get_contents("php://input"),$post_vars);
			$movieid = $post_vars['movieid'];
			$imageurl = $post_vars['imageurl'];

			$query = "DELETE FROM `movieimages` WHERE `movieid` = ".$movieid." AND imageurl = '".$imageurl."'";
			$result = mysqli_query ($conn,$query);
			echo $result;

		}
	}
} else {
	if($requestMethod == 'POST')
	{
		//create a new row
		//check the post request for the movie details
		$title = $_POST['title'];
		$genre = $_POST['genre'];
		$description = $_POST['description'];
		$year = $_POST['year'];
		$runtime_minutes = $_POST['runtime_minutes'];
		$rating = $_POST['rating'];
		$uploadedfilenames = json_decode($_POST['uploaded_file_names']);
		

		//insert new movie into movie data table
		$query = "INSERT INTO `moviedata`(`title`, `genre`, `description`,  `year`, `runtime_minutes`, `rating`) VALUES ('".$title."','".$genre."','".$description."',".$year.",".$runtime_minutes.",".$rating.")";

		$result = mysqli_query ($conn,$query);

		//get the max field of movie id as its an auto incrementing field
		$query2 = "SELECT MAX(movieid) FROM moviedata";
		$result2 = mysqli_query ($conn,$query2);
		$lastrow = mysqli_fetch_assoc($result2);	
		$retid = $lastrow["MAX(movieid)"];
		

		//insert all the picture file names into the movieimages table
		foreach ($uploadedfilenames as &$value) {
			$query3 = "INSERT INTO `movieimages`(`movieid`, `imageurl`) VALUES (".$retid.",'".$value."')";
			$result3 = mysqli_query ($conn,$query3);	
		}
	}
	else if($requestMethod == 'GET')
	{
		//return all the movies
		$query = "SELECT `movieid`, `title`, `genre`, `description`, `year`, `runtime_minutes`, `rating` FROM `moviedata` WHERE `isDeleted`!= 1";
		$rows = array();

		mysqli_set_charset($conn, 'utf8mb4');  // procedural style

		$result = mysqli_query ($conn,$query);

		if(mysqli_num_rows($result) > 0) 
		{
			// echo "am here".mysqli_num_rows($result);
			while($row2 = mysqli_fetch_assoc($result)) 
			{	
				// echo "while loop";
				$row2 = array_change_key_case($row2,CASE_LOWER);		
		 		$rows[] = $row2;
			} 	
			echo json_encode($rows);	
			// echo json_last_error_msg(); 
		} else {
			echo "error";
			echo http_response_code(404);
		}
	} 
}

mysqli_close($conn);


?>