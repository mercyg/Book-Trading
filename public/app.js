var app = angular.module("BookApp", ["ngRoute", "Auth"])

app.config(function($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl: "components/home/home.html"
    })
       .when("/book",{
            templateUrl: "components/books/books.html",
            controller: "BookController"
    })
})