import React, { Component } from 'react';
import './App.css';

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Register from './Register'; 
import Login from './Login'; 
import EditProfile from './EditProfile'; 
import AddMedia from './AddMedia';
import Header from './Header'; 
import FeaturedMedia from './FeaturedMedia'; 
import MediaList from './MediaList'; 
import Profile from './Profile';
import ShowMedia from './ShowMedia';
import BrowseMedia from './BrowseMedia'
import MyMedia from './MyMedia'
import MyFavorites from './MyFavorites'

  
class App extends Component {
   constructor() {
      super();

      this.state = {
         id: null,
         username: '',
         email: '',
         about_me: '',
         image: {},
         loggedIn: false,
         media: [],
         featuredMedia: {},
         tempUser: '',
      }
   }

   componentDidMount = async () => {

      const allMediaResponse = await fetch('http://localhost:8000/media/')

      const parsedResponse = await allMediaResponse.json();

      if (parsedResponse.status.code === 200) {

         this.setState({
            media: parsedResponse.data,
            featuredMedia: parsedResponse.data[0]
         })

      }

      try {

         const userResponse = await fetch('http://localhost:8000/user/1', {
            method: 'GET',
            credentials: 'include',// on every request we have to send the cookie
            headers: {
               'enctype': 'multipart/form-data'
            }
         })

         const parsedResponse2 = await userResponse.json();

         this.setState({
            tempUser: parsedResponse2.data
         })

      } catch (err) {
         console.log(err)
      }

   }

   makePrettyDate = (str) => {

      const date = new Date(str);

      const options = { 
         // weekday: 'short', 
         year: 'numeric', 
         month: 'numeric', 
         day: 'numeric', 
         timeZone: 'America/Chicago', 
         hour: 'numeric',
         hour12: true, 
         minute: 'numeric' };

      return date.toLocaleDateString('en-US',options)

   }

   deleteCommentFromMedia = async (commentId) => {

      // delete comment from media in state
      const newMedia = this.state.media.slice();

      newMedia.forEach( media => {
         media.comments = media.comments.filter( comment => {
            return comment.id !== commentId;
         })
      })

      await this.setState({
         media: newMedia
      })
   }

   logout = async (e) => {

      const logoutResponse = await fetch('http://localhost:8000/user/logout')

      const parsedResponse = await logoutResponse.json()

      this.setState({
         username: '',
         email: '',
         about_me: '',
         image: {},
         loggedIn: false
      })

      return parsedResponse;
   }


   logIn = async (loginInfo) => {
      try {
         const loginResponse = await fetch('http://localhost:8000/user/login', {
            method: 'POST',
            credentials: 'include',
            body: loginInfo,
            headers: {
               'enctype': 'multipart/form-data'
            }
         })

         const parsedResponse = await loginResponse.json();

         if (parsedResponse.status.code === 200) {
            this.setState({
               ...parsedResponse.data,
               loggedIn: true
            })

         }

         return parsedResponse

      } catch (err) {
      console.log(err)
      }
   }   


  register = async (data) => {

      try {

         const registerResponse = await fetch('http://localhost:8000/user/register', {
            method: 'POST',
            credentials: 'include',// on every request we have to send the cookie
            body: data,
            headers: {
               'enctype': 'multipart/form-data'
            }
         })

         const parsedResponse = await registerResponse.json();

         if (parsedResponse.status.code === 201) {
            this.setState({
               ...parsedResponse.data,
             logoggedIn: true
            })
         }
         return parsedResponse;

      } catch (err) {
         console.log(err)
      }
   }


   addMedia = async (data) => {

      try {
      
         const addMediaResponse = await fetch('http://localhost:8000/media/', {
            method: 'POST',
            credentials: 'include',// on every request we have to send the cookie
            body: data,
            headers: {
               'enctype': 'multipart/form-data'
            }
         })

         const parsedResponse = await addMediaResponse.json();

         const newList = this.state.media.slice()

         const newMedia = parsedResponse.data

         newMedia['comments'] = []
         newMedia['favorites'] = []

         newList.push(newMedia)

         this.setState({
            media: newList
         })

         return parsedResponse

      } catch(err){
         console.log(err);
      }
   }

  
   editProfile = async (data) => {

      try {
      
      const updateProfileResponse = await fetch('http://localhost:8000/user/' + this.state.id, {
        method: 'PUT',
        credentials: 'include',// on every request we have to send the cookie
        body: data,
        headers: {
          'enctype': 'multipart/form-data'
        }
      })

      const parsedResponse = await updateProfileResponse.json();

      console.log(parsedResponse);

      this.setState({
        ...parsedResponse.data
      })

      console.log(parsedResponse, 'parsedResponse after updating state');

      return parsedResponse


      } catch(err){
         console.log(err);
      }
   }


