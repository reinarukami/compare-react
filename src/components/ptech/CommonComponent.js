import React, { Component } from 'react'
import {Table, ProgressBar, Pagination, Modal, Button, Row , Input , Icon,  Col} from 'react-materialize'

export default class CommonComponent extends Component 
{
    constructor(props)
    {
      super(props);
      this.GetWithPager = this.GetWithPager.bind(this);
      this.GetAll = this.GetAll.bind(this);
      this.TogglePage = this.TogglePage.bind(this);
      this.PageStatus = this.PageStatus.bind(this);
    }

    Post = () =>
    {
      fetch(this.state.link , {method:'POST', headers:{ 'Accept': 'application/json', 'Content-Type':'application/json'}, body:JSON.stringify(this.state.postState)})
      .then(response => response.json())
      .then(data =>{
        this.PageStatus(this.state); 
      })
      .catch(error => console.error('Fetch Error =\n', error));
    }

    GetWithID = (event) => 
    {
        if(event.target.value =='')
        {
          this.PageStatus(this.state);
        }
        else
        {
        fetch('http://localhost:57254/api/Processors/' + event.target.value , {method:'get'})
        .then(response => response.json())
        .then(data => {
          if(data.success != false)
          {
          this.setState({ loading: false, newcontents: this.renderTablebyID(data)});  
          }
        });
      }
    }

    GetWithPager()
    {
        fetch(this.state.link + '?CurrentPage=' + this.state.activePage  , {method:'get'})
        .then(response => response.json())
        .then(data => {
          this.setState({ listWithPager: data, loading: false,  newcontents: this.renderTable(data)});  
        });
    }

    GetAll()
    {
        fetch(this.state.link + '?ShowAll=true' , {method:'get'})
        .then(response => response.json())
        .then(data => {
          this.setState({ list: data, loading: false , newcontents: this.renderTable(data, this)});  
        });
    }
  
    TogglePage(event)
    { 
      this.state.showAll = event.target.checked;
      this.PageStatus(this.state, this.ShowAll);
    }

    PageStatus(state)
    {
       if(state.showAll)
       {
        this.GetAll();
       }
       else
       {
        this.GetWithPager(this.state._activePage);
       }
    }

    FetchPage = (pagestat) =>
    {
        this.setState({
          activePage : pagestat
        })
        fetch(this.state.link + '?CurrentPage=' + pagestat , {method:'get'})
        .then(response => response.json())
        .then(data => {
          this.setState({ listWithPager: data, loading: false, newcontents: this.renderTable(data, this)});  
        });
    }

    Put = () =>
    {
      fetch('http://localhost:57254/api/Processors/' + this.state.putState.id , {method:'PUT', headers:{ 'Accept': 'application/json', 'Content-Type':'application/json'}, body:JSON.stringify(this.state.putState)})
      .then(response => response.json())
      .then(data =>{
        this.PageStatus(this.state); 
      })
      .catch(error => console.error('Fetch Error =\n', error));
    }
  

    renderTablebyID(list) 
    {
      return (      
        <div>
        <Table className="responsive-table striped highlight centered">
          <thead>
            <tr>
              <th data-field="id">{this.state.PageType} ID</th>
              <th data-field="name">{this.state.PageType} Name</th>
            </tr>
          </thead>
          <tbody>       
            <tr key={list.id}>
              <td>{list.id}</td>
              <td>{list.name}</td>
              <td>
                    <Modal
                        actions={<Button onClick={(event) => this.Put()} className="modal-close waves-effect waves-green btn-flat">Submit<Icon left>send</Icon></Button> }
                        header={list.name}
                        trigger={<Button className ='#f4ff81 lime accent-1' >Edit {this.state.PageType}</Button>}>
  
                        <Row>
                            <Input name="name" type="email" label={this.state.PageType} s={12} onChange={(event) => this.handleUpdateChange(event, list.id)}/>                         
                        </Row> 
                   </Modal>
              </td>
            </tr>
          </tbody>  
        </Table>
      </div>
      );
    }

    renderTable(list)
    {
      return (      
        <div>
        <Table className="responsive-table striped highlight centered">
          <thead>
            <tr>
              <th data-field="id">{this.state.PageType} ID</th>
              <th data-field="name">{this.state.PageType} Name</th>
            </tr>
          </thead>
          <tbody>       
            {list.list.map(list =>
              <tr key={list.id}>
                <td>{list.id}</td>
                <td>{list.name}</td>
                <td>
                    <Modal
                        actions={<Button onClick={(event) => this.Put()} className="modal-close waves-effect waves-green btn-flat">Submit<Icon left>send</Icon></Button> }
                        header={list.name}
                        trigger={<Button className ='#f4ff81 lime accent-1' >Edit {this.state.PageType}</Button>}>
                        <Row>
                            <Input name="name" type="email" label={this.state.PageType} s={12} onChange={(event) => this.handleUpdateChange(event,list.id)}/>                         
                        </Row> 
                    </Modal>
              </td>
              </tr>
            )}
          </tbody>  
        </Table>
      </div>
      );
    }

}
