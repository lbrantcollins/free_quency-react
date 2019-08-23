import React, { Component } from 'react';
import { Card, Button, Form, Grid, Image, Message, Segment, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import AddComment from '../../AddComment'

// import './style.css'


const Comment = (props) => {


	return(

		<div>

			<h5>{props.comment.user_id.username}</h5>
			<p>{props.comment.created_at}</p>
			<p>{props.comment.content}</p>

			Add comment:
			<AddComment mediaId={props.mediaId} addComment={props.addComment}/>

		</div>
	)
}

export default Comment;

