import React, { Component } from 'react';
import { Button, Form, Grid, Image, Message, Segment, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './style.css'


const Thumbnail = (props) => {
	return(

		<Segment className='thumb_container'>
			<Link to={'/media/' + props.media.id}>
				<td className='thumbnail' dangerouslySetInnerHTML={{__html: props.media.thumbnail_html}} />
				<div>Favorties: {props.media.favorites.length}</div>
				<div>{props.media.title}</div>
			</Link>
		</Segment>

	)
}

export default Thumbnail