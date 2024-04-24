const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const Tweet = require("./tweet")

mongoose.connect("mongodb+srv://admin:admin@cluster0.aor3o6s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    auth: {
        username: "admin",
        password: "admin"
    },
    useUnifiedTopology: true,
    retryWrites: false
}).then(() => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.post("/tweets", async(request, response)=>{
        const tweet = new Tweet({
            content: request.body.content,
            sender: request.body.sender
        })
        await tweet.save();
        return response.json({
            message: "Message",
            tweet
        })
    })

    app.get("/tweets", async(request, response)=>{
        const tweets = await Tweet.find({});
        return response.json({tweets})
    })

    app.listen(4000, ()=>{
        console.log("API started at 4000");
    })

}).catch((error) => {
    console.error(error);
})
