import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Dashboard from './container/Dashboard';
import Moment from 'react-moment';

function App() {
  return (
    <div className="App">
      <Route path="/" component={() => <Dashboard />} />
    </div>
  );
}

export default App;
