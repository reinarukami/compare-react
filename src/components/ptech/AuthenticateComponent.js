import React from 'react'
import './Main.css';
import Common from './CommonComponent';
import Cookies from 'universal-cookie';
import {Button, Row , Input , Icon} from 'react-materialize'
import PropTypes from 'prop-types';

export default class AuthenticateComponent extends Common  {

    static contextTypes = {router:PropTypes.object}

    constructor(props, context) 
    {
     
      super(props);
      this.state =  
      { 
        link:'http://localhost:57254/api/Users/authenticate/',
        postState : 
        {
            UserName:'',
            Password:''
        }
      };

    }
    
    handleChange = (event) =>
    {     
        this.state.postState[[event.target.name]] = event.target.value;   
    }

    Post = () =>
    {
      fetch(this.state.link + '?UserName=' + this.state.postState.UserName + '&Password=' + this.state.postState.Password , {method:'POST', headers:{ 'Accept': 'application/json', 'Content-Type':'application/json'}})
      .then(response => response.json())
      .then(data =>{
           
        const cookies = new Cookies();
            
            cookies.set('id', data.id, { path: '/' });
            cookies.set('fullName', data.fullName, { path: '/' });
            cookies.set('userName', data.userName, { path: '/' });
            cookies.set('token', data.token, { path: '/' });
          
            this.context.router.history.push("/ptech-asset");
      })
       
      .catch(error => console.error('Fetch Error =\n', error));
    }

    render() {
        
      return (

        <div className="container">
    
        <div className="login-container">
            <h5 class="blue-text darken-2-text">Please, login into your account</h5>
            
            <div className="Login">
                <Row>
                   <Input s={12} name="UserName" label='Enter Your User Name' validate onChange={(event) => this.handleChange(event)}><Icon>person</Icon></Input> 
                   <Input s={12} name="Password" label='Enter Your Password' type='Password'  validate onChange={(event) => this.handleChange(event)}><Icon>archive</Icon></Input> 
                </Row> 
 
                <Row>
                   <Button onClick={(event) => this.Post()} >Login</Button>
                </Row>
            </div>
        </div>

        </div>

      );
      
    }

  
}
