var app = angular.module("myApp", []);
	
app.controller('checkoutController',['$scope', '$http', '$window',function($scope, $http, $window) {
	
	$http.get("../apis/session.php").then(function(response) {
	$scope.login = response.data.isLogin;		
	$scope.admin = response.data.isAdmin;	 
	 
	});
	$scope.logout = function(){
	$http.get("../apis/logout.php").then(function(response) {
	$window.location.href = '../views/cover.html';
	});
	};
	
	$scope.totalCost = 0;
	$http.get("../apis/cartinfo.php").then(function(response) {	
	 $scope.disableCheckout = false;
	 if(response.data != 0){
		 
		 	
		for(x in response.data){
		$scope.totalCost = $scope.totalCost + response.data[x].cost;
		}
		
		$scope.moviedata = response.data;
		if(angular.equals({}, response.data))
			$scope.disableCheckout = true;
		
	}else{
		$window.location.href = '../views/login.html';
		}

	
    });
    	
   $scope.failure = false; 
   $scope.submit = function() { 
   $http.post("../apis/checkout.php")
    .then(function(response) {
		console.log(response);
		if(response.data == 1){
			$window.location.href = '../views/main.html';
			}else if(response.data == 2){
				$window.location.href = '../views/login.html';
			} else if (response.data == 0){
				$scope.failure = true;
				}
			
    });

    };

    }]);
