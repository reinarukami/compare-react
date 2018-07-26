import React, { Component } from 'react'
import Common from './CommonComponent';
import {ProgressBar, Pagination, Modal, Button, Row , Input , Icon,  Col} from 'react-materialize'

export default class CategoriesComponent extends Common {

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
        PageType:'Categories',
        link:'http://localhost:57254/api/Categories/',
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

    handleUpdateChange = (event, id) =>
    {     
      this.state.putState.id = id;
      this.state.putState.name = event.target.value;
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

          {this.state.newcontents}

        <br/>

        <Modal
          actions={<Button onClick={this.Post} className="modal-close waves-effect waves-green btn-flat">Submit<Icon left>send</Icon></Button> }
          header= {'Add '+this.state.PageType}
          trigger={<Button>Add {this.state.PageType}</Button>}>

                <Row>
                    <Input name="name" type="email" label={'Add '+this.state.PageType} s={12} onChange={(event) => this.handleChange(event)}/>            
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
