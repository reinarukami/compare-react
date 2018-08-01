import React, { Component } from 'react';
import {Button} from 'react-materialize';
import {Redirect, Route} from 'react-router-dom';

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
        this.handleClick3 = this.handleClick3.bind(this);
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

    handleClick3(){
    <Route exact path="/" render={() => (

        <Redirect to="/form"/>

    )}/>
    }


  render() {

    let colorchange = this.state.isToggleOn ? '#c51162 pink accent-4' : '';
 
    return (
      <div>
        <Button waves='light' className={colorchange} onClick={this.handleClick}>Change Color</Button>
        <br/>
        <br/>
        <Button waves='light' onClick={this.handleClick2}>Increment</Button> 
        <br/>
        <br/>
        <Button waves='light' onClick={this.handleClick3}>Go to Form</Button> 
        {this.state.increment}
      </div>
    )
  }
}


