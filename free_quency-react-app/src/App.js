import React, { Component } from 'react';
import './App.css';

import { Route, Switch, BrowserRouter as Router, Link } from 'react-router-dom';

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
    console.log('mounted component');

    const allMediaResponse = await fetch('http://localhost:8000/media/')

    const parsedResponse = await allMediaResponse.json();

    console.log(parsedResponse, 'parsedResponse, login');

    if (parsedResponse.status.code === 200) {
      console.log('logged in if');
      this.setState({
        media: parsedResponse.data,
        featuredMedia: parsedResponse.data[0]
      })

    }
    console.log(this.state.featuredMedia, 'featured media');

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
      console.log(this.state.tempUser, 'TEMP USER');

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

  logout = async (e) => {

    console.log('LOGOUT');

    const logoutResponse = await fetch('http://localhost:8000/user/logout')

    const parsedResponse = await logoutResponse.json()

    this.setState({
      username: '',
      email: '',
      about_me: '',
      image: {},
      loggedIn: false
    })

  }


  logIn = async (loginInfo) => {
    try {

      console.log("LOGIN");

      console.log("-----------DATA IN LOGIN IN App.js----------------");
    for (let pair of loginInfo.entries()){
      console.log(pair[0]  ,', ', pair[1])
    }
    console.log("--------------------------------------------------------");

      const loginResponse = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        credentials: 'include',
        body: loginInfo,
        headers: {
          'enctype': 'multipart/form-data'
        }
      })

      const parsedResponse = await loginResponse.json();

      console.log(parsedResponse, 'parsedResponse, login');

      if (parsedResponse.status.code === 200) {
        console.log('logged in if');
        this.setState({
          ...parsedResponse.data,
          loggedIn: true
        })

      }

      console.log(this.state, 'state is login');

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

      console.log(parsedResponse)

      if (parsedResponse.status.code === 201) {
        console.log('registered and logged in if');
        this.setState({
          ...parsedResponse.data,
          loggedIn: true
        })

      }

      console.log(this.state, 'STATE IN register');

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

      console.log(parsedResponse);

      const newList = this.state.media

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

    console.log("-----------DATA IN editProfile IN App.js----------------");
    for (let pair of data.entries()){
      console.log(pair[0]  ,', ', pair[1])
    }
    console.log("--------------------------------------------------------");

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

      console.log(parsedResponse, "parsedResponse in editProfile");

      return parsedResponse


    } catch(err){
      console.log(err);
    }


  }

  editMediaList = (data) => {

    const newList = this.state.media

    const indexToUpdate = newList.indexOf( media => media.id == data.id)

    console.log( newList[indexToUpdate], 'old');
    console.log(data, 'new');

    newList[indexToUpdate] = data

    console.log(newList[indexToUpdate], 'new old');

    this.setState({
      media: newList
    })
  }

  updateFavorite = (newFav, mediaId, favId) => {

    console.log(newFav, favId);

    const newMedia = this.state.media

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
          console.log(media.favorites, 'media.favorites in app');


        }
      })


    }

    this.setState({
      media: newMedia
    })

  }

  // what should the component render
  render () {
    // Make sure to return some UI
    return (
    
      <main>
        <Header loggedIn={this.state.loggedIn} logout={this.logout}/>
        <Switch>
          <Route exact path="/login" render={(props) => <Login {...props} logIn={this.logIn} />} />

          <Route exact path="/browse-media" render={(props) => <BrowseMedia {...props} medias={this.state.media} loggedIn={this.state.loggedIn} updateFavorite={this.updateFavorite} userId={this.state.id} editMediaList={this.editMediaList}/>} />

          <Route exact path="/my-media" render={(props) => <MyMedia {...props} medias={this.state.media} loggedIn={this.state.loggedIn} updateFavorite={this.updateFavorite} userId={this.state.id} editMediaList={this.editMediaList}/>} />

          <Route exact path="/register" render={(props) => <Register {...props} register={this.register} /> } />
          {/* How do we switch to displaying the edit profile page? There is a unique id in the url */}

          <Route exact path="/media/new" render={(props) => <AddMedia {...props} addMedia={this.addMedia}/>} />
        {/* How do we switch to displaying the edit profile page? There is a unique id in the url */}

        <Route exact path="/mediaf" render={(props) => <FeaturedMedia {...props} loggedIn={this.state.loggedIn} updateFavorite={this.updateFavorite} userId={this.state.id} media={this.state.featuredMedia} editMediaList={this.editMediaList}/>} />

        <Route exact path="/medias" render={(props) => <MediaList {...props} medias={this.state.media}/>} />

        <Route exact path="/user/edit" render={(props) => <EditProfile {...props} currentUser={this.state} editProfile={this.editProfile} />} />

        <Route exact path="/media/:id" render={(props) => <ShowMedia {...props} loggedIn={this.state.loggedIn} updateFavorite={this.updateFavorite} userId={this.state.id} editMediaList={this.editMediaList} makePrettyDate={this.makePrettyDate}/>} />

        <Route exact path="/user/:id" render={(props) => <Profile {...props} user={this.state.tempUser} editProfile={this.editProfile} />} />

        </Switch>
        
      </main>

    )

  }
}


export default App;
