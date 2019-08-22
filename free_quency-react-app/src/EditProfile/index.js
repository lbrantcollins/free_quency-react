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
      about_me: '',
      image: {},
      imageChanged: false
    }
  }

  componentDidMount() {
  console.log('inside component mount');
    this.setState({
      ...this.props.currentUser
    }) 
    console.log(this.state, 'state in editProfile');
  }

  handleChange = (e) => {
    if(e.target.name !== 'image'){
      this.setState({
        [e.target.name]: e.target.value,
        imageChanged: true,
      });
    } else {
      // file upload
      console.log(e.target.files[0])
      this.setState({image: e.target.files[0]});
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append('username', this.state.username);
    data.append('email', this.state.email);
    data.append('aboutMe', this.state.aboutMe);

    /////////////////////////
    // Would need to re-hash password on the server?
    // How can we tell if password has changed?
    // How does this effect the current session cookies?  if at all?
    /////////////////////////
    data.append('password', this.state.password);

    if (this.state.imageChanged) {
      /////////////////////////
      // need to encode new image
      data.append('file', this.state.image);
    }

    console.log(data.entries(), ' this is edit profile data')
    for (let pair of data.entries()){
      console.log(pair[0]  ,', ', pair[1])
    }

    const updateCall = this.props.editProfile(data);

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
              <Form.Input fluid icon='user' iconPosition='left' value={this.state.username}  placeholder='username' type='text' name='username' onChange={this.handleChange}/>
              Email:
              <Form.Input fluid icon='mail' iconPosition='left' value={this.state.email} type='text' name='email' onChange={this.handleChange}/>
              Password:
              <Form.Input fluid icon='lock' iconPosition='left' type='password' name='password' onChange={this.handleChange}/>
              About me:
              <Form.TextArea  icon='file alternate' iconPosition='left' rows='5' value={this.state.about_me} type='textarea' name='about_me' onChange={this.handleChange}/>
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