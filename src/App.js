import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {HashRouter as Router} from 'react-router-dom';
import routes from './routes';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Router>
            {routes}
          </Router>
        </div>
    );
  }
}

export default App;
