import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import Footers from './components/footer/Footer';
import Form from './components/form/Form'

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header />
          <br/>
          <Form />
          <br/>
          <Footers />
      </div>
    );
  }
}

export default App;
