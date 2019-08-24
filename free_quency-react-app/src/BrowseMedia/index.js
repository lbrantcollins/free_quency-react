import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Menu, Segment, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MediaList from '../MediaList'
import FeaturedMedia from '../FeaturedMedia'

const BrowseMedia = (props) => {

	const randomIndex = Math.floor(Math.random() * props.medias.length)

	const featuredMedia = props.medias[randomIndex]

	const mediaList = props.medias.filter( media => media.id !== featuredMedia.id )
	
	return(

		<Container>
			<FeaturedMedia makePrettyDate={props.makePrettyDate} loggedIn={props.loggedIn} updateFavorite={props.updateFavorite} userId={props.userId} media={featuredMedia} editMediaList={props.editMediaList}/>

			<MediaList  medias={mediaList}/>


		</Container>
		

	)

}

export default BrowseMedia