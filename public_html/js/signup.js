
var app = angular.module("myApp", []);
	
app.controller('signUpController',['$scope', '$http', '$window',function($scope, $http, $window) {
	
	$scope.submit = function() {
		var data = {
		username: $scope.email,
		password: $scope.password,
		firstname: $scope.firstname,
		lastname: $scope.lastname,
	};
    $http.post("../apis/signup.php", data)
    .then(function() {	
		$window.location.href = '../views/login.html';
			
			
    });

    };

    }]);
