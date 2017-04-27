var app = angular.module("BookApp");

app.controller("PageScrollCtrl", ["$scope", "$location", "$anchorScroll",function($scope, $location, $anchorScroll){
    $scope.gotoMiddle = function(){
        $location.hash('second');
        $anchorScroll()
    }
}])
     

