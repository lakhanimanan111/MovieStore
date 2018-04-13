var app = angular.module("myApp", ['ui.bootstrap']);
app.controller('mainController', ['$scope', '$http', '$window', function($scope, $http, $window) {
	 $scope.filteredMovieList = []
	,$scope.currentPage = 0
	,$scope.numPerPage = 10
	,$scope.maxSize = 5
	,$scope.cart = []
	,$scope.count = 0;
	//,$scope.isDisabled = false;

	$scope.search = function() {		
		//$scope.movieList = [];
		var data = {
			searchString: $scope.searchText,
		};

		//alert(data.searchString);
		$http.post("../apis/search.php", data).then(function(response) {
						if(!response.data == []) {
							$scope.movieList =  response.data;
							$scope.currentPage = 1;
						}
				    })
	}

	$scope.addToCart = function(movie) {
		//alert(movie.title);
		$scope.cart.push(movie);
		//$scope.count = $scope.count+1;
		var data = {
			movieObject: movie,
		};

		$http.post("../apis/addToCart.php", data).then(function(response) {
			//console.log("Add to cart status: " + response.data);
			if (response.data == 0) {
				$window.location.href = '../views/login.html';
			} else {
				$scope.count = $scope.count + 1;
				//$scope.isDisabled = true;
				movie.disabled = true;
			}
		})
	}

	$scope.$watch('currentPage + numPerPage + movieList.length', function() {

		if($scope.currentPage > 0) {
		    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
		    , end = begin + $scope.numPerPage;
		    
		    $scope.filteredMovieList = $scope.movieList.slice(begin, end);

		}
    
  });

}]); 
