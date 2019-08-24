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
      image: '',
      newImage: {},
    }
  }

  componentDidMount() {

    this.setState({
      ...this.props.currentUser
    }) 
  }

  handleChange = (e) => {
    if(e.target.name !== 'image'){
      this.setState({
        [e.target.name]: e.target.value,
        
      });
    } else {
      // file upload
      this.setState({
        newImage: e.target.files[0],
      });
      
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append('username', this.state.username);
    data.append('email', this.state.email);
    data.append('about_me', this.state.about_me);
    data.append('password', this.state.password);

    data.append('file', this.state.newImage);

    this.props.editProfile(data);

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