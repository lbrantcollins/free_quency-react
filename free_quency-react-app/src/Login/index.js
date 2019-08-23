import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      password: '',
    }
  }

  handleChange = (e) => {
    console.log(this.state)
    this.setState({[e.target.name]: e.target.value}); 
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('username', this.state.username);
    data.append('password', this.state.password);
    console.log(data, 'data in login Component');

    console.log(data.entries(), ' this is login data')
    for (let pair of data.entries()){
      console.log(pair[0]  ,', ', pair[1])
    }

    const loginResponse = this.props.logIn(data);

    this.props.history.push('/browse-media')

    // login.then((data) => {
    //   if(data.status.message === 'Success'){
    //     this.props.history.push('/profile')
    //   } else {
    //     console.log(data, this.props)
    //   }
    // }).catch((err) => {
    //   console.log(err)
    // })


  }
  render(){
    return (
      <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh'}}>
        <Grid.Column style={{maxWidth: 450}}>
          <Header as='h2' textAlign='center'>
            Log in
          </Header>
          <Form onSubmit={this.handleSubmit}>
              <Segment stacked textAlign='left'>

              Username:
              <Form.Input fluid icon='user' iconPosition='left' placeholder='username' type='text' name='username' onChange={this.handleChange}/>
        
              Password:
              <Form.Input fluid icon='lock' iconPosition='left' type='password' name='password' onChange={this.handleChange}/>
              
              <Button fluid size='large' type='sumbit'>Log in</Button>

              <Message>
                Not a member? <Link to='/Register'>Register</Link>
              </Message>
             
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      )
  }
}

export default Login;