var app = angular.module("myApp", []);
	
app.controller('loginController',['$scope', '$http', '$window',function($scope, $http, $window) {
	
	$scope.submit = function() {
		var data = {
		username: $scope.email,
		password: $scope.password
	};
    $http.post("../apis/login.php", data)
    .then(function(response) {
		
		if(response.data == 1){
			$window.location.href = '../views/main.html';
			}
		else{	
			$window.location.href = '../views/login.html';
			}	
    });

    };

    }]);
