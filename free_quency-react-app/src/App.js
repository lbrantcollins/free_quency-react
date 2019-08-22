import React, { Component } from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import Register from './Register'; 
import Login from './Login'; 
import EditProfile from './EditProfile'; 
import AddMedia from './AddMedia';
import EditMedia from './EditMedia'; 

  
class Hello extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      email: '',
      about: '',
      image: {},
      loading: true
    }
  }


  logIn = async (loginInfo) => {
    try {

      const loginResponse = await fetch('http://localhost:8000/user/login', {
        method: 'GET',
        credentials: 'include',
        body: JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await loginResponse.json();

      this.setState(() => {
        return {
          ...parsedResponse.data,
          loading: false
        }
      })

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

      this.setState({
        ...parsedResponse.data,
        loading: false
      })

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
        <Switch>
          <Route exact path="/" render={(props) => <Login {...props} logIn={this.logIn} />} />
          <Route exact path="/register" render={(props) => <Register {...props} register={this.register} /> } />
        {/* How do we switch to displaying the edit profile page? There is a unique id in the url */}
        <EditProfile editProfile={this.editProfile} />
        <AddMedia addMedia={this.addMedia}/>
        <EditMedia />
        </Switch>
      </main>

    )

  }
}


export default Hello;
