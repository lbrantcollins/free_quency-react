import React, { Component } from 'react';
import { Card, Button, Form, Grid, Image, Message, Segment, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './style.css'


const Thumbnail = (props) => {


	return(
		<Card>
		<Card.Content>
			<Link to={'/media/' + props.media.id}>

			<Image src={props.media.thumbnail_html} fluid/>
			</Link>
			<Card.Header>{props.media.title}</Card.Header>
			<Card.Meta>{props.media.favorites.length} Favorites</Card.Meta>
		</Card.Content>
		</Card>
	)
}

export default Thumbnail