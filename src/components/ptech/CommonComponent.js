import React, { Component } from 'react'
import './Table.css';
import {Table, ProgressBar, Pagination, Modal, Button, Row , Input , Icon, option} from 'react-materialize'

export default class CommonComponent extends Component 
{
    constructor(props)
    {
      super(props);

      this.state =
      {
        ErrorMessage:'',
      }
      this.GetWithPager = this.GetWithPager.bind(this);
      this.GetAll = this.GetAll.bind(this);
      this.GetDropDown = this.GetDropDown.bind(this);
      this.TogglePage = this.TogglePage.bind(this);
      this.PageStatus = this.PageStatus.bind(this);
      this.renderTable = this.renderTable.bind(this);
    }


    MapErrorMessage = (Error) => 
    {
        if(Error.length != 0)
        {

          return (    

            Error.map(Msg =>
              <p key={Msg}>{Msg}</p>
             )

            );                     
        }
    }

    Post = () =>
    {
      fetch(this.state.link , {method:'POST', headers:{ 'Accept': 'application/json', 'Content-Type':'application/json'}, body:JSON.stringify(this.state.postState)})
      .then(response => response.json())
      .then(data =>{
        if(data.success == true)
        {
        this.PageStatus(this.state); 
          this.setState({
            ErrorMessage : <p>Success executed the operation</p>
          })
        }
        else
        {
          this.setState({
             ErrorMessage : this.MapErrorMessage(data.errorMessages),
             error:true
          })
         
        }
       
      })
      .catch(error => console.error('Fetch Error =\n', error));
    }

