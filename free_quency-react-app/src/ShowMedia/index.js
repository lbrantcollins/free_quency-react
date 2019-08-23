import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Divider, Container, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import EditMedia from '../EditMedia'
import CommentList from '../CommentList'

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
			editActive: false,
			userFavorited: false

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

	      await this.setState({
	        ...parsedResponse.data,
	        userFavorited: this.state.favorites.some( fav => this.props.userId === fav.user_id.id)
	      })

	      this.setState({
	        userFavorited: this.state.favorites.some( fav => this.props.userId === fav.user_id.id)
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

	addComment = async (data) => {

    try {
      
      const addCommentResponse = await fetch('http://localhost:8000/comment/', {
        method: 'POST',
        credentials: 'include',// on every request we have to send the cookie
        body: data,
        headers: {
          'enctype': 'multipart/form-data'
        }
      })

      const parsedResponse = await addCommentResponse.json();

      console.log(parsedResponse);

      const newList = this.state.comments

      newList.push(parsedResponse.data)

      this.setState({
        comment: newList
      })

      return parsedResponse


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

				const newFavList = this.state.favorites.slice()

				this.props.updateFavorite(null, this.state.id, favId)


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

				const newFavList = this.state.favorites.slice()

				this.props.updateFavorite(parsedResponse.data, this.state.id, null)


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

		console.log("------------- SHOW MEDIA ---------------");
		
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
					{this.props.loggedIn ?
						<div>
							{ this.state.userFavorited == true ? 
								<Icon onClick={this.handleFavoriteClick} name="star"/> 
								: 
								<Icon onClick={this.handleFavoriteClick} name="star outline"/> 
							}

							{ this.state.user_id ? 
								<div>
								{	this.props.userId === this.state.user_id.id ?
									<div>
										<Link onClick={this.toggleEdit}>Edit</Link>
										{this.state.editActive ? <EditMedia media={this.state} handleEdit={this.handleEdit}/> : null}
									</div>
								:
								null }
								</div>
							:

								null

							}


						</div>
						:
						null }

					<p>{this.state.description}</p>

					<CommentList comments={this.state.comments} mediaId={this.state.id} addComment={this.addComment} makePrettyDate={this.props.makePrettyDate}/>

				</Container>
			</Segment>

		)

	}
}

export default ShowMedia



