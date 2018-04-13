
var app = angular.module("myApp", []);
	
app.controller('navBarController',['$scope', '$http', '$window',function($scope, $http, $window) {
	
	$http.get("../apis/session.php").then(function(response) {
	$scope.login = response.data.isLogin;		
	$scope.admin = response.data.isAdmin;	 
	 
});

    }]);
