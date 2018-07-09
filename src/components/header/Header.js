import React, { Component } from 'react';
import {Navbar, NavItem, Icon} from 'react-materialize'

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Navbar brand='Reacto JS' left>
            <NavItem href='get-started.html'><Icon>search</Icon></NavItem>
            <NavItem href='get-started.html'><Icon>view_module</Icon></NavItem>
            <NavItem href='get-started.html'><Icon>refresh</Icon></NavItem>
            <NavItem href='get-started.html'><Icon>more_vert</Icon></NavItem>
        </Navbar>
      </div>
    );
  }
}

export default Header;
