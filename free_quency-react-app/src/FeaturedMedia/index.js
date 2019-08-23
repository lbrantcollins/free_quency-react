import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Divider, Container, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import EditMedia from '../EditMedia'

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
			user_id: this.props.media.user_id,
			editActive: false,
			userFavorited: false
		}
	}


	componentDidMount(){
		console.log(this.props.media);

		console.log(this.props.userId);

		this.setState({
			userFavorited: this.state.favorites.some( fav => this.props.userId === fav.user_id.id)
		})

		console.log(this.state.userFavorited, 'Favorites????');

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

	      console.log(parsedResponse, "parsedResponse in FeaturedMedia");

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

	handleFavoriteClick = async () => {

		console.log(this.state.favorites, 'FAVORITES BEFORE CHANGES');



		if (this.state.userFavorited) {
	      // is fav was true, delete favorite from db

	      	console.log(this.props.userId);

	      	this.state.favorites.forEach( favorite => console.log(favorite.user_id.id))

	      	const favIndex = this.state.favorites.findIndex( favorite => this.props.userId === favorite.user_id.id)



	      	console.log(favIndex);

		    const favId = this.state.favorites[favIndex].id

		    try {

			    const favoriteResponse = await fetch('http://localhost:8000/favorite/' + favId, {
			      method: 'DELETE',
			      credentials: 'include',// on every request we have to send the cookie
			      headers: {
			        'enctype': 'multipart/form-data'
			      }
			   	})

			    const parsedResponse = await favoriteResponse.json();

			    console.log(parsedResponse);

				this.props.updateFavorite(null, this.state.id, favId)

				const newFavList = this.state.favorites

				newFavList.splice(favIndex, 1)

				console.log(newFavList, 'afterchange');

			    this.setState({
			      favorites: newFavList
			    })

			    console.log(this.state.user);
		    } catch (err) {
		      	console.log(err)
		    }


	    } else {
	      // else, add favorite from db
	      	try {

	      		const data = new FormData();
			    data.append('user_id', this.props.userId);
			    data.append('media_id', this.state.id);

			    const favoriteResponse = await fetch('http://localhost:8000/favorite/', {
			      method: 'POST',
			      credentials: 'include',// on every request we have to send the cookie
			      body: data,
			      headers: {
			        'enctype': 'multipart/form-data'
			      }
			   	})

			    const parsedResponse = await favoriteResponse.json();

			    console.log(parsedResponse);

				this.props.updateFavorite(parsedResponse.data, this.state.id, null)

				const newFavList = this.state.favorites

				console.log(newFavList, 'NEW FAV BEFORE CHANGE');

				newFavList.push(parsedResponse.data)

				console.log(newFavList,'afterchange');

			    this.setState({
			      favorites: newFavList
			    })

			    console.log(this.state.user);
		    } catch (err) {
		      	console.log(err)
		    }

	    }


		this.setState({
			userFavorited: !this.state.userFavorited
		})


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
					<div>By: <Link to={'/user/' + this.state.user_id.id}>{this.state.user_id.username}</Link></div>
					<div>Favorites: {this.state.favorites.length} </div>
					{ this.state.userFavorited == true ? 
						<Icon onClick={this.handleFavoriteClick} name="star"/> 
						: 
						<Icon onClick={this.handleFavoriteClick} name="star outline"/> 
					}
					
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
