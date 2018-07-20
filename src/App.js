import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import Footers from './components/footer/Footer';
import Home from './components/tutorial/Home';
import Contact from './components/tutorial/Contact';
import Tutorial from './components/tutorial/Tutorial';
import LogPage from './components/log/LogPage';
import Form from './components/tutorial/Form';
import FormSubmit from './components/tutorial/FormSubmit';
import ProcessorListComponent from './components/ptech/ProcessorListComponent';
import ProcessorPostComponent from './components/ptech/ProcessorPostComponent'
import {Route} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
          <Header />
          <br/>

          <Route exact = {true} path ="/" component={LogPage} />
          <Route path ="/home" component={Home} />
          <Route path ="/contact" component={Contact} />
          <Route path ="/tutorial" component={Tutorial} />
          <Route path ="/form" component={Form} />
          <Route path ="/form-submit" component={FormSubmit} />

          {/* Ptech Activity */}
          <Route path ="/ptech-processor-get" component={ProcessorListComponent} />
          <Route path ="/ptech-processor-post" component={ProcessorPostComponent} />

          <br/>
          <Footers />
      </div>
    );
  }
}

export default App;
