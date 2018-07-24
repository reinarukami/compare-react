import React, { Component } from 'react'

export default class CommonComponent extends Component {

    handleChange = (event) =>
    {     
      this.setState({
        [event.target.name] : event.target.value,
      });
    }
  
    PageStatus = async(state) => 
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
  
    TogglePage = (event) =>
    { 
       this.state.showAll = event.target.checked;
       this.PageStatus(this.state, this.ShowAll);
    }
  
    GetAll = () =>
    {
        fetch('http://localhost:57254/api/Processors/?ShowAll=true' , {method:'get'})
        .then(response => response.json())
        .then(data => {
          this.setState({ list: data, loading: false , newcontents: ProcessorListComponent.renderTable(data)});  
        });
    }
  
    GetWithPager = (_activePage) => 
    {
        fetch('http://localhost:57254/api/Processors?CurrentPage=' + _activePage  , {method:'get'})
        .then(response => response.json())
        .then(data => {
          this.setState({ listWithPager: data, loading: false,  newcontents: ProcessorListComponent.renderTable(data)});  
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
  
    Post = () =>
    {
      fetch('http://localhost:57254/api/Processors' , {method:'POST', headers:{ 'Accept': 'application/json', 'Content-Type':'application/json'}, body:JSON.stringify(this.state)})
      .then(response => response.json())
      .then(data =>{
        this.PageStatus(this.state); 
      })
      .catch(error => console.error('Fetch Error =\n', error));
    }
}
