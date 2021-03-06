import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Redirect, withRouter } from 'react-router-dom';
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
      error: "",
    };
  }

  submitConfirmation(e){
    e.preventDefault();
    this.props.confirmSignUp(this.state.email, this.state.confirmationCode)
    .then(response => {
      this.setState({
        needConfirmation: false,
        error:""
      });
      this.props.history.push("/login");
    })
    .catch((err)=> {
      this.setState({
        error: err.message
      });
    });
  }


  submitForm(e){
    e.preventDefault();
    this.props.signUserUp(this.state.email, this.state.password)
    .then(response => {
      this.setState({
        needConfirmation: true,
        error: "",
      });

    })
    .catch(err => {
      console.error(err);
      if (err){
        this.setState({
          needConfirmation: false,
          error: err.message
        });
      }
    });
  }

  changeForm(event) {
    var id = event.target.name;
    var data = {};
    data[id] = event.target.value.trim();
    this.setState(data);
  }

  displayError(){
    if (this.state.error){
      return (
        <Segment floated="left" textAlign='center' inverted color="red" >
          {this.state.error}
        </Segment>
      );
    }
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
          {this.displayError()}
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
         <Button color="green" type='submit'>Submit</Button>
        </Form>
        {this.displayError()}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
