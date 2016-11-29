var app = angular.module("BookApp", ["ngRoute", "Auth"])

app.config(function($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl: "components/home/home.html"
    })
       .when("/books",{
            templateUrl: "components/books/books.html",
            controller: "BookController"
    })
       .when("/addbook",{
            templateUrl: "components/books/addbook.html",
            controller: "AddbookController"
    })
     
    
      
})