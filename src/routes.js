import React from 'react';
import { Route, BrowserRouter as Router, Redirect, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import App from './components/App';
import Main from './components/Main';
import MenuOne from './components/MenuOne';
import Login from './components/Login';
import Signup from './components/Signup';
import Amplify from 'aws-amplify';
import authentication from './functions/authentication';

const isAuthenticated = true;

let AuthData;
authentication.currentSession()
  .then((data) =>{
    console.log(data);
    AuthData = data;
  });


const PrivateRoute = function({ component: Component, ...rest }){
  console.log("authData", AuthData);
  return <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: props.location }
            }}
          />
        )
      }
    />;
};

export const makeMainRoutes = () => {
  return (
      <Router>
        <div>
          <Route path="/" component={App} />
          <Route exact path="/home" component={Main}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
          <PrivateRoute exact path="/menuone" component={MenuOne} />
        </div>
      </Router>
  );
};
