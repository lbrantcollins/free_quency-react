import React from 'react';
import { Card, Button, } from 'semantic-ui-react';

const Comment = (props) => {

	// In SQLite dates are STRING.  Convert to JS date:
	const date = props.makePrettyDate(props.comment.created_at)

	return (

		<Card.Content>
			<Card.Header>{props.comment.user_id.username}</Card.Header>
			<Card.Meta>{date}</Card.Meta>
			<Card.Meta>{props.comment.content}</Card.Meta>
			<Button onClick={props.deleteComment.bind(null, props.comment.id)}>
				Delete
			</Button>
		</Card.Content>

	)
}

export default Comment;
