import React, { Component } from 'react';
import {Table, ProgressBar, Pagination, Modal, Button, Row , Input , Icon, Autocomplete, Col} from 'react-materialize'

export default class ProcessorListComponent extends Component {

  constructor(props) {

    super(props);
     this.state = { list: [], loading: true, newcontents:'', totalPage:''};

      this.GetToApi();
      this.contents = '';
      this.handleChange = this.handleChange.bind(this);
      this.PostToApi = this.PostToApi.bind(this);
  }

  handleChange(event)
  {     
    this.setState({
      [event.target.name] : event.target.value,
    });
  }

  GetToApi()
  {
      fetch('http://localhost:57254/api/Processors' , {method:'get'})
      .then(response => response.json())
      .then(data => {
        this.setState({ list: data, loading: false, newcontents: ProcessorListComponent.rederTable(data)});  
      });
  }

  FetchPage = (pagestat) =>
  {
      fetch('http://localhost:57254/api/Processors/?CurrentPage=' + pagestat , {method:'get'})
      .then(response => response.json())
      .then(data => {
        this.setState({ list: data, loading: false, newcontents: ProcessorListComponent.rederTable(data)});  
      });
  }

  FetchID = (event) => {
    fetch('http://localhost:57254/api/Processors/' + event.target.value , {method:'get'})
    .then(response => response.json())
    .then(data => {
      if(data.success != false)
      {
      this.setState({ list: data, loading: false, newcontents: ProcessorListComponent.rederTable(data)});  
      }
    });
  }

  async PostToApi()
  {
    await this.timeout(1000, fetch('http://localhost:57254/api/Processors' , {method:'POST', headers:{ 'Accept': 'application/json', 'Content-Type':'application/json'}, body:JSON.stringify(this.state)}))
    .then(response => response.json()).catch(error => console.error('Fetch Error =\n', error));
    this.GetToApi(); 
  }

  async timeout(ms, promise) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject(new Error("timeout"))
      }, ms)
      promise.then(resolve, reject)
    })
  }

  componentDidUpdate(prevProps) 
  {
    if (this.state.list !== prevProps.list) {
    
    }
  }

  static rederTable(list,page) {
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
           <Input s={3} label="Processor ID" validate onChange={(event) => this.FetchID(event)}><Icon>search</Icon></Input> 
        </Row> 

        {contents}
        {this.state.newcontents}

    <Modal
      actions={<Button onClick={this.PostToApi} className="modal-close waves-effect waves-green btn-flat">Submit<Icon left>send</Icon></Button> }
      header='Add Processor'
      trigger={<Button>Add Processor</Button>}>

            <Row>
                <Input name="name" type="email" label="Processor" s={12} onChange={(event) => this.handleChange(event)}/>            
            </Row> 

    </Modal>


   <Pagination items={this.state.list.totalPage} activePage={1} maxButtons={this.state.list.totalPage} onSelect={this.FetchPage}/>
   
   {this.state.activePage}

  </div>

    );
  }

}
