const mongoose = require("mongoose");

const tweet = mongoose.Schema({
    sender: String,
    content: String
})

module.exports = mongoose.model("tweets-4563872568", tweet);