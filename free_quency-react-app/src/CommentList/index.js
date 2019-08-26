import React from 'react';
import { Card } from 'semantic-ui-react';

import Comment from './Comment'
import AddComment from '../AddComment'


const CommentList = (props) => {

	const commentList = props.comments.map( comment => {
		return (

				<Comment 
					key={comment.id} 
					comment={comment} 
					makePrettyDate={props.makePrettyDate} 
					deleteComment={props.deleteComment}
				/>
		)
	})

	return(

		<div>
			<Card>
				{commentList}
			</Card>

			<AddComment 
				mediaId={props.mediaId} 
				addComment={props.addComment}
			/>
		</div>

	)
}

export default CommentList;
