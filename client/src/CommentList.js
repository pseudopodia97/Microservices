import React from 'react';


export default ({ comments }) => {


    const renderedComments = comments.map(comment => {

        if(comment.status === "pending"){
            comment.content = "This comment is pending moderation";
        }
        if(comment.status === "Approved"){
            comment.content = comment.content;
        }
        if(comment.status === "Rejected"){
            comment.content = "This comment is Rejected and cannot be shown";
        }
    return <li key={comment.id}>{comment.content}</li>
    })

return  <ul>{renderedComments}</ul>
}