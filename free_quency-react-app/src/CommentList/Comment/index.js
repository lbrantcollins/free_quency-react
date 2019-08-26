import React from 'react';
import { Card, Button, } from 'semantic-ui-react';

const Comment = (props) => {

	// In SQLite dates are STRING.  Convert to JS date:
	const date = props.makePrettyDate(props.comment.created_at)

	console.log("do the user id's match in comment component?");
	console.log(props.comment.user_id.id, "props.comment.user_id.id");
	console.log(props.userId, "props.userId");

	return (

		<Card>
			<Card.Content>
				<Card.Header id="comment-header">{props.comment.user_id.username}</Card.Header>
				<Card.Meta>{date}</Card.Meta>
				<Card.Description>{props.comment.content}</Card.Description>
				{(props.comment.user_id.id === props.userId) && (props.loggedIn)
					?
						<Button onClick={props.deleteComment.bind(null, props.comment.id)}>
							Delete
						</Button>
					: null
				}	
			</Card.Content>
		</Card>

	)
}

export default Comment;
