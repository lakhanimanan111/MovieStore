var app = angular.module("myApp", []);
app.controller('orderHistoryController',['$scope', '$http', '$window',function($scope, $http, $window) {
	
	$http.get("../apis/session.php").then(function(response) {
	$scope.login = response.data.isLogin;		
	$scope.admin = response.data.isAdmin;	 
	 
	});
	$scope.logout = function(){
	$http.get("../apis/logout.php").then(function(response) {
	$window.location.href = '../views/cover.html';
	});
	};
	
	$http.get("../apis/orderhistory.php").then(function(response) {	
			console.log(response.data);
			if(response.data!=0){
			$scope.orderhistory = response.data;}
			else{
				$window.location.href = '../views/login.html';
				}
		});
	
}]);
