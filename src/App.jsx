import { hot } from 'react-hot-loader';
import React from 'react';
import Users from './users';
import './App.css';

const message = 'Welcome to docps-frontend this is agus';
const App = () => (
  <div className="App">
    <h1>{message}</h1>
    <Users />
  </div>
);

export default hot(module)(App);
