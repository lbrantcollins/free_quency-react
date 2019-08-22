import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class EditProfile extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      password: '',
      email: '',
      about: '',
      image: {}
    }
  }

  

  handleChange = (e) => {
    if(e.target.name !== 'image'){
      this.setState({[e.target.name]: e.target.value});
    } else {
      // file upload
      console.log(e.target.files[0])
      this.setState({image: e.target.files[0]});
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // If no change made to a field, want to keep the original information
    if (this.state.username) {
      data.append('username', this.state.username);
    } else {
      data.append('username', this.props.currentUser.username); // <----- is the else necessary?
    }
    if (this.state.email) {
      data.append('email', this.state.email);
    } else {
      data.append('email', this.props.currentUser.email); // <----- is the else necessary?
    }
    if (this.state.aboutMe) {
      data.append('aboutMe', this.state.aboutMe);
    } else {
      data.append('aboutMe', this.props.currentUser.aboutMe); // <----- is the else necessary?
    }

    if (this.state.password) {
      data.append('password', this.state.password);
      /////////////////////////
      // Would need to re-hash password on the server
      // How does this effect the current session cookies?  if at all?
      /////////////////////////
    } else {
      // ?????
    }

    if (this.state.image) {
      /////////////////////////
      // encode new image
      data.append('image', btoa(this.state.image));
    } else {
      data.append('image', this.props.currentUser.image); // <----- is the else necessary?
    }

    data.append('file', this.state.image);

    console.log(data.entries(), ' this is edit profile data')
    for (let pair of data.entries()){
      console.log(pair[0]  ,', ', pair[1])
    }

    const updateCall = this.props.editProfile(data);

    console.log(this.props.currentUser.image);

  }
  render(){
    return (
      <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh'}}>
        <Grid.Column style={{maxWidth: 450}}>
          <Header as='h2' textAlign='center'>
            Edit Profile
          </Header>
          <Form onSubmit={this.handleSubmit}>
              <Segment stacked textAlign='left'>
              Username:
              <Form.Input fluid icon='user' iconPosition='left' value={this.props.currentUser.username}  placeholder={this.props.currentUser.username} type='text' name='username' onChange={this.handleChange}/>
              Email:
              <Form.Input fluid icon='mail' iconPosition='left' value={this.props.currentUser.username} placeholder={this.props.currentUser.email} type='text' name='email' onChange={this.handleChange}/>
              Password:
              <Form.Input fluid icon='lock' iconPosition='left' type='password' name='password' onChange={this.handleChange}/>
              About me:
              <Form.TextArea  icon='file alternate' iconPosition='left' rows='5' value={this.props.currentUser.username} placeholder={this.props.currentUser.aboutMe} type='textarea' name='aboutMe' onChange={this.handleChange}/>
              Profile image:

              <div>
                <img src={this.props.currentUser.image} alt="existing profile"/>
              </div>

              <Form.Input fluid icon='image' iconPosition='left' type="file" name='image' onChange={this.handleChange}/>

              <Button fluid size='large' type='sumbit'>Submit Changes</Button>
            
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      )
  }
}

export default EditProfile;