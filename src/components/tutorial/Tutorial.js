import React, { Component } from 'react';
import {Navbar, Icon, Dropdown, Button, NavItem} from 'react-materialize';

export default class Tutorial extends Component {

    constructor(props){
        super(props);
        this.state ={isToggleOn:false,
        isIncrement:false,
        increment:0,
        prevVal:0
        } ;
        this.handleClick = this.handleClick.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
    }

    handleClick(){
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
    }

    handleClick2(){
      this.setState(prevState => ({
        increment: prevState.increment + 1 
      }));
    }


  render() {

    let colorchange = this.state.isToggleOn ? '#c51162 pink accent-4' : '';
 
    return (
      <div>
        {this.state.increment}
        <Button waves='light' className={colorchange} onClick={this.handleClick}>Change Color</Button> 
        <Button waves='light' onClick={this.handleClick2}>Increment</Button> 
      </div>
    )
  }
}

