import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import { Header, Container, Icon, Image, Segment, Grid, Card, Button } from 'semantic-ui-react';




class Main extends React.Component {
  constructor(props) {
    super(props);
  }





  render(){
    return (
    <Container  textAlign="center" className = "main-container">
      <Icon color= "blue" size = "massive" name="folder outline"/>
      <Header  as='h1' textAlign='center' color="blue">
        Cognito Test App - React, Redux & React Router Template
        <Header.Subheader>A template to get started</Header.Subheader>
      </Header>

      </Container>
    );
  }

}


function mapStateToProps(state){
  return {

  };
}



export default withRouter(connect(mapStateToProps)(Main));
