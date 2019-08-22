import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Divider, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import EditMedia from './EditMedia'

class FeaturedMedia extends Component {
	constructor(props){
		super(props)

		this.state = {
			id: this.props.media.id,
			title: this.props.media.title,
			url: this.props.media.url,
			description: this.props.media.description,
			full_html: this.props.media.full_html,
			comments: this.props.media.comments,
			favorites: this.props.media.favorites,
			editActive: false

		}
	}


	componentDidMount(){
		console.log(this.props.media);
		// this.setState({
		// 	...this.props.media
		// })

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

	      console.log(parsedResponse, "parsedResponse in editProfile");

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

export default FeaturedMedia
