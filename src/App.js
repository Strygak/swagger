import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {client: '', version: '', key: '', value: ''}
    this.createClient = this.createClient.bind(this);
    this.clientData = this.clientData.bind(this);
    this.getClient = this.getClient.bind(this);
  }

  clientData(event) {
    const target = event.target;
    const name = target.name;

    this.setState({[name]: event.target.value});
  }

  createClient(event) {
    axios.post('/config', {
      client: this.state.client,
      version: this.state.version,
      key: this.state.key,
      value: this.state.value
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
    event.preventDefault();
  }

  getClient(event) {
    axios.get('/config/' + this.state.client + '/' + this.state.version, {
    })
    .then(function(response) {
      console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Client App management</h1>
        </header>

        <p className="App-intro">
          <form onSubmit={this.createClient}>
            <p>
              <label>
                Identifier for the client. E.g. "ios":
                <input type="text" name="client" onChange={this.clientData} required />
              </label>
            </p>
            <p>
              <label>
                Build version of the client. E.g. "267":
                <input type="text" name="version" onChange={this.clientData} required />
              </label>
            </p>
            <p>
              <label>
                Key:
                <input type="text" name="key" onChange={this.clientData} required />
              </label>
            </p>
            <p>
              <label>
                Value:
                <input type="text" name="value" onChange={this.clientData} required />
              </label>
            </p>
            <input type="submit" value="Submit" />
          </form>

          <form onSubmit={this.getClient}>
            <label>
              Client:
              <input type="text" name="client" onChange={this.clientData} required />
            </label>
            <label>
              Version:
              <input type="text" name="version" onChange={this.clientData} required />
            </label>

            <input type="submit" value="Get Client" />
          </form>
        </p>
      </div>
    );
  }
}

export default App;
