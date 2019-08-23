import React, { Component } from 'react';
import { Card, Button, Form, Grid, Image, Message, Segment, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// import './style.css'


const Comment = (props) => {


	return(

		{props.comment.content}

	)
}

export default Comment;
