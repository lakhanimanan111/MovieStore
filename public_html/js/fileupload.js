var upload = angular.module('myApp');
upload.directive('ngFile', ['$parse', function ($parse) {
  return {
   restrict: 'A',
   link: function(scope, element, attrs) {
     element.bind('change', function(){

     $parse(attrs.ngFile).assign(scope,element[0].files)
     scope.$apply();
   });
  }
 };
}]);

upload.controller('UploadController', ['$scope', '$http', function ($scope, $http) {
  $scope.upload = function(){
 
   var fd = new FormData();
   angular.forEach($scope.uploadfiles,function(file){
     fd.append('file[]',file);
   });

   var resourceUrl = "/fileupload"
   $http({
     method: 'post',
     url: resourceUrl,
     data: fd,
     headers: {'Content-Type': undefined},
   }).then(function successCallback(response) {  
     // Store response data
     $scope.response = response.data;
   });
 }
 
}]);
