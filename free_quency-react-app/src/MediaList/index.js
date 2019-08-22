import React, { Component } from 'react';
import { Button, Form, Grid, Image, Message, Segment, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Thumbnail from './Thumbnail'

const MediaList = (props) => {

	const mediaList = props.medias.map( media => {
		return (

			<Thumbnail media={media} />

		)

	})

	return(

		<Segment>
			{mediaList}
		</Segment>

	)
}

export default MediaList