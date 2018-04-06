	var app = angular.module("myApp", ["ngTable"]);		
app.controller('searchController', ['$scope', '$http', '$filter', 'NgTableParams', function($scope, $http, $filter, NgTableParams) {
		$scope.search = function() {				
		var data = {
			searchString: $scope.searchText,
		};

		$http.post("../apis/search.php", data).then(function(response) {
				$scope.data = response.data;

			$scope.tableParams = new NgTableParams(

				{
					page: 1,            // show first page
					count: 10          // count per page
				}, 

				{

					total: $scope.data.length, // length of data
					getData: function(params) {
						
						var theData = angular.copy($scope.data);

						var filterObj = params.filter(),
						filteredData = $filter('filter')($scope.data, filterObj);

						
						Object.keys(filterObj).forEach(function (property) {
						    if (filterObj[property] === null) {
						      	//filteredData = $scope.data;
						      	delete filterObj[property];
						      	$scope.tableParams.reload();
						    }
					 	});
					 	filteredData = $filter('filter')($scope.data, filterObj);
						

						var sortObj = params.sorting(),
						orderedData = $filter('orderBy')(filteredData, sortObj);

						
						Object.keys(filterObj).forEach(function (property) {
						    if (filterObj[property] === null) {
						      //orderedData = $scope.data;
						      delete filterObj[property];
						      $scope.tableParams.reload();
						    }
					 	});
					 	

						return orderedData;
					}

				});
		});

		}

}]);