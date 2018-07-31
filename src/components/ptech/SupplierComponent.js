import React from 'react'
import Common from './CommonComponent';
import {ProgressBar, Pagination, Modal, Button, Row , Input , Icon,  Col} from 'react-materialize'

export default class SupplierComponent extends Common {

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
        PageType:'Supplier',
        link:'http://localhost:57254/api/Suppliers/',
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
    
      let contents = this.state.loading
        ? <center><Row s={3}>
        <ProgressBar />
      </Row></center>
        : ''
        
      return (
        <div className="container">
   
          {contents}
          
        <Row>
           <Input s={3} name="s_processorID" label={this.state.PageType + ' ID'} validate onChange={(event) => this.GetWithID(event)}><Icon>search</Icon></Input> 
        </Row> 

          {this.state.ErrorMessage}
          {this.state.newcontents}

        <br/>

        <Modal
          actions={<Button onClick={this.Post} className="modal-close waves-effect waves-green btn-flat">Submit<Icon left>send</Icon></Button> }
          header= {this.state.PageType}
          trigger={<Button>Add {this.state.PageType}</Button>}>

                <Row>
                    <Input name="name" type="email" label="Processor" s={12} onChange={(event) => this.handleChange(event)}/>            
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
