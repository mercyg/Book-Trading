var app = angular.module("BookApp");

app.service("BookService", ["$http", function ($http) {
    this.getBooks = function () {
        return $http.get("/api/books")
            .then(function (response) {
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

    this.getUserBooks = function () {
        return $http.get("/api/books?owner=me")
            .then(function (response) {
                return response.data;
            }, function (response) {
                console.log("Error: " + response.status + " : " + response.statusText)
            })
    }

    this.requestTrade = function (item) {
        return $http.put("/api/books/traderequest/request/" + item._id, item)
            .then(function (response) {
                return response
            })
    }

    this.unapprovedRequest = function (item) {
        return $http.get("/api/books/traderequest/unapproved/rbook")
            .then(function (response) {
                return response.data
            })
    }

    this.myRequest = function () {
        return $http.get("/api/books/traderequest/myrequest/rbook")
            .then(function (response) {
                return response.data
            })
    }

    this.acceptRequest = function (book) {
        return $http.put("/api/books/traderequest/accept/" + book._id, book)
            .then(function (response) {
                return response;
            })

    }
    
    this.declineRequest = function(book){
        return $http.put("/api/books/traderequest/decline/" + book._id, book)
            .then(function(response){
                return response.data;
        })
    }
    
    this.countRequest = function(){
        return $http.get("/api/books/traderequest/myrequest/count")
                    .then(function(response){
                    return response.data
        })
    }
    
    this.countTrade = function(){
        return $http.get("/api/books/traderequest/myrequest/rcount")
            .then(function(response){
                return response.data
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
                $scope.books = books;

            });
    })();

    $scope.requestTrade = function (item, index) {
        BookService.requestTrade(item)
            .then(function (response) {
                if (response.data === "The request has been created sucessfully created") {
                    $scope.add++;
                }
            })
    }

}]);


app.controller("AddbookController", ["$scope", "BookService", "$location", function ($scope, BookService, $location) {
    $scope.ismyrequest = true;
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

    $scope.getUserBooks = function () {
        BookService.getUserBooks()
            .then(function (myBooks) {
                $scope.myBooks = myBooks;
            });
    };

//Scope to get the book that are requested for me
    $scope.unapprovedRequest = function () {
        $scope.trade = true;
        BookService.unapprovedRequest()
            .then(function (requestbook) {
            for(var i = 0; i < requestbook.length; i++){
                requestbook[i].isDecline = false
            }
                $scope.requestbook = requestbook;
            
            })
    }
//Scope to get all my requested book
    $scope.myRequest = function () {
        $scope.traderequest = true
        $scope.ismyrequest = false;
        BookService.myRequest()
            .then(function (myrequest) {
                console.log(myrequest)
                $scope.myrequest = myrequest;
            })
    }
//Scope to accept my book request
    $scope.acceptRequest = function (book) {
        $scope.myVar = true
        BookService.acceptRequest(book)
            .then(function (response) {
                console.log(response);
            })
    }
//Scope to decline my book request
    $scope.declineRequest = function(book,index){
          $scope.requestbook[index].isDecline = true;
        BookService.declineRequest(book)
          
            .then(function(response){
               
                console.log(response);
        })
    }
    
    $scope.count = function(){
         BookService.countRequest()
            .then(function(response){
               // console.log(response.);
                $scope.counts =  response.count;
         })
    }
    
    $scope.rcount = function(){
        BookService.countTrade()
            .then(function(response){
                $scope.requestme = response.count;
        })
    }
    
    function init() {
        $scope.getUserBooks();
          $scope.count();
        $scope.rcount();
    }

    init();


}])



