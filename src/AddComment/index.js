import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment} from 'semantic-ui-react';

class AddComment extends Component {
  constructor(){
    super();

    this.state = {
      content: ''
    }
  }

  handleChange = (e) => {

      this.setState({
        [e.target.name]: e.target.value
      });

  }

  handleSubmit = (e) => {

    e.preventDefault();

    const data = new FormData();
    data.append('media_id', this.props.mediaId);
    data.append('content', this.state.content);

    this.props.addComment(data)

    this.setState({
      content: ''
    })

  }

  render(){
    return(

      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{maxWidth: 450}}>
          <Header as='h2' textAlign='center'>
            Add Comment
          </Header>
          <Form onSubmit={this.handleSubmit}>
              <Segment stacked>
              <Form.TextArea  icon='file alternate' iconPosition='left' rows='5' value={this.state.content} type='textarea' name='content' onChange={this.handleChange}/>
              
              <Button fluid size='large' type='sumbit'>Submit Comment</Button>
             
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>

    )
  }
}

export default AddComment