import React, { Component } from 'react';
import { Card, Button, Form, Grid, Image, Message, Segment, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// import './style.css'


const Comment = (props) => {

	// In SQLite dates STRING with this format:
	// "Fri, 23 Aug 2019 14:17:40 GMT"
	// const date = Date(props.comment.created_at);
	// const year = props.comment.created_at.slice(12,16);
	// const month = props.comment.created_at.slice(8,11);
	// const day = props.comment.created_at.slice(5,7);
	// const hour = props.comment.created_at.slice(17, 2);



	const date = props.makePrettyDate(props.comment.created_at)
	console.log("DATE ------>" + date + " at (" + ")<------");

	return(

		<div>

			<h5>{props.comment.user_id.username}</h5>
			<p>{date}</p>
			<p>{props.comment.content}</p>

			

		</div>
	)
}

export default Comment;

