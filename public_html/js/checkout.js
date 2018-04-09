var app = angular.module("myApp", []);
	
app.controller('checkoutController',['$scope', '$http', '$window',function($scope, $http, $window) {

	$http.get("../apis/cartinfo.php").then(function(response) {		
        $scope.moviedata = response.data;
    });
    
    $scope.go = function () {
		$window.location.href = '../views/cart.html';
	};
    
   $scope.submit = function() { 
   $http.post("../apis/checkout.php")
    .then(function(response) {
		console.log(response);
		//if(response.data == 1){
			//$window.location.href = '../views/main.html';
			//}
		//else{	
			//$window.location.href = '../views/login.html';
			//}	
    });

    };

    }]);
