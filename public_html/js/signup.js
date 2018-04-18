var app = angular.module("myApp", []);
	
app.controller('signUpController',['$scope', '$http', '$window',function($scope, $http, $window) {
	
	$scope.checkEmailValidity = function(){
		$scope.usernameExists = false;
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		 $scope.userValidEmail = re.test(String($scope.email).toLowerCase());
		 
		 };
	
		var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
		var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
		
		
		$scope.analyze = function(value) {
                    if(strongRegex.test(value)) {
                        $scope.goodStrength = true;
                        $scope.mediumStrength = false;
                        $scope.badStrength = false;
                    } else if(mediumRegex.test(value)) {
                        $scope.goodStrength = false;
                        $scope.mediumStrength = true;
                        $scope.badStrength = false;
                    } else {
                        $scope.badStrength = true;
                        $scope.goodStrength = false;
                        $scope.mediumStrength = false;
                    }
                };
                
         $scope.verifyPassword = function(){
			if($scope.password ==  $scope.confirmpassword){
				$scope.passwordMatch = true;
				}else{
					$scope.passwordMatch = false;
					}
		 
		 
		 };       
		
	$scope.submit = function() {
		var data = {
		username: $scope.email,
		password: $scope.password,
		firstname: $scope.firstname,
		lastname: $scope.lastname,
	};
	
	var config = {
    params: {
        username: $scope.email
		}
	}

	
	$http.get("../apis/userinfo.php", config).then(function(response) {	
	 console.log(response.data);
	 if(response.data == 1){
		 $scope.usernameExists = true;
		 }
	 else{
		 
		 if(!$scope.usernameExists  && $scope.passwordMatch && $scope.goodStrength && $scope.userValidEmail){
				$http.post("../apis/signup.php", data)
				.then(function() {	
			$window.location.href = '../views/login.html';		
				});
			 }else{
				 $window.location.href = '../views/signup.html';
				 }
			
		 
		 }	 
	
    });
	
	
    

    };

    }]);
