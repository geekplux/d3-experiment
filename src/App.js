import React, { Component } from 'react';
import './App.scss';
import Performance from './containers/Performance';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>D3 Experiment</h1>
        <div className="container">
          <Performance />
        </div>
      </div>
    );
  }
}

export default App;