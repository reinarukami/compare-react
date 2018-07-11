import React, { Component } from 'react';
import {Navbar, Icon, Dropdown, Button, NavItem} from 'react-materialize';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Navbar brand='ReactJS Training' left className="#1976d2 blue darken-2">
           
        <ul className="left hide-on-med-and-down">
          <li><Link to="/home"><Icon>home</Icon></Link></li>
          <li><Link to="/contact"><Icon>contacts</Icon></Link></li>
          <li><Link to="/tutorial"><Icon>school</Icon></Link></li>
          <li><Link to="/"><Icon>reorder</Icon></Link></li>
          
        </ul>

            {/* <Link className="left hide-on-med-and-down" to="/home"><Icon>home</Icon></Link>
            <Link className="left hide-on-med-and-down" to="/contact"><Icon>contacts</Icon></Link>
            <Link className="left hide-on-med-and-down dropdown-trigger" data-target="dropdown" to="/tutorial"><Icon>school</Icon></Link> */}

        </Navbar>
      </div>
    );
  }
}

export default Header;
