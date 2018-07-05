import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Route, BrowserRouter as Router, Redirect, Switch, withRouter } from 'react-router-dom';
import authentication from '../functions/authentication';
import { setUser } from '../actions/user_actions';
import App from './App';
import Main from './Main';
import MenuOne from './MenuOne';
import Login from './Login';
import Signup from './Signup';
import PrivateRoute from './PrivateRoute';



class MainRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount(){
    this.props.setUser()
    .then(()=>{
      this.setState({loading: false});
    })
    .catch(()=>{
      this.setState({loading: false});
    });
  }

  render(){
    if (this.state.loading){
      return null;
    }

    return (
      <Router>
        <div>
          <Route path="/" component={App} />
          <Route path="/home" component={Main}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <PrivateRoute path="/menuone" component={MenuOne} />
        </div>
      </Router>
    );
  }


}


function mapStateToProps(state){
  return {
    user: state.user
  };
}

function  mapDispatchToProps  (dispatch)  {
  return bindActionCreators({ setUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainRoutes);
