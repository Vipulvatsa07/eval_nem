const mongoose = require("mongoose");
const postschema = mongoose.Schema({
    title : String,
    body : String,
    device : String,
    no_if_comments : Number,
    user:String
});

const PostModel=mongoose.model("post",postschema)

module.exports={
    PostModel
}

// {
//     "title" : "employement",
// "body" : "low employment",
// "device" : "mobile",
// "no_if_comments" : 24
// }
