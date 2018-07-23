import React, { Component } from 'react';
import {Table, ProgressBar, Pagination, Modal, Button, Row , Input , Icon,  Col} from 'react-materialize'

export default class ProcessorListComponent extends Component {

  constructor(props) 
  {
    super(props);
     this.state = { list: [], listWithPager : [], loading: true, newcontents:'', showAll:false, _activePage:1};

     this.showAll = false;

     
  }

  componentDidMount(){
    
     this.GetAll();
     this.GetWithPager();
  }


  handleChange = (event) =>
  {     
    this.setState({
      [event.target.name] : event.target.value,
    });
  }

  PageStatus = (state) => 
  {
     if(state.showAll)
     {
      this.setState({loading: false, newcontents: ProcessorListComponent.renderTable(state.list)})
     }
     else
     {
      this.setState({loading: false, newcontents: ProcessorListComponent.renderTable(state.listWithPager)})
     }
  }

  TogglePage = (event) =>
  { 
     this.state.showAll = event.target.checked;
     this.PageStatus(this.state, this.ShowAll);
  }

  GetAll = async() =>
  {
      fetch('http://localhost:57254/api/Processors/?ShowAll=true' , {method:'get'})
      .then(response => response.json())
      .then(data => {
        this.setState({ list: data, loading: false});  
      });
  }

  GetWithPager = async() =>
  {
      fetch('http://localhost:57254/api/Processors' , {method:'get'})
      .then(response => response.json())
      .then(data => {
        this.setState({ listWithPager: data, loading: false});  
      });
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
        this.setState({ loading: false, newcontents: ProcessorListComponent.renderTablebyID(data)});  
        }
      });
    }
  }

  FetchPage = (pagestat) =>
  {
      this.setState({
        _activePage : pagestat
      })
      fetch('http://localhost:57254/api/Processors/?CurrentPage=' + pagestat , {method:'get'})
      .then(response => response.json())
      .then(data => {
        this.setState({ listWithPager: data, loading: false, newcontents: ProcessorListComponent.renderTable(data)});  
      });
  }

  Post = async() =>
  {
    await this.timeout(1000, fetch('http://localhost:57254/api/Processors' , {method:'POST', headers:{ 'Accept': 'application/json', 'Content-Type':'application/json'}, body:JSON.stringify(this.state)}))
    .then(response => response.json())
    .then(data =>{

    })
    .catch(error => console.error('Fetch Error =\n', error));
    this.GetAll();
    this.GetWithPager();
    this.PageStatus(this.state); 
  }

  async timeout(ms, promise) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject(new Error("timeout"))
      }, ms)
      promise.then(resolve, reject)
    })
  }

  

  static renderTable(list,page) {
    return (      
      <div>
      <Table className="responsive-table striped highlight">
        <thead>
          <tr>
            <th data-field="id">ID</th>
            <th data-field="name">Processor Name</th>
          </tr>
        </thead>
        <tbody>       
          {list.list.map(list =>
            <tr key={list.id}>
              <td>{list.id}</td>
              <td>{list.name}</td>
            </tr>
          )}
        </tbody>  
      </Table>
    </div>
    );
  }

  static renderTablebyID(list,page) {
    return (      
      <div>
      <Table className="responsive-table striped highlight">
        <thead>
          <tr>
            <th data-field="id">ID</th>
            <th data-field="name">Processor Name</th>
          </tr>
        </thead>
        <tbody>       
          <tr key={list.id}>
            <td>{list.id}</td>
            <td>{list.name}</td>
          </tr>
        </tbody>  
      </Table>
    </div>
    );
  }

  render() {
      
    let contents = this.state.loading
      ? <center><Col s={3}>
      <ProgressBar />
    </Col></center>
      : ''
      
    return (
      <div className="container">
        <h3>Processor List</h3>       

        <Row>
           <Input s={3} name="s_processorID" label="Processor ID" validate onChange={(event) => this.GetWithID(event)}><Icon>search</Icon></Input> 
        </Row> 

        {contents}
        {this.state.newcontents}

    <Modal
      actions={<Button onClick={this.Post} className="modal-close waves-effect waves-green btn-flat">Submit<Icon left>send</Icon></Button> }
      header='Add Processor'
      trigger={<Button>Add Processor</Button>}>

            <Row>
                <Input name="name" type="email" label="Processor" s={12} onChange={(event) => this.handleChange(event)}/>            
            </Row> 

    </Modal>

   <Pagination items={this.state.listWithPager.totalPage} activePage={this.state._activePage} maxButtons={this.state.listWithPager.totalPage} onSelect={this.FetchPage}/>
   
   <center>
      <Input id='testcheck' name='group1' type='checkbox' label='DisplayAll' onChange={(event) => this.TogglePage(event)}/>
   </center>

   <Button onClick={this.GetAll}>Get All</Button>

  </div>

    );
  }

}
