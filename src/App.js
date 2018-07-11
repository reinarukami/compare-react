import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import Footers from './components/footer/Footer';
import Home from './components/tutorial/Home';
import Contact from './components/tutorial/Contact';
import Tutorial from './components/tutorial/Tutorial';
import Form from './components/form/Form';
import {Route} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
          <Header />
          <br/>

          <Route exact = {true} path ="/" component={Form} />
          <Route path ="/home" component={Home} />
          <Route path ="/contact" component={Contact} />
          <Route path ="/tutorial" component={Tutorial} />

          <br/>
          <Footers />
      </div>
    );
  }
}

export default App;
