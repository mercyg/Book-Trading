var express = require("express");
var userRoute = express.Router();
var User = require("../models/userModel");

userRoute.get("/me/friends", function(req, res){
    User.findById(req.user._id)
        .populate("friends", "username name city state")
        .exec(function(err, user){
            if(err) return res.status(500).send(err);
            res.send(user ? user.friends : []);
        });
});

userRoute.post("/me/friends", function(req, res){
    var friendId = req.body.friendId;
    if(!friendId){
        return res.status(400).send({message: "friendId required"});
    }
    if(String(friendId) === String(req.user._id)){
        return res.status(400).send({message: "Cannot add yourself"});
    }
    User.findById(friendId, function(err, friend){
        if(err) return res.status(500).send(err);
        if(!friend) return res.status(404).send({message: "User not found"});
        User.findById(req.user._id, function(err, user){
            if(err) return res.status(500).send(err);
            if(user.friends.indexOf(friendId) === -1){
                user.friends.push(friendId);
                user.save(function(err){
                    if(err) return res.status(500).send(err);
                    res.send({message: "Friend added"});
                });
            } else {
                res.send({message: "Already friends"});
            }
        });
    });
});

module.exports = userRoute;

