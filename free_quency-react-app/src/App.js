import React, { Component } from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom'

import Register from './Register'; 
import Login from './Login'; 
import EditProfile from './EditProfile'; 
import AddMedia from './AddMedia';
import EditMedia from './EditMedia';
import Header from './Header'; 
import FeaturedMedia from './FeaturedMedia'; 

  
class App extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
      about_me: '',
      image: {},
      loggedIn: false,
      featuredMedia: {}
    }
  }

  componentDidMount = async () => {

    const allMediaResponse = await fetch('http://localhost:8000/media/')

    const parsedResponse = await allMediaResponse.json();

    console.log(parsedResponse, 'parsedResponse, login');

    if (parsedResponse.status.code === 200) {
      console.log('logged in if');
      this.setState({
        featuredMedia: parsedResponse.data[0]
      })

    }
    console.log(this.state.featuredMedia);

  }


  logIn = async (loginInfo) => {
    try {

      console.log("LOGIN");

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

      this.redirectHome()

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

      if (parsedResponse.status.code === 200) {
        console.log('logged in if');
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

      return parsedResponse


    } catch(err){
      console.log(err);
    }


  }

  // what should the component render
  render () {
    // Make sure to return some UI
    return (
    
      <main>
        <Header loggedIn={this.state.loggedIn}/>
        <Switch>
          <Route exact path="/login" render={(props) => <Login {...props} logIn={this.logIn} />} />
          <Route exact path="/register" render={(props) => <Register {...props} register={this.register} /> } />
          <Route exact path="/media/new" render={(props) => <AddMedia {...props} addMedia={this.addMedia}/>} />
        {/* How do we switch to displaying the edit profile page? There is a unique id in the url */}
        <Route exact path="/mediaf" render={(props) => <FeaturedMedia {...props} media={this.state.featuredMedia}/>} />
        <Route exact path="/user/edit" render={(props) => <EditProfile {...props} currentUser={this.state} editProfile={this.editProfile} />} />
        <EditMedia />
        </Switch>
        
      </main>

    )

  }
}


export default App;
