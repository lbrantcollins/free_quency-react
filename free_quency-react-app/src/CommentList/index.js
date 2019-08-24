import React, { Component } from 'react';
import { Card, Button, Form, Grid, Image, Message, Segment, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Comment from './Comment'
import AddComment from '../AddComment'


const CommentList = (props) => {

	console.log('/////////////////////////////');
	console.log(props.comments, "props.comments in CommentList component");

	const commentList = props.comments.map( comment => {
		return (

				<Comment key={comment.id} comment={comment} makePrettyDate={props.makePrettyDate} deleteComment={props.deleteComment}/>

		)

	})

	return(

		<div>
			<Card>
				{commentList}
			</Card>

			<AddComment mediaId={props.mediaId} addComment={props.addComment}/>
		</div>

	)
}

export default CommentList;
