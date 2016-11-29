var app = angular.module("BookApp");

app.service("BookService", ["$http", function ($http) {
    this.getBooks = function () {
        return $http.get("/api/books")
            .then(function (response) {
//                console.log(response.data)
                return response.data;
            }, function (response) {
                console.log("Error " + response.status + " : " + response.statusText)
            })
    }
    
    this.addBook = function(book){
        return $http.post("/api/books", book)
            .then(function(response){
                return response.data;
        }, function(response){
                console.log("Error: " + response.status + " : " + response.statusText)
        })
            
    };
}]);

app.controller("BookController", ["$scope", "BookService", function ($scope, BookService) {
    $scope.books = [];
    $scope.addbook = false;
    (function getBooks() {
        BookService.getBooks().then(function (books) {
//            console.log(books);
            $scope.books = books;
        });
    })();

    $scope.addBook = function(input){
        BookService.addBook(input)
            .then(function(data){
                  $scope.books.push(data);
    })
}
    
}]);