   editMediaList = (data) => {

      const newList = this.state.media.slice();

      const indexToUpdate = newList.indexOf( media => media.id === data.id)

      newList[indexToUpdate] = data

      this.setState({
         media: newList
      })
   }


   updateFavorite = (newFav, mediaId, favId) => {

      const newMedia = this.state.media.slice()

      if (newFav) {
         // if newFav exists, add to mediaId


         newMedia.forEach( media => {
            if (media.id === mediaId) {
               media.favorites.push(newFav)
            }
         })

      } else {
         // else delete favId

         newMedia.forEach( media => {
            if (media.id === mediaId) {

               media.favorites = media.favorites.filter( favorite => favorite.id !== favId )
            }
         })
      }

      this.setState({
         media: newMedia
      })

   }


   deleteMedia = async (mediaId) => {

      try {
      
         const deleteMediaResponse = await fetch('http://localhost:8000/media/' + mediaId, {
            method: 'DELETE',
            credentials: 'include',// on every request we have to send the cookie
            headers: {
               'enctype': 'multipart/form-data'
            }
         })

         const parsedResponse = await deleteMediaResponse.json();



         let newList = this.state.media.slice()

         newList = newList.filter( media => media.id !== mediaId )

         console.log(newList);

         this.setState({
            media: newList
         })

         console.log(this.state.media);

         return parsedResponse

      } catch(err){
         console.log(err);
      }

   }

   render () {
      // Make sure to return some UI
      return (
    
         <main>

            <Header userId={this.state.id} loggedIn={this.state.loggedIn} logout={this.logout}/>

            <Switch>

               <Route exact path="/login" render={(props) => <Login {...props} logIn={this.logIn} />} />

               <Route exact path="/browse-media" render={(props) => <BrowseMedia {...props} 
                  medias={this.state.media} 
                  loggedIn={this.state.loggedIn} 
                  updateFavorite={this.updateFavorite} 
                  userId={this.state.id} 
                  editMediaList={this.editMediaList} 
                  makePrettyDate={this.makePrettyDate} 
                  deleteMedia={this.deleteMedia} />}  
               />

               <Route exact path="/my-media" render={(props) => <MyMedia {...props} 
                  medias={this.state.media} 
                  loggedIn={this.state.loggedIn} 
                  updateFavorite={this.updateFavorite} 
                  userId={this.state.id} 
                  ditMediaList={this.editMediaList} 
                  makePrettyDate={this.makePrettyDate} 
                  deleteMedia={this.deleteMedia} />} 
               />

               <Route exact path="/my-favorites" render={(props) => <MyFavorites {...props} 
                  medias={this.state.media} 
                  loggedIn={this.state.loggedIn} 
                  updateFavorite={this.updateFavorite} 
                  editMediaList={this.editMediaList} 
                  makePrettyDate={this.makePrettyDate} 
                  deleteMedia={this.deleteMedia}
                  userId={this.state.id} />} 
               />

               <Route exact path="/register" render={(props) => <Register {...props} 
                  register={this.register} /> } 
               />

               <Route exact path="/media/new" render={(props) => <AddMedia {...props} 
                  addMedia={this.addMedia}/>} 
               />

               <Route exact path="/mediaf" render={(props) => <FeaturedMedia {...props} l
                  loggedIn={this.state.loggedIn} 
                  updateFavorite={this.updateFavorite} 
                  editMediaList={this.editMediaList} 
                  media={this.state.featuredMedia} 
                  userId={this.state.id} 
                  deleteCommentFromMedia={this.deleteCommentFromMedia}/>} 
               />

               <Route exact path="/medias" render={(props) => <MediaList {...props} 
                  medias={this.state.media}/>} 
               />

               <Route exact path="/user/edit" render={(props) => <EditProfile {...props} 
                  currentUser={this.state} 
                  editProfile={this.editProfile} />} 
               />

               <Route exact path="/media/:id" render={(props) => <ShowMedia {...props} 
                  loggedIn={this.state.loggedIn} 
                  updateFavorite={this.updateFavorite} 
                  editMediaList={this.editMediaList} 
                  makePrettyDate={this.makePrettyDate} 
                  userId={this.state.id} 
                  deleteCommentFromMedia={this.deleteCommentFromMedia}
                  deleteMedia={this.deleteMedia}/>} 
               />

               <Route exact path="/user/:id" render={(props) => <Profile {...props} 
                  editProfile={this.editProfile} 
                  userId={this.state.id} />} 
               />

            </Switch>
           
         </main>

      )

   }
}


export default App;
