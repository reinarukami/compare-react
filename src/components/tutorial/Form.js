import React, { Component } from 'react'
import {Row, Input} from 'react-materialize'

export default class Form extends Component {
    
  constructor(props){
    super(props);
    this.state ={
        fname:'',
        lname:'',
        email:'',
        pword:''          
    };

    this.handleChange = this.handleChange.bind(this);

}

  handleChange(event){
 
    this.setState({
      [event.target.name] : event.target.value,
    });

  }

  render() {

    return (
      <div className="container">
      <h3>Onchange Input Form</h3>
        <Row>
            <Input name="fname" type="email" label="First Name" s={6} onChange={(event) => this.handleChange(event)}/>
            <Input name="lname" type="email" label="Last Name" s={6} onChange={(event) => this.handleChange(event)}/>
            <Input name="email" type="email" label="Email" s={12} onChange={(event) => this.handleChange(event)}/>
            <Input name="pword" type="password" label="Password" s={12} onChange={(event) => this.handleChange(event)}/>
        </Row>

               First Name = {this.state.fname} 
               <br/>
               Last Name = {this.state.lname}
               <br/>
               Email = {this.state.email}
               <br/>
               Password = {this.state.pword}
               <br/>
      </div>
    )
  }
  
}
