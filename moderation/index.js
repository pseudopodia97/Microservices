const express = require('express');
const bodyparser = require('body-parser');
const axios = require('axios');

const app = express()
app.use(bodyparser.json())

app.post('/events', async(req, res) => {
    const {type, data} = req.body;
    console

    try{
    if(type === "CommentCreated"){
        const status = data.content.includes('orange')? 'Approved' : 'Rejected';

        console.log("status updated to " + status);
        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id: data.id,
                postId: data.postId,
                status: status,
                content: data.content
            }
        })
    }
    }
    catch(err) {
        console.log("Some error occured" + err);
    }
    res.send({});
})


app.listen(4003, ()=> {
    console.log("listening to port 4003");
})