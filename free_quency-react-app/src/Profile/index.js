import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Menu, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MediaList from '../MediaList'

class Profile extends Component {
	constructor(props){
		super(props)

		this.state = {
			showPostedMedia: true,
		}
	}

	toggleToPosted = () => {
		this.setState({
			showPostedMedia: true
		})
	}

	toggleToFavorites = () => {
		this.setState({
			showPostedMedia: false
		})
	}


	render() {

		return (

			<div>

				<div>
				<h1>{this.props.user.username}</h1>

	             <img src={this.props.user.image} alt="existing profile"/>
	             <h2>About Me</h2>
	             <p>{this.props.user.about_me}</p>

	        	</div>


				<Menu.Menu>
					<Menu.Item>
						<Link to='#' onClick={this.toggleToPosted} >Posted Media</Link>
					</Menu.Item>
					<Menu.Item>
						<Link to='#' onClick={this.toggleToFavorites} >Favorites</Link>
					</Menu.Item>
				</Menu.Menu> 

				{this.state.showPostedMedia ? <MediaList medias={this.props.user.posted_media}/> : <MediaList medias={this.props.user.favorited_media}/>}

			</div>

		)
	}

}

export default Profile;