import React, { useState} from 'react'
import axios from 'axios';




export default () => {

const [title, setTitle] = useState('');

const onSubmit = async (event) => {
    event.preventDefault();
    console.log("this is the post list");
    await axios.post('http://localhost:4000/posts',  {
        title
    });
    setTitle('')
}
return <div>

        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label>Title</label>
                <input
                value={title}
                onChange= {e => setTitle(e.target.value)}
                className='form-control'></input>            
            </div>
            <br></br>
            <button className='btn btn-primary'>Submit</button>
        </form>
    </div>
}