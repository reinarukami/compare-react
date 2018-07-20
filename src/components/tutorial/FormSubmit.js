import React, { Component } from 'react'
import {Row, Input, Button, Icon} from 'react-materialize'

export default class FormSubmit extends Component {

    constructor(props){

        super(props);

        this.state ={
            fname:'',
            lname:'',
            email:'',
            pword:''          
        };
    
    }

    GetValues = () => {

        this.setState({
            fname: this._fname.state.value,
            lname: this._lname.state.value,
            email: this._email.state.value,
            pword: this._pword.state.value
        });

    }

  render() {
  
   return (
      <div className="container">
                  <h3>Submit Input Form</h3>
        <Row>
            <Input ref={(input)=>{this._fname = input}} type="email" label="First Name" s={6} />
            <Input ref={(input)=>{this._lname = input}} name="lname" type="email" label="Last Name" s={6} />
            <Input ref={(input)=>{this._email = input}} name="email" type="email" label="Email" s={12} />
            <Input ref={(input)=>{this._pword = input}} name="pword" type="password" label="Password" s={12} />
            <Button onClick={this.GetValues} waves='light'>Submit<Icon left>send</Icon></Button>
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


