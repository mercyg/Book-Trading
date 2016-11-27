var express = require("express");
var authRouter= express.Router();
var User = require("../models/userModel");
var jwt = require("jsonwebtoken");
var config = require("../config");


authRouter.post("/signup", function(req, res){
    User.find({username: req.body.username}, function(err, existingUser){
    if(err) return res.status(500).send(err);
    
    if(existingUser.length !== 0){
        return res.status(400).send({success: false, message: "That username is taken"})
    }
    var  user = new User(req.body);
    user.save(function(err, newUser){
        if(err) return res.status(500).send(err);
        
        return res.send({success: true, message: "Registered a new user", user: newUser})
    });
    
    });
});


authRouter.post("/login", function(req, res){
    User.findOne({username: req.body.username, password: req.body.password}, function(err,user){
        if(err) return res.status(500).send(err);
        if(user === null){
            return res.status(401).send({success: false, message: "Username or password provided does not much anything in our system"})
        }
        
        var token = jwt.sign(user.toObject(), config.secret, {expiresIn: "24h"});
        
        res.send({token: token, user: user.toObject(), success: true, message: "Here's your token"})
    })
});

module.exports = authRouter;