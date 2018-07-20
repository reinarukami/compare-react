import React, { Component } from 'react'
import {Row, Input, Button, Icon} from 'react-materialize'

export default class ProcessorPostComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            Name:'',  
        };


        this.handleChange = this.handleChange.bind(this);
        this.PostToProcessor = this.PostToProcessor.bind(this);
    }
    
      handleChange(event){
     
        this.setState({
          [event.target.name] : event.target.value,
        });
    
      }

      PostToProcessor(){

        fetch('http://localhost:57254/api/Processors' , {method:'POST', headers:{ 'Accept': 'application/json', 'Content-Type':'application/json'}, body:JSON.stringify(this.state)})
        .then(response => response.json()).catch(error => console.error('Fetch Error =\n', error));

      }
    
      render() {
    
        return (
          <div className="container">
          <h3>Post Processor</h3>
            <Row>
                <Input name="name" type="email" label="Processor" s={12} onChange={(event) => this.handleChange(event)}/>
                <Button onClick={this.PostToProcessor} waves='light'>Submit<Icon left>send</Icon></Button>
            </Row>
    
                   Processor = {this.state.name} 

          </div>
        )
      }

}
