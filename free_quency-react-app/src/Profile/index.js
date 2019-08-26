import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MediaList from '../MediaList'

class Profile extends Component {
	constructor(props){
		super(props)

		this.state = {
			id: null,
			username: null,
			image: null,
			about_me: null,
			posted_media: [],
			favorited_media: [],
			showPostedMedia: true,
			activeItem: 'postedMedia'
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
			showPostedMedia: true,
			activeItem: 'postedMedia'
		})
	}

	toggleToFavorites = () => {
		this.setState({
			showPostedMedia: false,
			activeItem: 'favorites'

		})
	}


	render() {

		return (

			<Segment>
				<div>

					<h1>{this.state.username}</h1>
		             <img src={this.state.image} alt="existing profile"/>
		             { this.state.id === this.props.userId ?
		             	<Link to='/user/edit'>Edit Profile</Link>
		             	:
		             	null
		             }
		             <h2>About Me</h2>
		             <p>{this.state.about_me}</p>

	        	</div>


				<Menu>
					<Menu.Item 
						name='postedMedia'
            		active={this.state.activeItem === 'postedMedia'}
						onClick={this.toggleToPosted}>
						Posted Media
					</Menu.Item>
					<Menu.Item 
						name='favorites'
            		active={this.state.activeItem === 'favorites'}
						onClick={this.toggleToFavorites}>
						Favorites
					</Menu.Item>
				</Menu> 

				{this.state.showPostedMedia ? <MediaList medias={this.state.posted_media}/> : <MediaList medias={this.state.favorited_media}/>}


			</Segment>

		)
	}

}

export default Profile;