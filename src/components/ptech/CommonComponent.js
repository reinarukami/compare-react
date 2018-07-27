import React, { Component } from 'react'
import './Table.css';
import {Table, ProgressBar, Pagination, Modal, Button, Row , Input , Icon, option} from 'react-materialize'

export default class CommonComponent extends Component 
{
    constructor(props)
    {
      super(props);
      this.GetWithPager = this.GetWithPager.bind(this);
      this.GetAll = this.GetAll.bind(this);
      this.GetDropDown = this.GetDropDown.bind(this);
      this.TogglePage = this.TogglePage.bind(this);
      this.PageStatus = this.PageStatus.bind(this);
      this.renderTable = this.renderTable.bind(this);
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
        fetch(this.state.link + event.target.value , {method:'get'})
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
        }).catch(error => {
          this.setState({loading: false , newcontents: 'No Record Found'})
       });
    }

    SetDropdownTemplate=(data, nameOf, Method)=>{

      var accesskey = Object.keys(data.list[0]);

      if(accesskey[1] == "name")
      {
        return (    
          <Input s={6} name={nameOf} type='select' defaultValue='0' label={nameOf} onChange={(event) => this.handleChange(event)}>   
                <option value='0'></option>   
              {data.list.map(table =>
                <option value={table.id}>{table.name}</option>
              )}
          </Input>
        );
      }

      else
      {
        return (    
          <Input s={6} name={nameOf} type='select' defaultValue='0' label={nameOf} onChange={(event) => this.handleChange(event)}>      
                <option value='0'></option>   
              {data.list.map(table =>
                <option value={table.id}>{table.size}</option>
              )}
          </Input>
        );
      }
    }

    GetDropDown(apilinks)
    {
      
     fetch(apilinks.Manufacturer + '?ShowAll=true' , {method:'get'})
      .then(response => response.json())
      .then(data => {
          this.setState({ ManufacturerDropDown: this.SetDropdownTemplate(data, 'manufacturerId'), loading: false});  
      }).catch(error => {
        this.setState({loading: false , newcontents: 'No Record Found'})
      });
      
      fetch(apilinks.Models + '?ShowAll=true' , {method:'get'})
      .then(response => response.json())
      .then(data => {
          this.setState({ ModelsDropDown: this.SetDropdownTemplate(data, 'modelId'), loading: false});  
      }).catch(error => {
        this.setState({loading: false , newcontents: 'No Record Found'})
      });

      fetch(apilinks.HardDisk + '?ShowAll=true' , {method:'get'})
      .then(response => response.json())
      .then(data => {
          this.setState({ HardDiskDropDown: this.SetDropdownTemplate(data, 'hardDiskId'), loading: false});  
      }).catch(error => {
        this.setState({loading: false , newcontents: 'No Record Found'})
      });

      fetch(apilinks.Processor + '?ShowAll=true' , {method:'get'})
      .then(response => response.json())
      .then(data => {
          this.setState({ ProcessorDropDown: this.SetDropdownTemplate(data,'processorId'), loading: false});  
      }).catch(error => {
        this.setState({loading: false , newcontents: 'No Record Found'})
      });

      fetch(apilinks.Memory + '?ShowAll=true' , {method:'get'})
      .then(response => response.json())
      .then(data => {
          this.setState({ MemoryDropDown: this.SetDropdownTemplate(data, 'memoryId'), loading: false});  
      }).catch(error => {
        this.setState({loading: false , newcontents: 'No Record Found'})
      });

      fetch(apilinks.VideoCard + '?ShowAll=true' , {method:'get'})
      .then(response => response.json())
      .then(data => {
          this.setState({ VideoCardDropDown: this.SetDropdownTemplate(data, 'videoCardId'), loading: false});  
      }).catch(error => {
        this.setState({loading: false , newcontents: 'No Record Found'})
      });

      fetch(apilinks.Suppliers + '?ShowAll=true' , {method:'get'})
      .then(response => response.json())
      .then(data => {
          this.setState({ SuppliersDropDown: this.SetDropdownTemplate(data , 'supplierId'), loading: false});  
      }).catch(error => {
        this.setState({loading: false , newcontents: 'No Record Found'})
      });

      fetch(apilinks.Categories + '?ShowAll=true' , {method:'get'})
      .then(response => response.json())
      .then(data => {
          this.setState({ CategoriesDropDown: this.SetDropdownTemplate(data, 'categoryId'), loading: false});  
      }).catch(error => {
        this.setState({loading: false , newcontents: 'No Record Found'})
      });

    }

    GetAll()
    {
        fetch(this.state.link + '?ShowAll=true' , {method:'get'})
        .then(response => response.json())
        .then(data => {
            this.setState({ list: data, loading: false , newcontents: this.renderTable(data, this)});  
        }).catch(error => {
          this.setState({loading: false , newcontents: 'No Record Found'})
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
      fetch(this.state.link + this.state.putState.id , {method:'PUT', headers:{ 'Accept': 'application/json', 'Content-Type':'application/json'}, body:JSON.stringify(this.state.postState)})
      .then(response => response.json())
      .then(data =>{
        this.PageStatus(this.state); 
      })
      .catch(error => console.error('Fetch Error =\n', error));
    }

    SetID = (id) =>
    {
      this.state.putState.id = id;
    }
  

    renderTablebyID(list) 
    {

      var tablebody =[];

      var tableheader = Object.keys(list).map(key =>           
        <th key={key}>{this.state.PageType} {key}</th>
      );

      tablebody = Object.values(list).map(value =>
          <td> {value} </td> 
      );     

      var tablemodal = 
        <td>   
             <Modal
                actions={<Button onClick={(event) => this.Put(list.id)} className="modal-close waves-effect waves-green btn-flat">Submit<Icon left>send</Icon></Button> }
                header={"Edit" + list.id}
                trigger={<Button onClick={(event) => this.SetId(list.id)} className ='#f4ff81 lime accent-1' >Edit {this.state.PageType}</Button>}>
                <Row>

                  <Input name="serialNo" s={6} label="serialNo" onChange={(event) => this.handleChange(event)} />
                  <Input name="assetTag" s={6} label="assetTag" onChange={(event) => this.handleUpdateChange(list.id,event)}  />
                  <Input name="battery" s={6} label="battery" onChange={(event) => this.handleUpdateChange(list.id,event)}  />
                  <Input name="adapter" s={6} label="adapter" onChange={(event) => this.handleUpdateChange(list.id,event)}  />
                  <Input name="name" s={6} label="name" onChange={(event) => this.handleUpdateChange(list.id,event)} />
                  <Input name="assignedTo" s={6} label="assignedTo"onChange={(event) => this.handleUpdateChange(list.id,event)}  />     
                  <Input name="poNo" s={6} label="poNo" onChange={(event) => this.handleUpdateChange(list.id,event)} />
                  <Input name="drNo" s={6} label="drNo" onChange={(event) => this.handleUpdateChange(list.id,event)} />
                  <Input name="siNo" s={6} label="siNo" onChange={(event) => this.handleUpdateChange(list.id,event)} />
                  <Input name="macAddress" s={6} label="macAddress" onChange={(event) => this.handleUpdateChange(list.id,event)}  />
                  <Input name="ipAddress" s={6} label="ipAddress" onChange={(event) => this.handleUpdateChange(list.id,event)} />
                  <Input name="purchaseCost" s={6} label="purchaseCost" onChange={(event) => this.handleUpdateChange(list.id,event)} />
                  <Input name="warranty" s={6} label="warranty" onChange={(event) => this.handleUpdateChange(list.id,event)} />
                  <Input name="notes" s={6} label="notes" onChange={(event) => this.handleUpdateChange(list.id,event)} />

                  <Input name="purchaseDate" s={6} label="purchaseDate" onChange={(event) => this.handleUpdateChange(list.id,event)} />
                  <Input name="deliveryDate" s={6} label="deliveryDate" onChange={(event) => this.handleUpdateChange(list.id,event)} />
                        
                  <Input name="status" s={6} type='select' label="Status" defaultValue='0'>
                      <option value='0'></option>
                      <option value='1'>Available</option>
                      <option value='2'>Not Available</option>
                  </Input>

                  {this.state.ManufacturerDropDown}
                  {this.state.ModelsDropDown}
                  {this.state.HardDiskDropDown}
                  {this.state.ProcessorDropDown}
                  {this.state.MemoryDropDown}
                  {this.state.VideoCardDropDown}
                  {this.state.SuppliersDropDown}
                  {this.state.CategoriesDropDown}

                </Row> 
            </Modal>
        </td>
        
      tablebody.push(tablemodal);

      return (      
        <div className="Table-Scroll">
        <Table className="responsive-table striped highlight centered Table-Padding ">
          <thead>
             {tableheader}
          </thead>
          <tbody>    
            <tr>
            {tablebody.map(table =>
                <td>{table}</td>
            )}
            </tr>


            
          </tbody>  
        </Table>
      </div>
      );
    }

    renderTable(list)
    {

      var tablebody =[];
      var tablemodal =[];
      var tableheader = Object.keys(list.list[0]).map(key =>           
        <th key={key} data-field={list}>{this.state.PageType} {key}</th>
      );

      for(var count = 0; count < list.list.length; count++){ 

        tablebody[count] = Object.values(list.list[count]).map(value =>
           <td> {value} </td> 
        );               
      }

      if(this.state.PageType == 'Asset')
      {
        tablemodal = list.list.map(list =>
          <td key={list.id}>   
            <Modal
                actions={<Button onClick={(event) => this.Put()} className="modal-close waves-effect waves-green btn-flat">Submit<Icon left>send</Icon></Button> }
                header={"Edit" + list.id}
                trigger={<Button className ='#f4ff81 lime accent-1' >Edit {this.state.PageType}</Button>}>
                <Row>

                  <Input name="serialNo" s={6} label="serialNo" onChange={(event) => this.handleChange(event)} />
                  <Input name="assetTag" s={6} label="assetTag" onChange={(event) => this.handleUpdateChange(list.id,event)}  />
                  <Input name="battery" s={6} label="battery" onChange={(event) => this.handleUpdateChange(list.id,event)}  />
                  <Input name="adapter" s={6} label="adapter" onChange={(event) => this.handleUpdateChange(list.id,event)}  />
                  <Input name="name" s={6} label="name" onChange={(event) => this.handleUpdateChange(list.id,event)} />
                  <Input name="assignedTo" s={6} label="assignedTo"onChange={(event) => this.handleUpdateChange(list.id,event)}  />     
                  <Input name="poNo" s={6} label="poNo" onChange={(event) => this.handleUpdateChange(list.id,event)} />
                  <Input name="drNo" s={6} label="drNo" onChange={(event) => this.handleUpdateChange(list.id,event)} />
                  <Input name="siNo" s={6} label="siNo" onChange={(event) => this.handleUpdateChange(list.id,event)} />
                  <Input name="macAddress" s={6} label="macAddress" onChange={(event) => this.handleUpdateChange(list.id,event)}  />
                  <Input name="ipAddress" s={6} label="ipAddress" onChange={(event) => this.handleUpdateChange(list.id,event)} />
                  <Input name="purchaseCost" s={6} label="purchaseCost" onChange={(event) => this.handleUpdateChange(list.id,event)} />
                  <Input name="warranty" s={6} label="warranty" onChange={(event) => this.handleUpdateChange(list.id,event)} />
                  <Input name="notes" s={6} label="notes" onChange={(event) => this.handleUpdateChange(list.id,event)} />

                  <Input name="purchaseDate" s={6} label="purchaseDate" onChange={(event) => this.handleUpdateChange(list.id,event)} />
                  <Input name="deliveryDate" s={6} label="deliveryDate" onChange={(event) => this.handleUpdateChange(list.id,event)} />
                        
                  <Input name="status" s={6} type='select' label="Status" defaultValue='0'>
                      <option value='0'></option>
                      <option value='1'>Available</option>
                      <option value='2'>Not Available</option>
                  </Input>

                  {this.state.ManufacturerDropDown}
                  {this.state.ModelsDropDown}
                  {this.state.HardDiskDropDown}
                  {this.state.ProcessorDropDown}
                  {this.state.MemoryDropDown}
                  {this.state.VideoCardDropDown}
                  {this.state.SuppliersDropDown}
                  {this.state.CategoriesDropDown}

                </Row> 
            </Modal>
          </td>
        );
      }
      
      else
      {
        tablemodal = list.list.map(list =>
          <td key={list.id}>   
            <Modal
                actions={<Button onClick={(event) => this.Put()} className="modal-close waves-effect waves-green btn-flat">Submit<Icon left>send</Icon></Button> }
                header={"Edit" + list.id}
                trigger={<Button className ='#f4ff81 lime accent-1' >Edit {this.state.PageType}</Button>}>
                <Row>
                    <Input name="name" type="email" label={this.state.PageType} s={12} onChange={(event) => this.handleUpdateChange(event,list.id)}/>                         
                </Row> 
            </Modal>
          </td>
        );
      }

      for(var count = 0; count < tablebody.length; count++)
      {
        tablebody[count].push(tablemodal[count]);
      }
      
      return (      
        <div className="Table-Scroll">
        <Table className="responsive-table striped highlight centered">
          <thead>
            <tr> 
               {tableheader}
            </tr>
          </thead>
          <tbody>   

            {tablebody.map(table =>
              <tr>{table}</tr>
            )}

          </tbody>  
        </Table>
        
      </div>
      );
    }

}
