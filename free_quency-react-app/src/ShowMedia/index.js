import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Divider, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import EditMedia from '../EditMedia'

class ShowMedia extends Component {
	constructor(props){
		super(props)

		this.state = {
			id: null,
			title: null,
			url: null,
			description: null,
			full_html: null,
			comments: [],
			favorites: [],
			user_id: null,
			editActive: false

		}
	}


	async componentDidMount(){

		const { handle } = this.props.match.params

		try {

	      const mediaResponse = await fetch('http://localhost:8000/media/' + this.props.match.params.id, {
	        method: 'GET',
	        credentials: 'include',// on every request we have to send the cookie
	        headers: {
	          'enctype': 'multipart/form-data'
	        }
	      })

	      const parsedResponse = await mediaResponse.json();

	      console.log(parsedResponse.data);

	      this.setState({
	        ...parsedResponse.data
	      })

	      console.log(this.state.user);
	    } catch (err) {
	      console.log(err)
	    }



		console.log(this.state);
	}

	toggleEdit = () => {
		this.setState({
			editActive: !this.state.editActive
		})
	}

	handleEdit = async (data) => {

		try {
	      
	      const updateMediaResponse = await fetch('http://localhost:8000/media/' + this.state.id, {
	        method: 'PUT',
	        credentials: 'include',// on every request we have to send the cookie
	        body: data,
	        headers: {
	          'enctype': 'multipart/form-data'
	        }
	      })

	      const parsedResponse = await updateMediaResponse.json();

	      console.log(parsedResponse, "parsedResponse in ShowMedia");

	      if (parsedResponse.status.code === 201) {
	      	this.setState({
	      		...parsedResponse.data,
	      		editActive: false
	      	})
	      	this.props.editMediaList(parsedResponse.data)
	      	return parsedResponse
	      }



	    } catch(err){
	      console.log(err);
	    }


	}

	render(){
		const commentList = this.state.comments.map( comment => {
			return (
				<div>
					<h5>{comment.user_id.username}</h5>
					<p>{comment.created_at}</p>
					<p>{comment.content}</p>
				</div>
			)
		})
		return(

			<Segment>

				<td dangerouslySetInnerHTML={{__html: this.state.full_html}} />
				<Divider />
				<Container textAlign='left'>
					<a href={this.state.url}><Header as='h2'>{this.state.title}</Header></a>
					<div>By: 
						<Link to={'/user/' + (this.state.user_id ? this.state.user_id.id : null)}>
							{this.state.user_id ? this.state.user_id.username : null}
						</Link>
					</div>
					<div>Favorites: {this.state.favorites.length}</div>
					<Link onClick={this.toggleEdit}>Edit</Link>
					{this.state.editActive ? <EditMedia media={this.state} handleEdit={this.handleEdit}/> : null}

					<p>{this.state.description}</p>

					{commentList}

				</Container>
			</Segment>

		)

	}
}

export default ShowMedia