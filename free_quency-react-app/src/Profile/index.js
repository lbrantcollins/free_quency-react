import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Menu, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MediaList from '../MediaList'

class Profile extends Component {
	constructor(props){
		super(props)

		this.state = {
			username: null,
			image: null,
			about_me: null,
			posted_media: [],
			favorited_media: [],
			showPostedMedia: true,
		}
	}

	async componentDidMount() {
		const { handle } = this.props.match.params

		try {

	      const userResponse = await fetch('http://localhost:8000/user/' + this.props.match.params.id, {
	        method: 'GET',
	        credentials: 'include',// on every request we have to send the cookie
	        headers: {
	          'enctype': 'multipart/form-data'
	        }
	      })

	      const parsedResponse = await userResponse.json();

	      this.setState({
	        ...parsedResponse.data
	      })

	    } catch (err) {
	      console.log(err)
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

					<h1>{this.state.username}</h1>
		             <img src={this.state.image} alt="existing profile"/>
		             <h2>About Me</h2>
		             <p>{this.state.about_me}</p>

	        	</div>


				<Menu>
					<Menu.Item>
						<Link to='#' onClick={this.toggleToPosted} >Posted Media</Link>
					</Menu.Item>
					<Menu.Item>
						<Link to='#' onClick={this.toggleToFavorites} >Favorites</Link>
					</Menu.Item>
				</Menu> 

				{this.state.showPostedMedia ? <MediaList medias={this.state.posted_media}/> : <MediaList medias={this.state.favorited_media}/>}


			</div>

		)
	}

}

export default Profile;