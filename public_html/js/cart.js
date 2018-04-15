app = angular.module("myApp");	
app.controller('cartController',['$scope', '$http', '$window',function($scope, $http, $window) {
   $scope.login = false;

   $scope.logout = function(){
        $http.get("../apis/logout.php").then(function(response) {
            $window.location.href = '../views/login.html';
        });
    };

    $http.get("../apis/session.php").then(function(response) {
        $scope.login = response.data.isLogin;
        if(!$scope.login) {

            alert("User has not logged in");
            $window.location.href = '../views/login.html';

        } else {

            $http.get("../apis/getCartDetails.php").then(function(response) {       
                $temp = response.data;
                console.log("temp: " + $temp);
                console.log($temp.length);
                $temp = $temp.length == 2 ? "" : $temp;
                console.log("temp: " + $temp);
                console.log($temp.length);
                $scope.cart = [];
                angular.forEach($temp, function(item) {
                    $scope.cart.push(item);
                    $scope.cart.price = parseInt(item.price);
                    $scope.cart.quantity = parseInt(item.quantity);
                })
            });

        }

    });


    $scope.addQuantity = function(movie) {
        movie.subDisabled = false;
        if(movie.quantity < 5) {
            movie.quantity = parseInt(movie.quantity) + 1;
            var data = {
                        movieid: movie.movieid,
                        quantity: movie.quantity
            };

            $http.post("../apis/updateTempCartQuantity.php", data).then(function(response) {
            });
        } else {
            movie.addDisabled = true;
        }
        
    }

    $scope.subQuantity = function(movie) {
        movie.addDisabled = false;
         if(movie.quantity > 0) {
            movie.quantity = parseInt(movie.quantity) - 1;
            var data = {
                        movieid: movie.movieid,
                        quantity: movie.quantity
            };

            $http.post("../apis/updateTempCartQuantity.php", data).then(function(response) {
            });
        } else {
            movie.subDisabled = true;
        }
        
    }


    $scope.getSubTotal = function() { 
        var subTotal = 0;
        angular.forEach($scope.cart, function(item) {
            subTotal = subTotal + (item.price * item.quantity);
        })
        return subTotal.toFixed(2);
    }
    

   $scope.getTotal = function() { 
    	console.log("subTotal" + $scope.subTotal);
    	var total = 0;
        var subTotal = $scope.getSubTotal();
    	total =  parseFloat(subTotal) + parseFloat(0.05*subTotal);
        if(total != 0){
            total = total + parseFloat(5.00);
        }  
    	return total.toFixed(2);
    }

    $scope.checkout = function() {
        $http.get("../apis/copyTempCart.php").then(function(response) {
            $window.location.href = '../views/checkout.html';
        });
        
    }

}]);