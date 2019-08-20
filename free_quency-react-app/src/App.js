import React, { Component } from 'react';
// import './App.css';
import Register from './Register'; 
  
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

  // what should the component render
  render () {
    // Make sure to return some UI
    return (
      <div>
      
      <Register register={this.register}/>

      </div>
    )
  }
}


export default Hello
