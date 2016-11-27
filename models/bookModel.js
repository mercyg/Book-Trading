var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var bookSchema = new Schema({
    name: {
        type: String,
        required: true
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