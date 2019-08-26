import React, { Component } from 'react';
import { Header, Segment, Divider, Container, Icon, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import EditMedia from '../EditMedia'
import CommentList from '../CommentList'

class FeaturedMedia extends Component {
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

		console.log(this.props.media, 'MEDIA PROPS IN FEATURED');

		await this.setState({
			...this.props.media
		})

		this.setState({
			userFavorited: this.state.favorites.some( fav => this.props.userId === fav.user_id.id)
		})

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

		if (this.state.userFavorited) {
	      // is fav was true, delete favorite from db

      	const favIndex = this.state.favorites.findIndex( favorite => this.props.userId === favorite.user_id.id)

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

				const newFavList = this.state.favorites.slice()

				this.props.updateFavorite(null, this.state.id, favId)

				newFavList.splice(favIndex, 1)

		    	this.setState({
			      favorites: newFavList
		    	})

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

				const newFavList = this.state.favorites.slice()

				this.props.updateFavorite(parsedResponse.data, this.state.id, null)

				newFavList.push(parsedResponse.data)

		    	this.setState({
			      favorites: newFavList
		    	})

	    	} catch (err) {
	      	console.log(err)
	    	}

    	}

		this.setState({
			userFavorited: !this.state.userFavorited
		})

		
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

	      const newList = this.state.comments.slice();

	      newList.push(parsedResponse.data);

	      console.log('parsedResponse.data in addcomment in featureed media');
	      console.log(parsedResponse.data);

	      console.log('newList in addcomment in featured media');
	      console.log(newList);


	      this.setState({
	        	comments: newList
	      })

	      return parsedResponse

    	} catch(err){
	      console.log(err);
    	}
	}

	deleteComment = async (commentId) => {

    	try {
      
	      const deleteCommentResponse = await fetch('http://localhost:8000/comment/' + commentId, {
	        	method: 'DELETE',
	        	credentials: 'include'
	      })

	      const parsedResponse = await deleteCommentResponse.json();

	      let newList = this.state.comments.slice();

	      newList = newList.filter( comment => comment.id !== commentId);

	      await this.setState({
	        	comments: newList
	      })

	      this.deleteCommentFromMedia(commentId);

	      return parsedResponse;

    	} catch(err) {
   		console.log(err);
    	}
  	}

	handleDelete = async () => {

		await this.props.deleteMedia(this.state.id)

		this.props.history.push('/browse-media')

	}

	render(){
		
		return(

			<Segment>

				<td dangerouslySetInnerHTML={{__html: this.state.full_html}} />
				<Divider />
				<Container textAlign='left'>
					<a href={this.state.url}><Header as='h2'>{this.state.title}</Header></a>
					<div>By: { this.state.user_id ? <Link to={'/user/' + this.state.user_id.id}>{this.state.user_id.username}</Link> : null }</div>

					{ this.props.loggedIn ?
						<div>
							{ this.state.userFavorited == true ? 
							   <Button as='div' labelPosition='right'>
							      <Button color='grey'>
							        <Icon name='star' onClick={this.handleFavoriteClick}/>
							        Favorite
							      </Button>
							      <Label as='a' basic color='grey' pointing='left'>
							        {this.state.favorites.length}
							      </Label>
							   </Button>
								: 
								<Button as='div' labelPosition='right'>
							      <Button color='white'>
							        <Icon name='star outline' onClick={this.handleFavoriteClick}/>
							        Favorite
							      </Button>
							      <Label as='a' basic color='white' pointing='left'>
							        {this.state.favorites.length}
							      </Label>
							   </Button> 
							}

							{ this.state.user_id ? 
								<div>
									{	this.props.userId === this.state.user_id.id ?
										<div>
											<Link onClick={this.toggleEdit}>Edit</Link>
											<Link onClick={this.handleDelete}>Delete</Link>
											{this.state.editActive ? <EditMedia media={this.state} handleEdit={this.handleEdit}/> : null}

										</div>
										:
										null

									}
								</div>
								:
								null

							}
						</div>
						:
						<Button as='div' labelPosition='right'>
					      <Button color='white'>
					        <Icon name='star outline'/>
					        Favorite
					      </Button>
					      <Label as='a' basic color='white' pointing='left'>
					        {this.state.favorites.length}
					      </Label>
					   </Button> 

					}
					

					<p>{this.state.description}</p>

					<CommentList 
						loggedIn={this.props.loggedIn}
						userId={this.props.userId}
						makePrettyDate={this.props.makePrettyDate} 
						comments={this.state.comments} 
						mediaId={this.state.id} 
						addComment={this.addComment} 
						deleteComment={this.deleteComment}/>

				</Container>
			</Segment>

		)

	}
}

export default FeaturedMedia
