var express = require("express");
var bookRoute = express.Router();
var User = require("../models/user");
var Book = require("../models/bookModel");


bookRoute.route("/")
    .get(function(req, res){
        Book.find({})
             .populate("owner", "-books")
           // console.log(owner.username)
             .exec(function(err, foundeBooks){
                if(err) res.status(500).send(err);
                console.log("foounder of book: " + foundeBooks);
                res.send(foundeBooks);
               for(var i = 0; i < foundeBooks.length; i++){
                   console.log(foundeBooks[i].owner.username)
               }
               
        })
})
     .post(function(req, res){
          var book = new Book(req.body);
            book.owner = req.user;
            book.save(function(err, savedBook){
                if(err){
                    res.status(500).send(err);
                }else{
                    User.findById(req.user._id, function(err,foundUser){
                        book.owner = foundUser.username;
                        foundUser.books.push(savedBook._id);
                        foundUser.save();
                        res.send(savedBook)
                    })
                }
            
        })
})

bookRoute.route("/:bookId")
    .get(function(req, res){
        Book.findOne({_id:req.params.bookId, owner: req.user._id}, function(err, book){
            if(err) {
                res.status(500).send(err);
            }else if(!book){
                res.status(404).send("No book found")
            }else{
                res.send(book)
            }
            
        })
})
      .delete(function(req,res){
        Book.findOneAndRemove(
            {_id: req.params.bookId, creator: req.user._id},function(err, book){
                if(err){
                    res.status(500).send(err);
                }else{
                    res.send(book);
                }
            }
            
        )
})

module.exports = bookRoute
