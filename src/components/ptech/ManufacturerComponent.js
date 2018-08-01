import React from 'react'
import Common from './CommonComponent';
import {Pagination, Modal, Button, Row , Input , Icon} from 'react-materialize'

export default class ManufacturerComponent extends Common {

    constructor(props) 
    {
     
      super(props);
      this.state =  
      { 
        list: [], 
        listWithPager : [], 
        loading: true, 
        newcontents:'', 
        showAll:false, 
        activePage:1, 
        PageType:'Manufacturer',
        link:'http://localhost:57254/api/Manufacturers/',
        postState : {name:''},
        putState : {id:'',name:''}
      };

    }

    componentDidMount()
    {   
      super.GetWithPager();
    }

    handleChange = (event) =>
    {     
      this.state.postState.name = event.target.value;
    }

    handleUpdate = (_formID) =>
    {     
      var properties = Object.keys(this.state.postState);
      for(var property = 0; property < properties.length; property++)
      {
         this.state.postState[properties[property]] = document.getElementById("EditForm" +_formID).elements[properties[property]].value
      }

      this.Put(_formID);
    }

    render() {
   
        
      return (
        <div className="container">
   
          
        <Row>
           <Input s={3} name="s_processorID" label={this.state.PageType + ' ID'} validate onChange={(event) => this.GetWithID(event)}><Icon>search</Icon></Input> 
        </Row> 
          
          {this.state.Message}
          {this.state.newcontents}

        <br/>

        <Modal
          actions={<Button onClick={this.Post} className="modal-close waves-effect waves-green btn-flat">Submit<Icon left>send</Icon></Button> }
          header={'Add '+this.state.PageType}
          trigger={<Button>Add {this.state.PageType}</Button>}>

                <Row>
                    <Input name="name" type="email" label={this.state.PageType} s={12} onChange={(event) => this.handleChange(event)}/>            
                </Row> 

        </Modal>

            <br/>
             <center>
                <Input type='checkbox' label='DisplayAll' onChange={(event) => super.TogglePage(event)}/>
            </center>

            <Pagination items={this.state.listWithPager.totalPage} activePage={this.state._activePage} maxButtons={this.state.listWithPager.totalPage} onSelect={this.FetchPage}/>
        </div>
      );
      
    }

  
}
