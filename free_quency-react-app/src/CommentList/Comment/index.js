import React, { Component } from 'react';
import { Card, Button, Form, Grid, Image, Message, Segment, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// import './style.css'


const Comment = (props) => {

	// In SQLite dates STRING with this format:
	const date = props.makePrettyDate(props.comment.created_at)

	return(


		<Card.Content>
			<Card.Header>{props.comment.user_id.username}</Card.Header>
			<Card.Meta>{date}</Card.Meta>
			<Card.Meta>{props.comment.content}</Card.Meta>
			<Button onClick={props.deleteComment}>
				Delete
			</Button>
		</Card.Content>

			

	)
}

export default Comment;
