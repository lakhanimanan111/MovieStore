<?php
//POST /fileupload/789 
//image file upload for movie number 789



		$location = '../images/';
		$countfiles = count($_FILES['file']['name']);
		$filename_arr = array(); 
		for ( $i = 0;$i < $countfiles;$i++ ){
		    $filename = $_FILES['file']['name'][$i];  
		    // Upload file    
		    $ret = move_uploaded_file($_FILES['file']['tmp_name'][$i],$location.$filename);     
		    $filename_arr[] = $filename;
 
		}

		echo json_encode($filename_arr);

?>
