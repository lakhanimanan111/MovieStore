var app = angular.module("myApp", []);	
app.controller('cartController',['$scope', '$http', '$window',function($scope, $http, $window) {
	$http.get("../apis/cartinfo.php").then(function(response) {		
		//alert("Manan");
        $scope.cart = response.data;
    });


    $scope.getSubTotal = function() { 

    	var subTotal = 0;
	    for(var i = 0; i < $scope.cart.length; i++){
	        var product = $scope.cart[i];
	        subTotal += (product.price * product.quantity);
	    }
	    return subTotal;
    }

    $scope.getTotal = function() { 
    	alert('getTotal');
    	var total = 0;
    	total =  parseInt($scope.subTotal,10) + parseInt($scope.tax,10) +  parseInt($scope.shippingCost,10);
    	return total;
    }

}]);