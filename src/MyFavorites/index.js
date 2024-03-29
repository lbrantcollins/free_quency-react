import React from 'react';
import { Container } from 'semantic-ui-react';

import MediaList from '../MediaList'
import FeaturedMedia from '../FeaturedMedia'

const MyFavorites = (props) => {

	const userFavorites = props.medias.filter( media => {

		return media.favorites.some( favorite => favorite.user_id.id === props.userId )
	})

	if (!userFavorites.length) {

		return(

			<h1>Nothing to see here! Maybe favorite something? Just a thought...</h1>

			)

	}

	const randomIndex = Math.floor(Math.random() * userFavorites.length)

	const featuredMedia = userFavorites[randomIndex]

	const mediaList = userFavorites.filter( media => media.id !== featuredMedia.id )
	
	return(

		<Container>
		
			<FeaturedMedia makePrettyDate={props.makePrettyDate} loggedIn={props.loggedIn} updateFavorite={props.updateFavorite} userId={props.userId} media={featuredMedia} editMediaList={props.editMediaList} deleteMedia={props.deleteMedia}/>

			<MediaList  medias={mediaList}/>


		</Container>
		

	)

}

export default MyFavorites