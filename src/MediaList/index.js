import React from 'react';
import { Card } from 'semantic-ui-react';

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