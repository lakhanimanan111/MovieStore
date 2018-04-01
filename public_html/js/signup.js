
var app = angular.module("myApp", []);
	
app.controller('signUpController',['$scope', '$http', function($scope, $http) {
	
	$scope.submit = function() {
		var data = {
		username: $scope.email,
		password: $scope.password,
		firstname: $scope.firstname,
		lastname: $scope.lastname,
	};
    $http.post("../apis/signup.php", data)
    .then(function(response) {
		console.log(response);
    });

    };

    }]);
