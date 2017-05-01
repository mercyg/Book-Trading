var express = require("express");
var allbooksRoute = express.Router();
var User = require("../models/userModel");
var Books = require("../models/bookModel");

allbooksRoute.route("/")
        .get(function(req,res){
            User.find(function(err, user){
                if(err) res.status(500).send(err);
                res.send(user);
            })
        })

module.exports = allbooksRoute;