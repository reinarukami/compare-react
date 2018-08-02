import React from 'react'
import './Main.css';
import Common from './CommonComponent';
import {Pagination, Modal, Button, Row , Input , Icon} from 'react-materialize'

export default class AssetComponent extends Common  {

    constructor(props) 
    {
     
      super(props);
      this.state =  
      { 
        list: [], 
        listWithPager : [], 
        loading: true, 
        newcontents:'', 
        PagerClass:'',
        showAll:false, 
        activePage:1, 
        PageType:'Asset',
        link:'http://localhost:57254/api/Assets/',
        ManufacturerDropDown:'',
        ModelsDropDown:'',
        HardDiskDropDown:'',
        ProcessorDropDown:'',
        MemoryDropDown:'',
        VideoCardDropDown:'',
        SuppliersDropDown:'',
        CategoriesDropDown:'',
        s_keyword:'',
        selectAPI :
        {
            Manufacturer: 'http://localhost:57254/api/Manufacturers/',
            Models:'http://localhost:57254/api/Models/',
            HardDisk:'http://localhost:57254/api/Sizes/harddisk/',
            Memory:'http://localhost:57254/api/Sizes/memory/',
            VideoCard:'http://localhost:57254/api/Sizes/videocard/',
            Suppliers:'http://localhost:57254/api/Suppliers/',
            Processor:'http://localhost:57254/api/Processors/',
            Categories:'http://localhost:57254/api/Categories/'
        },
        postState : 
        {
            supplierId: '',
            modelId: '',
            processorId: '',
            memoryId: '',
            videoCardId: '',
            hardDiskId: '',
            manufacturerId: '',
            categoryId: '',
            serialNo: '',
            assetTag: '',
            battery: '',
            adapter: '',
            name: '',
            assignedTo: '',
            deliveryDate: '',
            poNo: '',
            drNo: '',
            siNo: '',
            macAddress: '',
            ipAddress: '',
            status: '',
            purchaseDate: '',
            purchaseCost: '',
            warranty: '',
            notes: ''
        }
      };

    }
    
    componentWillMount()
    {
      super.CheckSession();
    }

    componentDidMount()
    {   
      super.GetDropDown(this.state.selectAPI);
      super.GetWithPager();
    }

    handleChange = (event) =>
    {     
        this.state.postState[[event.target.name]] = event.target.value;   
    }

    showErrorModal = () => {

      // $('#ErrorModal').modal('open');
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
           <Input s={3} name="s_keyword" label='Keyword' validate onChange={(event) => this.GetWithKeyword(event)}><Icon>search</Icon></Input> 
        </Row> 

        {this.state.Message}
        {this.state.newcontents}
   
        <br/>

        <Modal
          actions={<Button onClick={(event) => this.Post()} className="modal-close waves-effect waves-green btn-flat">Submit<Icon left>send</Icon></Button> }
          header= {'Add '+this.state.PageType}
          trigger={<Button>Add {this.state.PageType}</Button>}>
         <Row>      
            <Input name="serialNo" s={6} label="Serial Number" onChange={(event) => this.handleChange(event)} />
            <Input name="assetTag" s={6} label="Asset Tag" onChange={(event) => this.handleChange(event)} />
            <Input name="battery" s={6} label="Battery" onChange={(event) => this.handleChange(event)} />
            <Input name="adapter" s={6} label="Adapter" onChange={(event) => this.handleChange(event)} />
            <Input name="name" s={6} label="Asset Name" onChange={(event) => this.handleChange(event)} />
            <Input name="assignedTo" s={6} label="Assigned To"  onChange={(event) => this.handleChange(event)} />     
            <Input name="poNo" s={6} label="PO No#" onChange={(event) => this.handleChange(event)} />
            <Input name="drNo" s={6} label="DR No#" onChange={(event) => this.handleChange(event)} />
            <Input name="siNo" s={6} label="SI NO#" onChange={(event) => this.handleChange(event)} />
            <Input name="macAddress" s={6} label="Mac Address" onChange={(event) => this.handleChange(event)} />
            <Input name="ipAddress" s={6} label="IP Address" onChange={(event) => this.handleChange(event)} />
            <Input name="purchaseCost" s={6} label="Purchase Cost" onChange={(event) => this.handleChange(event)} />
            <Input name="warranty" s={6} label="Warranty" onChange={(event) => this.handleChange(event)} />
            <Input name="notes" s={6} label="Notes"  onChange={(event) => this.handleChange(event)} />

            <Input name='purchaseDate' s={6} type='date' label="Purchase Date" onChange={(event) => this.handleChange(event)}  />
            <Input name='deliveryDate' s={6} type='date' label="Delivery Date" onChange={(event) => this.handleChange(event)}  />
            
            <Input name="status" s={6} type='select' label="Status" defaultValue='0' onChange={(event) => this.handleChange(event)}>
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

            <br/>
             <center>
                <Input type='checkbox' label='DisplayAll' onChange={(event) => super.TogglePage(event)}/>
            </center>

            <div className={this.state.PagerClass}>
                <Pagination items={this.state.listWithPager.totalPage} activePage={this.state._activePage} maxButtons={this.state.listWithPager.totalPage} onSelect={this.FetchPage}/>
            </div>
        </div>
      );
      
    }

  
}
