var mongoose = require("mongoose");
var concettoSchema = new mongoose.Schema({
    name: String,
    videoId: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});
module.exports = mongoose.model("Concetto", concettoSchema);
