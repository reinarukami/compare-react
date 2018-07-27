import React, { Component } from 'react';
import {Navbar, Icon, Dropdown, Button, NavItem} from 'react-materialize';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="Header">
      <Navbar brand='PTech' left className="#1976d2 blue darken-2">
           
           <ul className="left hide-on-med-and-down">
   
             <li className="tooltipped" data-position="bottom" data-tooltip="Choose">
   
             <Dropdown trigger={
                 <Button>Choose Filter</Button>
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
             </li>     
   
           </ul>
   
           </Navbar>

      </div>
    );
  }
}

export default Header;
