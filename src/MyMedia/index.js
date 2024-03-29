import React from 'react';
import { Container } from 'semantic-ui-react';
import MediaList from '../MediaList'
import FeaturedMedia from '../FeaturedMedia'

const MyMedia = (props) => {

	const usersMedias = props.medias.filter( media => media.user_id.id === props.userId)

	if (!usersMedias.length) {

		return(

			<h1>Nothing to see here! Maybe post something? Just a thought...</h1>

			)

	}

	const randomIndex = Math.floor(Math.random() * usersMedias.length)

	const featuredMedia = usersMedias[randomIndex]

	const mediaList = usersMedias.filter( media => media.id !== featuredMedia.id )
	
	return(

		<Container>
		
			<FeaturedMedia makePrettyDate={props.makePrettyDate} loggedIn={props.loggedIn} updateFavorite={props.updateFavorite} userId={props.userId} media={featuredMedia} editMediaList={props.editMediaList} deleteMedia={props.deleteMedia}/>

			<MediaList  medias={mediaList}/>


		</Container>
		

	)

}

export default MyMedia