import React from 'react';
import { Route, BrowserRouter as Router, Redirect, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
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

class MakeMainRoutes extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
        <Router>
          <div>
            <Route path="/" component={App} />
            <Route path="/home" component={Main}/>
            <PrivateRoute path="/menuone" component={MenuOne}/>
          </div>
        </Router>
    );
  }
}

function mapStateToProps(state){
  return {

  };
}



export default (MakeMainRoutes);
