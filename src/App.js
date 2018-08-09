import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { DataStore } from 'js-data';
import { HttpAdapter } from 'js-data-http';

const store = new DataStore();
const httpAdapter = new HttpAdapter();

// "store" will now use an HTTP adapter by default
store.registerAdapter('http', httpAdapter, { 'default': true });

// Define a Mapper for a "user" resource
store.defineMapper('user');

const runDemo = async function () {
  // GET /user/1
  let user = await store.find('user', 1);
  console.log(user); // { id: 1, name: 'John' }

  // The user record is now in the in-memory store
  console.log(store.get('user', user.id)); // { id: 1, name: 'John' }
  console.log(user === store.get('user', user.id)); // true

  // PUT /user/1 {name:"Johnny"}
  user = await store.update('user', user.id, { name: 'Johnny' });

  // The user record has been updated, and the change synced to the in-memory store
  console.log(store.get('user', user.id)); // { id: 1, name: 'Johnny' }
  console.log(user === store.get('user', user.id)); // true

  // DELETE /user/1
  await store.destroy('user', user.id);
  
  // The user record no longer in the in-memory store
  console.log(store.get('user', 1)); // undefined
};

window.store = store

window.runDemo = runDemo

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
