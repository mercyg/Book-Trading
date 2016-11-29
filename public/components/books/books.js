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
    };

    this.addBook = function (book) {
        return $http.post("/api/books", book)
            .then(function (response) {
                return response.data;
            }, function (response) {
                console.log("Error: " + response.status + " : " + response.statusText)
            })

    };
    
    this.getUserBooks = function(){
         return $http.get("/api/books?owner=me")
            .then(function(response){
                return response.data;
         }, function(response){
             console.log("Error: " + response.status + " : " + response.statusText)
         })
    }
    
    this.requestTrade = function(item){
        return $http.put("/api/books/traderequest/request/" + item._id, item)
            .then(function(response){
                return response
        })
    }
    
    this. unapprovedRequest = function(item){
        return $http.get("/api/books/" + item._id)
            .then(function(response){
              return response.data
              //console.log(response.data);
        })
    }
    
    
}]);

app.controller("BookController", ["$scope", "BookService", function ($scope, BookService) {
    $scope.books = [];
    $scope.addbook = false;
     $scope.add = 0;
    (function getBooks() {
        BookService.getBooks()
            .then(function (books) {
            //            console.log(books);
            $scope.books = books;
            
        });
    })();

    $scope.requestTrade = function(item, index){
      
        BookService.requestTrade(item)
            .then(function(response){
                if(response.data === "The request has been created sucessfully created"){
                    $scope.add++;
                }
        })
    }
    
}]);


app.controller("AddbookController", ["$scope", "BookService", "$location", function ($scope, BookService, $location) {
    $scope.trade = false;
    BookService.getBooks()
        .then(function (books) {
            $scope.books = books
        })
    $scope.addBook = function (input) {
        BookService.addBook(input)
            .then(function (response) {
                    $scope.books.push(response);
                    //  $location.path("/books")
        })
    };
    
    $scope.getUserBooks = function() {
        BookService.getUserBooks()
            .then(function(myBooks){
                $scope.myBooks = myBooks;
        });
    };
    
    
    $scope.unapprovedRequest = function(item){
        $scope.trade = true;
        BookService.unapprovedRequest(item)
            .then(function(requestbook){
               // console.log(requestbook)
                $scope.requestbook = requestbook;
        })
    }
    
    function init(){
       $scope.getUserBooks()
    }
    
    init();
    

}])




