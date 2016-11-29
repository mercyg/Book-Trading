var app = angular.module("Auth");

app.controller("LogoutController", ["$scope", "$location","UserService"    ,function($scope, $location, UserService){
    
    UserService.logout();
    $location.path("/")
    
}])