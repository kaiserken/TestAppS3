import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Redirect } from 'react-router-dom';
import { signUserUp, confirmSignUp } from '../actions/user_actions';
import { Container, Button, Checkbox, Form, Header, Icon, Segment } from 'semantic-ui-react';


// Renders Login screen when not logged in

class Signup extends React.Component {
  constructor(props) {
  super(props);
    this.state = {
      email:   "",
      password:    "",
      confirmationCode: "",
      needConfirmation: false,
    };
  }

  submitConfirmation(e){
    e.preventDefault();
    this.props.confirmSignUp(this.state.email, this.state.confirmationCode)
    .then(response => {
      this.setState({
        needConfirmation: false,
      });
      this.props.history.push("/login");
    })
    .catch(error => {
      console.error(error);
    });
  }


  submitForm(e){
    e.preventDefault();
    this.props.signUserUp(this.state.email, this.state.password)
    .then(response => {
      this.setState({needConfirmation: true});
    })
    .catch(error => {
      console.error(error);
      if (error){
        this.setState({needConfirmation: false});
      }
    });
  }

  changeForm(event) {
    var id = event.target.name;
    var data = {};
    data[id] = event.target.value.trim();
    this.setState(data);
  }


  render(){

    if (this.state.needConfirmation){
      return (
        <Container className="login-container">
          <Header as='h2' icon textAlign='center'>
            <Icon color="blue" name='user' circular />
            <Header.Content>Create Your Account</Header.Content>
          </Header>
          <Segment textAlign='center' inverted color="blue" >
            Enter the confirmation code that was just sent to {this.state.email} to complete the process!
          </Segment>
          <Form onSubmit = {this.submitConfirmation.bind(this)}>
           <Form.Field>
             <label>Confirmation Code</label>
             <input
              name="confirmationCode"
              placeholder='Confirmation Code'
              value={this.state.confirmationCode}
              onChange = {this.changeForm.bind(this)}
             />
           </Form.Field>
           <Button type='submit'>Submit</Button>
          </Form>
        </Container>
      );
    }

    return (
      <Container className="login-container">
        <Header as='h2' icon textAlign='center'>
          <Icon color="blue" name='user' circular />
          <Header.Content>Create Your Account</Header.Content>
        </Header>
        <Form onSubmit = {this.submitForm.bind(this)}>
         <Form.Field>
           <label>Email</label>
           <input
            name="email"
            placeholder='Email'
            value={this.state.email}
            onChange = {this.changeForm.bind(this)}
           />
         </Form.Field>
         <Form.Field>
           <label>Password</label>
           <input
            name="password"
            placeholder='Password'
            type="password"
            value={this.state.signinPassword}
            onChange = {this.changeForm.bind(this)}
           />
         </Form.Field>
         <Button type='submit'>Submit</Button>
        </Form>
      </Container>
    );
  }

}

function mapStateToProps(state){
  return { user: state.user};
}

function  mapDispatchToProps  (dispatch)  {
  return bindActionCreators({ confirmSignUp, signUserUp }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
