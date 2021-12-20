const express = require('express');
const bodyparser = require('body-parser');
const axios = require('axios');
const { randomBytes } = require('crypto');


const app = express();
const cors = require('cors');

app.use(bodyparser.json());
app.use(cors());

const commentByPostId = {}

app.get('/posts/:id/comments', (req, res ) => {
    res.status(201).send(commentByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentByPostId[req.params.id] || [];
    comments.push({id : commentId, content, status : 'pending'});

    console.log(comments);
    commentByPostId[req.params.id] = comments;


    await axios.post('http://localhost:4005/events', {
        type: "CommentCreated",
        data: {
            id:commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })

    res.status(201).send(comments)
})


app.post('/events', async (req, res ) => {
    console.log("Event Received"+req.body.type);
    const {type, data} = req.body;

    if(type === "CommentCreated"){
        const {postId, id, status} = data;
        const comments = commentByPostId[postId];

        const comment = comments.find(comment => {
            return comment.id === id;
        })
        comment.status = status;

        await axios.post('http://localhost:4005', {
            type: "CommentModerated",
            data: {
                id,
                status,
                postId,
                content
            }
        })
    }

})

app.listen(4001, () => {
    console.log("listening to port 4001");
})