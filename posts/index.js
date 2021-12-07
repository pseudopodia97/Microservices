const express  = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const {randomBytes} = require("crypto");
const axios = require('axios')

app.use(bodyParser.json())
app.use(cors())
let posts = {};

app.get("/posts", (req, res) => {

    res.send(posts)
});

app.post('/posts', async(req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    console.log(req.body);
    
    try{
    posts[id] = {
        id,
        title
    }
    await axios.post('http://localhost:4005/events', {
        type: "PostCreated",
        data: {id, title}
        });

    res.status(201).send(posts[id]);
    }
    catch(exception_err){
        console.log(exception_err);   
    }

});

app.post('/events', (req, res) => {
    console.log(req.body);
    res.send({message: "event caprured by post service"});
})

app.listen(4000, () => {
    console.log("listening to port: 4000");
});