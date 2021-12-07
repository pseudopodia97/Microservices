const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
const events = [];

app.post('/events',async(req, res)=>{
    const event = req.body;
    console.log(event);
    
    events.push(event);

    try{
    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4002/events', event);
    axios.post('http://localhost:4003/events', event);
    }
    catch(exception_error) {
        console.log("some error occured"+err);
    }
    res.send({status: 'OK'});
})

app.get('/events', (req, res) => {

    res.send(events);
})

app.post('/events/test',  async (req, res) => {
  
    console.log(req.body);
  if(req.body.type === "PostCreated") {
        console.log("post event occured")
  }
  else if(req.body.type === "CommentCreated") {
      console.log("comment event occured");
  }
  res.status(200).send({msg: req.body.type});
})
app.get('/events/test', (req, res)=>{
    console.log("*******************************************************");
    res.send({status:"event registered"});
})


app.listen(4005, () => {
    console.log("listening on port 4005");
});