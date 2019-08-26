import React from 'react';
import { Card } from 'semantic-ui-react';

import Comment from './Comment'
import AddComment from '../AddComment'


const CommentList = (props) => {

	const commentList = props.comments.map( comment => {
		return (

				<Comment 
					key={comment.id} 
					loggedIn={props.loggedIn}
					userId={props.userId}
					comment={comment} 
					makePrettyDate={props.makePrettyDate} 
					deleteComment={props.deleteComment}
				/>
		)
	})

	return(


		<div>
				{commentList}

			{ props.loggedIn  ?

				<AddComment 
					mediaId={props.mediaId} 
					addComment={props.addComment}
				/>	
		         
		   	: null
			}
			
		</div>

	)
}

export default CommentList;
