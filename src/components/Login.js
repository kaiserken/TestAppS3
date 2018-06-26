import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Redirect } from 'react-router-dom';
import {logUserIn} from '../actions/user_actions';
import { Container, Button, Checkbox, Form } from 'semantic-ui-react';


// Renders Login screen when not logged in

class Login extends React.Component {
  constructor(props) {
  super(props);
    this.state = {
      email:   "",
      password:    "",
      redirectToReferrer: false,
    };
  }


  signup(){
    this.props.history.push("/signup");
  }

  submitForm(e){
    e.preventDefault();
    this.props.logUserIn(this.state.email, this.state.password)
    .then(response => {
      this.setState({ redirectToReferrer: true });
    })
    .catch(error => {
      console.error(error);
      if (error){
        alert(`Error Code ${error.status}: ${error.data.message}`);
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
    const { from } = this.props.location.state || { from: { pathname: "/" } };

    if (this.state.redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <Container className="login-container">
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
        <Button onClick={this.signup.bind(this)}>Signup</Button>
      </Container>
    );
  }

}

function mapStateToProps(state){
  return { user: state.user};
}

function  mapDispatchToProps  (dispatch)  {
  return bindActionCreators({ logUserIn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);