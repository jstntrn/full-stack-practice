import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {HashRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './ducks/store';
import routes from './routes';


class App extends Component {
  render() {
    return (
        <div className="App">
        <Provider store={store}>
          <div className='login-wrapper'>
            {/* <img className='App-logo' src={logo} alt='logo'/>  */}
            <Router>{routes}</Router>
          </div>
        </Provider>
        </div>
    );
  }
}

export default App;
