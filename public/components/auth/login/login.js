var app = angular.module("Auth");

app.controller("LoginController", ["$scope", "$location", "UserService", function($scope, $location, UserService){
    $scope.login = function(user){
        console.log(user);
        UserService.login(user).then(function(response){
            $location.path("/books")
        }, function(response){
            alert(response.data.message);
        });
        
    }
}])