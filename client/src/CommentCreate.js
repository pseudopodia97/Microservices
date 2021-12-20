import React, {useState, useEffect} from 'react'
import axios from 'axios';

export default( {postId} ) => {

    const [content, setContent] = useState('');
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log("this is the post id" +content)

        await axios.post(`http://localhost:4001/posts/${postId}/comments`,{content});
        setContent('');
    };

return <div>
            <form onSubmit={ onSubmit }>
                <div className="form-group">
                    <label>Add Comment</label>
                    <input
                    value={ content }
                    onChange = {e => setContent(e.target.value)}
                    className="form-control"/>
                </div>
                <br/>
                <button className="btn btn-primary">Submit</button>

            </form>
        </div>
}