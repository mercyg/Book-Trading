var express = require("express");
var bookRoute = express.Router();
var User = require("../models/userModel");
var Book = require("../models/bookModel");


bookRoute.route("/")
    .get(function(req, res){
    //console.log("id : " + req.user.username)
        Book.find({})
            .populate("owner", "username -_id")
             .exec(function(err, foundeBooks){
                if(err){
                  res.status(500).send(err);  
                } else{
                    //foundeBooks.owner = foundeBooks.owner.username;
                     res.send(foundeBooks);
                }
               
               
//               for(var i = 0; i < foundeBooks.length; i++){
//                   console.log(foundeBooks[i].owner.username)
//               } 
               
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
            })
})
  



//when a user request a book they get i can get the user id so that I can know who request the book but do i need the book id? 
//I think I do need the book id so that the owner of the book could know that the book has been request for a trade. 
bookRoute.route("/traderequest/request/:bookId")
    .put(function(req, res){
        Book.findById(req.params.bookId, function(err, book){
            if(err){
                res.status(500).send(err);
            }else if(book.requestedBy !== null){
                res.send("The book has already been requested")
            }else{
                
                book.requestedBy = req.body.owner;
                book.save(function(err){
                    if(err){
                        res.status(500).send(err);
                    }else{
                        res.send("The request has been created sucessfully created")
                
                    }
                })
            }
        })
        
})
    
bookRoute.route("/traderequest/unapproved/:bookId")
    .get(function(req, res){
        Book.find({_id: req.params.bookId, requestdBy: {$ne: "null"} , owner: req.user._id}, function(err, book){
            if(err){
                res.status(500).send(err);
            }else if(book.length  > 0 ){
                res.send(book);
            }else{
                res.send([])
            }
        })
})
bookRoute.route("/traderequest/accept/:bookId")
    .put(function(req, res){
        Book.findById(req.params.bookId, function(err,accepttrade){
            if(err){
                res.status(500).send(err);
            }else{
                accepttrade.owner = acceptbook.requestdBy;
                accepttrade.requestApproved =  true;
                accepttrade.markModified("requestApproved");
                accepttrade.markModified("owner");
                accepttrade.save(function(err){
                    if(err) res.status(500).send(err);
                    res.send("Trade Request approved")
                 })
            }
        })
})

bookRoute.route("/traderequest/decline/:bookId")
    .put(function(req, res){
        Book.findById(req.params.bookId, function(err, declinetrade){
            if(err){
                res.status(500).send(err);
            }else{
                declinetrade.requestApproved = false;
                declinetrade.markModified("requestApproved");
                declinetrade.save(function(err){
                    if(err) res.status(500).send(err);
                    res.send("Trade Request declined")
                })
            }
        })
})
// id_user:String, means the owner of the book in your case

module.exports = bookRoute
