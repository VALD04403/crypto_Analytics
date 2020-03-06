import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Dashboard from './container/Dashboard';
import contextPurchases from './context/contextPurchases';

function App() {
  // const contextValue = {
  //   shouldRefecthPurchases
  // };

  return (
    <div className="App">
      <contextPurchases.Provider>
        <Route path="/" component={() => <Dashboard />} />
      </contextPurchases.Provider>
    </div>
  );
}

export default App;
