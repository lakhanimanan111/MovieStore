var app = angular.module('myApp', []);
// app.controller('MovieController', function($scope, $http) {
//     $http({
//         method : "POST",
//         url : "/movies"
//     }).then(function mySuccess(response) {
//         $scope.myWelcome = response.data;
//     }, function myError(response) {
//         $scope.myWelcome = response.statusText;
//     });
// });

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

app.controller("MovieController", function($scope, $http) {
   	$scope.message = "";
    $scope.getMovie = function () {
    	var resourceUrl = "/movies" + "/" + $scope.movieid;

        $http({
	        method : "GET",
	        url : resourceUrl,
	    }).then(function mySuccess(response) {
	        $scope.modifiedmoviedetails = response.data;
	    }, function myError(response) {
	       	var message = "Movie is not found.Please check the id entered.";
	         $("#returnmsg").html(message);
    		$("#messagemodal").modal('show');
	        
	    });
    }
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
    $scope.deleteMovie = function () {
    	var resourceUrl = "/movies" + "/" + $scope.movieid;
    	$scope.movieid = null;

        $http({
	        method : "DELETE",
	        url : resourceUrl,
	    }).then(function mySuccess(response) {
	        var message = "Movie was deleted successfully";
	         $("#returnmsg").html(message);
    		$("#messagemodal").modal('show');
	    }, function myError(response) {
	        var message = "There was a problem with the deletion";
	          $("#returnmsg").html(message);
    		$("#messagemodal").modal('show');
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
        	$("#addmovieform").trigger("reset");

            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

    		var resourceUrl = "/movies";
        	$http.post(resourceUrl, data, config)
       		.then(function mySuccess(response) {
		        var message = "Movie was added successfully";
		         $("#returnmsg").html(message);
    		      $("#messagemodal").modal('show');
		    }, function myError(response) {
		        var message = "There was a problem with the addition";
		         $("#returnmsg").html(message);
    		      $("#messagemodal").modal('show');
		    });
   		}
	} 


    $scope.updateMovie = function () {
    	if($scope.modifiedmoviedetails)
    	{
    		var resourceUrl = "/movies" + "/" + $scope.movieid;

    		 var data = $.param({
                title: $scope.modifiedmoviedetails.title,
                genre: $scope.modifiedmoviedetails.genre,
                description: $scope.modifiedmoviedetails.description,
                year: $scope.modifiedmoviedetails.year,
                runtime_minutes: $scope.modifiedmoviedetails.runtime_minutes,
                rating: $scope.modifiedmoviedetails.rating
            });
       
       		$scope.modifiedmoviedetails = null;
       		$scope.movieid = null;
        	$("#modifymovieform").trigger("reset");

            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

        	$http.put(resourceUrl, data, config)
        	.then(function mySuccess(response) {
		        var message = "Movie was updated successfully";
		         $("#returnmsg").html(message);
    		$("#messagemodal").modal('show');
		    }, function myError(response) {
		        var message = "There was a problem with the updation";
		         $("#returnmsg").html(message);
    		$("#messagemodal").modal('show');
		    });

		 
    	}
    	
    } 

    $scope.upload = function(){
 
       var fd = new FormData();
       angular.forEach($scope.uploadfiles,function(file){
         fd.append('file[]',file);
       });

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
        $scope.upload();
   }
});



