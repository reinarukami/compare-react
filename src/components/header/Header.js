import React, { Component } from 'react';
import {Navbar, Dropdown, NavItem, Icon} from 'react-materialize';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="Header">

      <Navbar className="#1976d2 blue darken-2">      
              <NavItem node='button'>Ptech</NavItem>    

               <Dropdown trigger={

                <NavItem node='button'><Icon>more_vert</Icon></NavItem>
                }>

                  <li><Link to="/ptech-asset">Assets</Link></li>
                  <li><Link to="/ptech-categories">Categories</Link></li>
                  <li><Link to="/ptech-manufacturer">Manufacturers</Link></li>
                  <li><Link to="/ptech-model">Models</Link></li>
                  <li><Link to="/ptech-harddisk">Hard Disk</Link></li>
                  <li><Link to="/ptech-memory">Memory</Link></li>
                  <li><Link to="/ptech-videocard">Video Card</Link></li>
                  <li><Link to="/ptech-supplier">Suppliers</Link></li>
                  <li><Link to="/ptech-processor">Processor</Link></li>

                  
                </Dropdown>
              
              
              <Dropdown trigger={

                <NavItem className="right hide-on-med-and-down" node='button'><Icon>more_vert</Icon></NavItem>
                 }>
   
                   <li><Link to="/ptech-users">Add Account</Link></li>
                   <li><Link to="/ptech-asset">Login</Link></li>
                   <li><Link to="/ptech-categories">Logout</Link></li>
          
              </Dropdown>

              <NavItem className="right hide-on-med-and-down" node='button'><Icon>search</Icon></NavItem>
              <NavItem className="right hide-on-med-and-down" node='button'><Icon>view_module</Icon></NavItem>
              <NavItem className="right hide-on-med-and-down" node='button'><Icon>refresh</Icon></NavItem>
              
      </Navbar>

      </div>
    );
  }
}

export default Header;
