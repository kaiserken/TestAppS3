import React from 'react';
import { Route, Router, Redirect, Switch } from 'react-router-dom';
import App from './components/App';
import Main from './components/Main';
import MenuOne from './components/MenuOne';




const isAuthenticated = true;

const PrivateRoute = function({ component: Component, ...rest }){
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
        <Switch>
          <Route path="/" component={App} />
          <Route path="/home" component={Main}/>

          <PrivateRoute exact path="/menuone" component={MenuOne} />
        </Switch>
      </Router>
  );
};
