import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Register extends Component {
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
  handleClick = async () => {


    try {

      const registerResponse = await fetch('http://localhost:8000/user/1', {
        method: 'GET',
        credentials: 'include',// on every request we have to send the cookie
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

      console.log(parsedResponse);
      return parsedResponse;

    } catch (err) {
      console.log(err)
    }


  }
  handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', this.state.image);
    data.append('username', this.state.username);
    data.append('password', this.state.password);
    data.append('about_me', this.state.about);
    data.append('email', this.state.email);

    console.log(data.entries(), ' this is registration data')
    for (let pair of data.entries()){
      console.log(pair[0]  ,', ', pair[1])
    }

    const registerCall = this.props.register(data);

    // registerCall.then((data) => {
    //   console.log(data)
    //     if(data.status.message === "Success"){
    //       this.props.history.push('/profile')
    //     } else {
    //       console.log(data, ' this should have an error message? How could you display that on the screen')
    //     }
    // })
  }
  render(){
    return (
      <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh'}}>
        <Grid.Column style={{maxWidth: 450}}>
          <Header as='h2' textAlign='center'>
            Register
          </Header>
          <Form onSubmit={this.handleSubmit}>
              <Segment stacked textAlign='left'>
              Username:
              <Form.Input fluid icon='user' iconPosition='left' placeholder='username' type='text' name='username' onChange={this.handleChange}/>
              Email:
              <Form.Input fluid icon='mail' iconPosition='left' placeholder='email' type='text' name='email' onChange={this.handleChange}/>
              Password:
              <Form.Input fluid icon='lock' iconPosition='left' type='password' name='password' onChange={this.handleChange}/>
              About me:
              <Form.TextArea icon='file alternate' iconPosition='left' rows='5' type='textarea' name='about' onChange={this.handleChange}/>
              Profile image:
              <Form.Input fluid icon='image' iconPosition='left' type="file" name='image' onChange={this.handleChange}/>
              <Button fluid size='large' type='sumbit'>Register</Button>

              <Message>
                Already a member? <Link to='/'>Log in</Link>
              </Message>
             
              </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      )
  }
}

export default Register;