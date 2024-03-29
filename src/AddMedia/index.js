import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

class AddMedia extends Component {
  constructor(){
    super();

    this.state = {
      title: '',
      description: '',
      url: ''
    }
  }

  handleChange = (e) => {
    
      this.setState({
        [e.target.name]: e.target.value
      });
  }

  handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();
    data.append('title', this.state.title);
    data.append('description', this.state.description);
    data.append('url', this.state.url);

    const newMedia = await this.props.addMedia(data)

    console.log(newMedia);

    this.props.history.push('/media/' + newMedia.data.id)

  }

  render(){
    return(

      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{maxWidth: 450}}>
          <Header as='h2' textAlign='center'>
            Add Media
          </Header>
          <Form onSubmit={this.handleSubmit}>
              <Segment stacked>
              Title:
              <Form.Input fluid icon='pencil alternate' iconPosition='left' placeholder='title' type='text' name='title' onChange={this.handleChange}/>
              Description:
              <Form.Input fluid icon='keyboard' iconPosition='left' placeholder='description' type='text' name='description' onChange={this.handleChange}/>
              URL:
              <Form.Input fluid icon='paperclip' iconPosition='left' type='url' name='url' onChange={this.handleChange}/>
              <Button fluid size='large' type='sumbit'>Add Media</Button>
             
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>

    )
  }
}

export default AddMedia