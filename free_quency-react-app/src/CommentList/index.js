import React, { Component } from 'react';
import { Card, Button, Form, Grid, Image, Message, Segment, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Comment from './Comment'

const CommentList = (props) => {

	console.log('/////////////////////////////');
	console.log(props.comments, "props.comments in CommentList component");

	if (props.comments)
	const commentList = props.comments.map( media => {
		return (

				<Comment key={comment.id} comment={comment} />

		)

	})

	return(

			{commentList}

	)
}

export default CommentList;
