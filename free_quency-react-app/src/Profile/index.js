import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Profile extends Component {
	constructor(props){
		super(props)
	}

	render() {

		return (

			<div>
			<h1>{this.props.currentUser.username}</h1>

             <img src={this.props.currentUser.image} alt="existing profile"/>
             <h2>About Me</h2>
             <p>{this.props.currentUser.about_me}</p>

        	</div>



		)
	}


}

export default Profile;