const express =  require('express');
const cors =  require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {

    if(type === "PostCreated") {
        console.log("inside post created event")
        const {id, title} = data;
        posts[id] =  {id, title, comments: []};
    }
    if(type === "CommentCreated") {
        console.log("indside comment created event")
        const {id, content, postId, status} = data;
        const post = posts[postId];
        console.log(posts);
        post.comments.push({id, content, status});
    }
    if(type === "CommentUpdated"){
        const {id, postId, status, content} = data;
        const post = posts[postId]

        comment = post.comments.find(comment => {
            return comment.id === id;
        })
        comment.status = status;
        comment.content = content; 
    }
}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {

    const {type, data} = req.body;
    console.log(req.body);
    handleEvent(type, data);
    console.log("complete data structure")
    console.log(posts);
    res.send(posts);
})


app.listen(4002, async()=>{
    try{
        console.log("listening to port 4002")
        const res = await axios.get('http://localhost:4005/events');

        for(let event of res.data) {
            console.log("processing event", event.type);
            handleEvent(event.type, event.data);
        }
        console.log(res.data);
    }
    catch(error){
        console.log("some error occured");
    }
})