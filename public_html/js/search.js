var app = angular.module("myApp", ['ui.bootstrap']);
app.controller('mainController', ['$scope', '$http', function($scope, $http) {
	 $scope.filteredMovieList = []
	,$scope.currentPage = 0
	,$scope.numPerPage = 10
	,$scope.maxSize = 5;

	$scope.search = function() {		
		var data = {
			searchString: $scope.searchText,
		};

		//alert(data.searchString);
		$http.post("../apis/search.php", data).then(function(response) {
						if(!response.data == []) {
							$scope.movieList =  response.data;
							$scope.currentPage = 1;
						}
				    })
	}

	$scope.$watch('currentPage + numPerPage', function() {

		if($scope.currentPage > 0) {
		    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
		    , end = begin + $scope.numPerPage;
		    
		    $scope.filteredMovieList = $scope.movieList.slice(begin, end);

		}
    
  });

}]); 
