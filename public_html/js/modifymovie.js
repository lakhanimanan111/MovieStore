var app = angular.module('myApp');

app.config( [ '$locationProvider', function( $locationProvider ) {
   // In order to get the query string from the
   // $location object, it must be in HTML5 mode.
   // $locationProvider.html5Mode( true );
   $locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});
}]);

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


app.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value, 10);
      });
    }
  };
});

app.controller ( "ModifyMovieController", ['$scope', '$http', '$window', '$location',
    function($scope, $http, $window, $location) {

       $http.get("../apis/session.php").then(function(response) {
			  $scope.login = response.data.isLogin;   
			  $scope.admin = response.data.isAdmin;  
			   if(!$scope.admin && !$scope.login)
				{
					$window.location.href = '../views/signup.html';

				}
		});
  
  $scope.logout = function(){
  $http.get("../apis/logout.php").then(function(response) {
  $window.location.href = '../views/cover.html';
  });
  };

    var isMovieEdited = false;

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
    
    if ( $location.search().hasOwnProperty( 'movieid' ) ) {
       $scope.movieid = $location.search()['movieid'];
       $scope.getMovie ();
    }
    //     var searchObject = $location.search();
    // $scope.movieid = searchObject.movieid;
   

    // $scope.getMovie ();
   
   

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
                rating: $scope.modifiedmoviedetails.rating,
                uploaded_file_names: JSON.stringify(uploadedFileNames)

            });
       
            $scope.modifiedmoviedetails = null;
            $scope.movieid = null;
            uploadedFileNames = null;
            $("#modifymovieform").trigger("reset");

            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

            $http.put(resourceUrl, data, config)
            .then(function mySuccess(response) {
                $window.location.href = "../views/editmovie.html";

            //     var message = "Movie was updated successfully";
            //      $("#returnmsg").html(message);
            // $("#messagemodal").modal('show');
            }, function myError(response) {
                var message = "There was a problem with the updation";
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
         if(isMovieEdited){
            isMovieEdited = false;
            $scope.updateMovie();
         }     
       });
   }

    $scope.uploadAndEditMovieDetails = function() {
        isMovieEdited = true;
        $scope.upload($scope.modifiedmoviedetails.uploadfiles);
   }

    $scope.deleteMovieImage = function(p_imageurl,p_movieid){

        var index = $scope.modifiedmoviedetails.imageurl.indexOf(p_imageurl);
        if (index > -1) {
            $scope.modifiedmoviedetails.imageurl.splice(index, 1);
        }
        var resourceUrl = "/movies" + "/image";

        var data = $.param({
                movieid: p_movieid,
                imageurl: p_imageurl
            });
        $http({
            method : "DELETE",
            url : resourceUrl,
            data: data
        }).then(function mySuccess(response) {
            var message = "Movie image was deleted successfully";
             
        }, function myError(response) {
            var message = "There was a problem with the deletion";
             
        });
   }

}]);
