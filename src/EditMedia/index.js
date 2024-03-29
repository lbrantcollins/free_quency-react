import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment} from 'semantic-ui-react';

class EditMedia extends Component {
   constructor(props){
      super(props);

      this.state = {
         id: this.props.media.id,
         title: this.props.media.title,
         description: this.props.media.description,
         url: this.props.media.url
      }
   }

   componentDidMount = () => {

      this.setState({
         ...this.props
      })
   }

   handleChange = (e) => {

      this.setState({
         [e.target.name]: e.target.value
      });
   }

   handleSubmit = (e) => {

      e.preventDefault();

      const data = new FormData();
      data.append('title', this.state.title);
      data.append('description', this.state.description);
      data.append('url', this.state.url);

      this.props.editMedia(data)

   }

   handleSubmit = (e) => {

      e.preventDefault();

      const data = new FormData();
      data.append('title', this.state.title);
      data.append('description', this.state.description);
      data.append('url', this.state.url);

      this.props.handleEdit(data)
   }

   render(){
      return (

         <Grid textAlign='center' verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 450}}>
               <Header as='h2' textAlign='center'>
               Edit Media
               </Header>
            <Form onSubmit={this.handleSubmit}>
               <Segment stacked>
                  Title:
                  <Form.Input fluid icon='pencil alternate' iconPosition='left' placeholder='title' type='text' name='title' value={this.state.title} onChange={this.handleChange}/>
                     Description:
                  <Form.Input fluid icon='keyboard' iconPosition='left' placeholder='description' type='text' name='description' value={this.state.description} onChange={this.handleChange}/>
                     URL:
                  <Form.Input fluid icon='paperclip' iconPosition='left' type='url' name='url' value={this.state.url} onChange={this.handleChange}/>
                  <Button fluid size='large' type='sumbit'>Submit Changes</Button>
               </Segment>
            </Form>
         </Grid.Column>
      </Grid>

    )
  }
}

export default EditMedia;