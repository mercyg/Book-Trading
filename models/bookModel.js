var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//one book can have many request from different user
//one user can requsest many books 
//one user can decline or accept a book request
var bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    requestedBy: {
        type: String,
        default: null
    },
    requestApproved: {
        type: Boolean,
        default: false
    },
    author:String,
    image: String, 
    //genre: String,
    description: String,
    //created_by: String,
    owner: {
        type: ObjectId,
        ref: "User",
        required: true
    }
    
})


module.exports = mongoose.model("Book", bookSchema)