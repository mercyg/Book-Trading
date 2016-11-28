var app = angular.module("BookApp");

app.service("BookService", ["$http", function($http){
    
}])

app.controller("BookController",["$scope", "BookService", function($scope, BookService){
    $scope.test = "hey"
    
}])