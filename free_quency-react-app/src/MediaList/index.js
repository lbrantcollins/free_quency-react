import React, { Component } from 'react';
import { Card, Button, Form, Grid, Image, Message, Segment, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Thumbnail from './Thumbnail'

const MediaList = (props) => {

	const mediaList = props.medias.map( media => {
		return (

			<Thumbnail key={media.id} media={media} />
		)
	})

	return(

		<Card.Group>
			{mediaList}
		</Card.Group>
	)
}

export default MediaList;