import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Menu, Responsive, Header, Icon, Dropdown, Container, Segment } from 'semantic-ui-react';





class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){

  }

  login() {
    this.props.history.push("/login");
  }

  logout() {

  }
  logInOutMenu(){
    const isAuthenticated = false;
    //some sort of user logged in logic
    if (isAuthenticated){
      return (
        <Menu.Item
          position='right'
          onClick={this.logout.bind(this)}
        >
          Sign Out
        </Menu.Item>
      );
    } else {
      return (
        <Menu.Item onClick={this.login.bind(this)} position='right'>Sign In</Menu.Item>
      );
    }
  }




  render() {

    const trigger = (
      <span>
        <Icon size="big" color = "blue" name='content' />
      </span>
    );

    // the Responsive tag is used to decide whether to render a dropdown nav or not based on a breakpoint - the breakpoint is set in the Responsive tags below
    return (
    <Segment.Group>
      <Responsive as={Segment} minWidth={820}>
        <Menu className="fixed top appHeader-menu" borderless>
          <Menu.Item className = "appheader-image" as={NavLink} exact to="/home">
            AuthO Test
          </Menu.Item>

          <Menu.Item as={NavLink} exact to="/menuone">
            Menu 1
          </Menu.Item>

          <Menu.Item  as={NavLink} exact to="/">
            Menu 2
          </Menu.Item>

          <Menu.Item  as={NavLink} exact to="/">
            Menu 3
          </Menu.Item>

          <Menu.Item  as={NavLink} exact to="/">
            Menu 4
          </Menu.Item>

          <Menu.Item  as={NavLink} exact to="/">
            Menu 5
          </Menu.Item>
          {this.logInOutMenu()}
        </Menu>

      </Responsive>

      <Responsive as={Segment} maxWidth={820}>

          <Menu borderless className="fixed top appheader-menu" >
            <Dropdown item icon = ""labeled trigger={trigger}>
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} exact to="/menuone">
                  <span className='text'>Menu 1</span>
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} exact to="/">
                  <span className='text'>Menu 2</span>
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} exact to="/">
                  <span className='text'>Menu 3</span>
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} exact to="/">
                  <span className='text'>Menu 4</span>
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} exact to="/">
                  <span className='text'>Menu 5</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {this.logInOutMenu()}
          </Menu>

      </Responsive>
    </Segment.Group>
    );
  }
}


function mapStateToProps(state){
  return {
    user: state.user
  };
}

function  mapDispatchToProps  (dispatch)  {
  return bindActionCreators({ }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
