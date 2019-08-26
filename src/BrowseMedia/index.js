import React from 'react';
import { Container } from 'semantic-ui-react';
import MediaList from '../MediaList'
import FeaturedMedia from '../FeaturedMedia'

const BrowseMedia = (props) => {

	const randomIndex = Math.floor(Math.random() * props.medias.length)

	const featuredMedia = props.medias[randomIndex]

	const mediaList = props.medias.filter( media => media.id !== featuredMedia.id )
	
	return(

		<Container>
			{ !featuredMedia ? null : <FeaturedMedia 
				makePrettyDate={props.makePrettyDate} 
				loggedIn={props.loggedIn} 
				updateFavorite={props.updateFavorite} 
				userId={props.userId} 
				media={featuredMedia} 
				editMediaList={props.editMediaList} 
				deleteMedia={props.deleteMedia} />}

			<MediaList  medias={mediaList}/>


		</Container>
		

	)

}

export default BrowseMedia