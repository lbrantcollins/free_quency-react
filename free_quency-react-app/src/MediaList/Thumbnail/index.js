import React from 'react';
import { Card, Image} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../../semantic-ui-css/semantic.min.css'
import './style.css'

const Thumbnail = (props) => {

	return (

		<Card>
		
			<Card.Content>

				<Link to={'/media/' + props.media.id}>
					<Image src={props.media.thumbnail_html} fluid/>
				</Link> 

				<Card.Header id="thumbnail-header">Title: {props.media.title}</Card.Header>

				<Card.Meta>{props.media.favorites.length} Favorites</Card.Meta>

			</Card.Content>

		</Card>

	)
}

export default Thumbnail