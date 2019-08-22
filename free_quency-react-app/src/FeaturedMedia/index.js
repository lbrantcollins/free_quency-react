import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Divider, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const FeaturedMedia = (props) => {

	return(

		<Segment>
			<td dangerouslySetInnerHTML={{__html: props.media.full_html}} />
			<Divider />
			<Container textAlign='left'>
				<Header as='h2'>{props.media.title}</Header>
				<Link to={'/media/' + props.media.id + '/edit'}>Edit</Link>
			</Container>


		</Segment>

	)
}

export default FeaturedMedia