    GetWithID = (event) => 
    {
        if(event.target.value == '')
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

    GetWithKeyword = (event) => 
    {
        if(event.target.value == '')
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

    GetWithPager(callback)
    {
        // V2
        // fetch(this.state.link + '?CurrentPage=' + this.state.activePage  , {method:'get'})
        // .then(response => response.json())
        // .then(data => callback(data))
        
        fetch(this.state.link + '?CurrentPage=' + this.state.activePage  , {method:'get'})
        .then(response => response.json())
        .then(data => {
          // V2
          // return data;
          this.setState({ listWithPager: data, loading: false,  newcontents: this.renderTable(data)});  
        }).catch(error => {
          this.setState({loading: false , newcontents: 'No Record Found'})
       });
    
    }

    SetDropdownTemplate=(data, nameOf)=>{

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

    Put = (id) =>
    {
      this.state.postState.id = id;
      fetch(this.state.link + id , {method:'PUT', headers:{ 'Accept': 'application/json', 'Content-Type':'application/json'}, body:JSON.stringify(this.state.postState)})
      .then(response => response.json())
      .then(data =>{
        if(data.success == true)
        {
          this.setState({
            ErrorMessage : <p>Success executed the operation</p>
          })
          this.PageStatus(this.state); 
          delete this.state.postState.id;
        }
        else
        {
          this.setState({
             ErrorMessage : this.MapErrorMessage(data.errorMessages)
          })
          delete this.state.postState.id;
          this.showErrorModal();
         
        }
      })
      .catch(error => console.error('Fetch Error =\n', error));
    }

  

    renderTablebyID(list) 
    {

      var tablebody =[];
      var tablemodal;

      var tableheader = Object.keys(list).map(key =>           
        <th key={key}>{this.state.PageType} {key}</th>
      );

      tablebody = Object.values(list).map(value =>
          <td> {value} </td> 
      );     

 
      if(this.state.PageType == 'Asset')
      {

      tablemodal = 
        <td>   
             <Modal
                actions={<Button onClick={(event) => this.handleUpdate(list.id)} className="modal-close waves-effect waves-green btn-flat">Submit<Icon left>send</Icon></Button> }
                header={"Edit" + list.id}
                trigger={<Button className ='#f4ff81 lime accent-1' >Edit </Button>}>
                <Row>

               <form id ={"EditForm" + list.id}>

                  <Input name="serialNo" defaultValue={list.serialNo} s={6} label="serialNo"  />
                  <Input name="assetTag" defaultValue={list.assetTag} s={6} label="assetTag"   />
                  <Input name="battery" defaultValue={list.battery} s={6} label="battery"   />
                  <Input name="adapter" defaultValue={list.adapter} s={6} label="adapter"   />
                  <Input name="name" defaultValue={list.name} s={6} label="name" />
                  <Input name="assignedTo" defaultValue={list.assignedTo} s={6} label="assignedTo"  />     
                  <Input name="poNo" defaultValue={list.poNo} s={6} label="poNo"  />
                  <Input name="drNo" defaultValue={list.drNo} s={6} label="drNo"  />
                  <Input name="siNo" defaultValue={list.siNo} s={6} label="siNo"  />
                  <Input name="macAddress" defaultValue={list.macAddress} s={6} label="macAddress"   />
                  <Input name="ipAddress" defaultValue={list.ipAddress} s={6} label="ipAddress"  />
                  <Input name="purchaseCost" defaultValue={list.purchaseCost} s={6} label="purchaseCost" />
                  <Input name="warranty" defaultValue={list.warranty} s={6} label="warranty" />
                  <Input name="notes" defaultValue={list.notes} s={6} label="notes"  />
 
            
                  <Input name='purchaseDate' s={6} defaultValue={list.purchaseDate} type='date' label="purchaseDate" />
                  <Input name='deliveryDate' s={6} defaultValue={list.deliveryDate} type='date' label="deliveryDate"  />
             
                  <Input name="status" defaultValue={list.status} s={6} type='select' label="Status" defaultValue='0' >
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

              </form>


                </Row> 
            </Modal>
        </td>
      }
      else if(this.state.PageType == 'VideoCard' || this.state.PageType == 'Memory' || this.state.PageType == 'HardDisk')
      {
          tablemodal = <td>   
          <Modal
              actions={<Button onClick={(event) => this.handleUpdate(list.id)} className="modal-close waves-effect waves-green btn-flat">Submit<Icon left>send</Icon></Button> }
              header={"Edit Item:" + list.id}
              trigger={<Button className ='#f4ff81 lime accent-1' >Edit {this.state.PageType}</Button>}>
            <form id ={"EditForm" + list.id}>
              <Row>
                  <Input name="size" defaultValue={list.size} type="email" label={this.state.PageType} s={12} />                         
              </Row> 
            </form>
          </Modal>
        </td>
      }

      else
      {
        tablemodal = <td>   
        <Modal
            actions={<Button onClick={(event) => this.handleUpdate(list.id)} className="modal-close waves-effect waves-green btn-flat">Submit<Icon left>send</Icon></Button> }
            header={"Edit Item:" + list.id}
            trigger={<Button className ='#f4ff81 lime accent-1' >Edit {this.state.PageType}</Button>}>
          <form id ={"EditForm" + list.id}>
            <Row>
                <Input name="name" defaultValue={list.name} type="email" label={this.state.PageType} s={12} />                         
            </Row> 
          </form>
        </Modal>
      </td>

      }
        
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
                actions={<Button onClick={(event) => this.handleUpdate(list.id)} className="modal-close waves-effect waves-green btn-flat">Submit<Icon left>send</Icon></Button> }
                header={"Edit Item:" + list.id}
                trigger={<Button  className ='#f4ff81 lime accent-1' >Edit </Button>}>
                <Row>
                
                  <form id ={"EditForm" + list.id}>

                    <Input name="serialNo" defaultValue={list.serialNo} s={6} label="serialNo" />
                    <Input name="assetTag" defaultValue={list.assetTag} s={6} label="assetTag"  />
                    <Input name="battery" defaultValue={list.battery} s={6} label="battery"   />
                    <Input name="adapter" defaultValue={list.adapter} s={6} label="adapter"  />
                    <Input name="name" defaultValue={list.name} s={6} label="name"  />
                    <Input name="assignedTo" defaultValue={list.assignedTo} s={6} label="assignedTo"  />     
                    <Input name="poNo" defaultValue={list.poNo} s={6} label="poNo"  />
                    <Input name="drNo" defaultValue={list.drNo} s={6} label="drNo" />
                    <Input name="siNo" defaultValue={list.siNo} s={6} label="siNo"  />
                    <Input name="macAddress" defaultValue={list.macAddress} s={6} label="macAddress"   />
                    <Input name="ipAddress" defaultValue={list.ipAddress} s={6} label="ipAddress" />
                    <Input name="purchaseCost" defaultValue={list.purchaseCost} s={6} label="purchaseCost"  />
                    <Input name="warranty" defaultValue={list.warranty} s={6} label="warranty"  />
                    <Input name="notes" defaultValue={list.notes} s={6} label="notes"  />
                
                    <Input name='purchaseDate' s={6} defaultValue={list.purchaseDate} type='date' label="purchaseDate" />
                    <Input name='deliveryDate' s={6} defaultValue={list.deliveryDate} type='date' label="deliveryDate"  />
                         
                    <Input name="status" defaultValue={list.status} s={6} type='select' label="Status" defaultValue='0'>
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

                  </form>

                </Row> 
            </Modal>
          </td>
        );
      }
      
      else if(this.state.PageType == 'VideoCard' || this.state.PageType == 'Memory' || this.state.PageType == 'HardDisk')
      {
        tablemodal = list.list.map(list =>
          <td key={list.id}>   
            <Modal
                actions={<Button onClick={(event) => this.handleUpdate(list.id)} className="modal-close waves-effect waves-green btn-flat">Submit<Icon left>send</Icon></Button> }
                header={"Edit Item:" + list.id}
                trigger={<Button className ='#f4ff81 lime accent-1' >Edit {this.state.PageType}</Button>}>
              <form id ={"EditForm" + list.id}>
                <Row>
                    <Input name="size" defaultValue={list.size} type="email" label={this.state.PageType} s={12} />                         
                </Row> 
              </form>
            </Modal>
          </td>
        );
      }
      
      else
      {
        tablemodal = list.list.map(list =>
          <td key={list.id}>   
            <Modal
                actions={<Button onClick={(event) => this.handleUpdate(list.id)} className="modal-close waves-effect waves-green btn-flat">Submit<Icon left>send</Icon></Button> }
                header={"Edit Item:" + list.id}
                trigger={<Button className ='#f4ff81 lime accent-1' >Edit {this.state.PageType}</Button>}>
              <form id ={"EditForm" + list.id}>
                <Row>
                    <Input name="name" defaultValue={list.name} type="email" label={this.state.PageType} s={12} />                         
                </Row> 
              </form>
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
