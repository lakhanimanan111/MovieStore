var app = angular.module("myApp", ['ui.bootstrap']);
app.controller('mainController', ['$scope', '$http', '$window', function($scope, $http, $window) {
	 $scope.filteredMovieList = []
	,$scope.currentPage = 0
	,$scope.numPerPage = 10
	,$scope.maxSize = 5
	,$scope.cart = []
	,$scope.count = 0
	,$scope.login = false;


	$http.get("../apis/session.php").then(function(response) {
		$scope.login = response.data.isLogin;		
		$scope.admin = response.data.isAdmin;	 
	 
	});

	

	$scope.logout = function(){
		$http.get("../apis/logout.php").then(function(response) {
			$window.location.href = '../views/cover.html';
		});
	};


	$scope.search = function() {		
		
		var data = {
			searchString: $scope.searchText,
		};

		$http.post("../apis/search.php", data).then(function(response) {
				if(!response.data == []) {
					$scope.movieList =  response.data;
					$scope.currentPage = 1;
				}
		    })
	}

	$scope.addToCart = function(movie) {
        if(!$scope.login) {
        	
            $window.location.href = '../views/login.html';

        } else {

			var data = {
				movieObject: movie,
			};

			$http.post("../apis/addToCart.php", data).then(function(response) {
					movie.disabled = true;
			});

        }
		
	}

	$scope.buy = function(movie) {
		if(!$scope.login) {
            $window.location.href = '../views/login.html';

        } else {

        	var data = {
				movieObject: movie,
			};

        	$http.post("../apis/buyMovie.php", data).then(function(response) {
        		$window.location.href = "../views/checkout.html";
        	});
        }

	}

}]); 
