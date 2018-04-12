var app = angular.module('myApp', []);

app.directive('ngFile', ['$parse', function ($parse) {
  return {
   restrict: 'A',
   link: function(scope, element, attrs) {
     element.bind('change', function(){

     $parse(attrs.ngFile).assign(scope,element[0].files)
     scope.$apply();
   });
  }
 };
}]);

app.controller("MovieController", function($scope, $http, $window) {
   	$scope.message = "";
    
     $scope.getAllMovies = function () {
        var resourceUrl = "/movies";

        $http({
            method : "GET",
            url : resourceUrl,
        }).then(function mySuccess(response) {
            $scope.movies = response.data;
        }, function myError(response) {
            var message = "There seems to be a problem.";
             $("#returnmsg").html(message);
            $("#messagemodal").modal('show');
            
        });
    } 

    if($scope.movies == null)
    {
     $scope.getAllMovies();
    }

    
    $scope.deleteMovie = function () {

        $scope.movies = $scope.movies.filter(function( obj ) {
            return obj.movieid !== $scope.movieid;
        });

    	var resourceUrl = "/movies" + "/" + $scope.movieid;
    	$scope.movieid = null;

        $http({
	        method : "DELETE",
	        url : resourceUrl,
	    }).then(function mySuccess(response) {
	        var message = "Movie was deleted successfully";

	     //     $("#returnmsg").html(message);
    		// $("#messagemodal").modal('show');
	    }, function myError(response) {
	        var message = "There was a problem with the deletion";
	     //      $("#returnmsg").html(message);
    		// $("#messagemodal").modal('show');
	    });
    } 

    $scope.addMovie = function () {

    	if($scope.moviedetails)
    	{
    		 var data = $.param({
                title: $scope.moviedetails.title,
                genre: $scope.moviedetails.genre,
                description: $scope.moviedetails.description,
                year: $scope.moviedetails.year,
                runtime_minutes: $scope.moviedetails.runtime_minutes,
                rating: $scope.moviedetails.rating,
                uploaded_file_names: JSON.stringify(uploadedFileNames)
            });

    		$scope.moviedetails = null;
            uploadedFileNames = null;
        	$("#addmovieform").trigger("reset");

            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

    		var resourceUrl = "/movies";
        	$http.post(resourceUrl, data, config)
       		.then(function mySuccess(response) {
                $window.location.href = "../views/editmovie.html";

		        // var message = "Movie was added successfully";
		        //  $("#returnmsg").html(message);
    		    //   $("#messagemodal").modal('show');
		    }, function myError(response) {
		        var message = "There was a problem with the addition";
		         $("#returnmsg").html(message);
    		      $("#messagemodal").modal('show');
		    });
   		}
	} 


 

    $scope.upload = function(p_uploadfiles){
 
       var fd = new FormData();
       angular.forEach(p_uploadfiles,function(file){
         fd.append('file[]',file);
       });

       $scope.uploadfiles = null;

       var resourceUrl = "/fileupload";
       $http({
         method: 'post',
         url: resourceUrl,
         data: fd,
         headers: {'Content-Type': undefined},
       }).then(function successCallback(response) {  
         // Store response data
         uploadedFileNames = response.data;
        
    
            $scope.addMovie();    
       });
   }

   $scope.uploadAndAddMovieDetails = function() {

        $scope.upload($scope.uploadfiles);
   }

   $scope.confirmDeleteMovie = function(p_movieid) {
        $scope.movieid = p_movieid;
        $("#messagemodal").modal('show');

   }

});


