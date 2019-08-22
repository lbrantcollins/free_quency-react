import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Divider, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class FeaturedMedia extends Component {
	constructor(props){
		super(props)

		this.state = {
			title: this.props.media.title,
			url: this.props.media.url,
			description: this.props.media.description,
			full_html: this.props.media.full_html,
			comments: this.props.media.comments,
			favorites: this.props.media.favorites,

		}
	}


	componentDidMount(){
		console.log(this.props.media);
		// this.setState({
		// 	...this.props.media
		// })

		console.log(this.state);
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
					<Link to={'/media/' + this.state.id + '/edit'}>Edit</Link>

					<p>{this.state.description}</p>

					{commentList}

				</Container>
			</Segment>

		)

	}
}

export default FeaturedMedia
