import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, user: user, ...rest }) => {

  return (
    <Route
      {...rest}
      render={props =>
        user.loggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              //state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));
