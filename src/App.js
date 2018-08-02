import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import Footers from './components/footer/Footer';
import Home from './components/tutorial/Home';
import Contact from './components/tutorial/Contact';
import Tutorial from './components/tutorial/Tutorial';
import Form from './components/tutorial/Form';
import FormSubmit from './components/tutorial/FormSubmit';
import ProcessorComponent from './components/ptech/ProcessorComponent';
import UserComponent from './components/ptech/UserComponent';
import ManufacturerComponent from './components/ptech/ManufacturerComponent';
import ModelComponent from './components/ptech/ModelComponent';
import SupplierComponent from './components/ptech/SupplierComponent';
import CategoriesComponent from './components/ptech/CategoriesComponent';
import HardDiskComponent from './components/ptech/HardDiskComponent';
import MemoryComponent from './components/ptech/MemoryComponent';
import VideoCardComponent from './components/ptech/VideoCardComponent';
import AssetComponent from './components/ptech/AssetComponent';
import AuthenticateComponent from './components/ptech/AuthenticateComponent';
import {Route} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
          <Header />
          <br/>

          <Route exact = {true} path ="/" component={AuthenticateComponent} />
          <Route path ="/home" component={Home} />
          <Route path ="/contact" component={Contact} />
          <Route path ="/tutorial" component={Tutorial} />
          <Route path ="/form" component={Form} />
          <Route path ="/form-submit" component={FormSubmit} />

          {/* Ptech Activity */}
          <Route path ="/ptech-users" component={UserComponent} />
          <Route path ="/ptech-processor" component={ProcessorComponent} />
          <Route path ="/ptech-manufacturer" component={ManufacturerComponent} />
          <Route path ="/ptech-model" component={ModelComponent} />
          <Route path ="/ptech-supplier" component={SupplierComponent} />
          <Route path ="/ptech-categories" component={CategoriesComponent} />
          <Route path ="/ptech-harddisk" component={HardDiskComponent} />
          <Route path ="/ptech-memory" component={MemoryComponent} />
          <Route path ="/ptech-videocard" component={VideoCardComponent} />
          <Route path ="/ptech-asset" component={AssetComponent} />

          <br/>
          <Footers />
      </div>
    );
  }
}

export default App;
