var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
         type: String,
       // required: true
    },
    city:{
        type: String,
       // required: true
    },
    state:{
        type: String,
        //required: true
    },
    books: [{
        type: Schema.Types.ObjectId, 
        ref: "Book"
    }]
                            
})

module.exports = mongoose.model("User", userSchema);