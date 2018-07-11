import React, { Component } from 'react';
import {Table, Row, Col, Preloader} from 'react-materialize'

export class Form extends Component {

  constructor(props) {

    super(props);
    this.state = { logs: [], loading: true };

    fetch('http://localhost:50596/Api/Logger/GetLogs?_deviceID=96D88A707C3CA2AB203348A64CC55CD41E800248')
      .then(response => response.json())
      .then(data => {
        this.setState({ logs: data, loading: false });
      });

  }

  static renderLogsTable(logs) {
    return (
      <Table className="responsive-table striped highlight">
        <thead>
          <tr>
            <th data-field="id">Machine ID</th>
            <th data-field="name">Logs</th>
            <th data-field="price">Date Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(logs =>
            <tr>
              <td>{logs.deviceID}</td>
              <td>{logs.logs}</td>
              <td>{logs.logdate}</td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <center>
          <Preloader flashing size='big'/>
        </center>
      : Form.renderLogsTable(this.state.logs);

    return (
      <div className="container">
        <h3>Api Logs</h3>
        {contents}
      </div>
    );
  }
}

export default Form;

