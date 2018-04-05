<?php
//Here are proposed URIs for movies:
//POST http://www.example.com/movies for creating a new movie.
//GET http://www.example.com/movies for getting all the movie.
//GET|PUT|DELETE http://www.example.com/movies/66432
//for reading, updating, deleting movie 66432, respectively.
require_once('../includes/dbconnect.php');
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

			$query = "UPDATE `moviedata` SET `title`='".$title."',`genre`='".$genre."',`description`='".$description."',`year`=".$year.",`runtime_minutes`=".$runtime_minutes.",`rating`=".$rating." WHERE `movieid` = ".$paramint;
			$result = mysqli_query ($conn,$query);
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

		$query = "INSERT INTO `moviedata`(`title`, `genre`, `description`,  `year`, `runtime_minutes`, `rating`) VALUES ('".$title."','".$genre."','".$description."',".$year.",".$runtime_minutes.",".$rating.")";

		$result = mysqli_query ($conn,$query);
		echo $result;
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