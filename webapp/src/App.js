import React, { useState } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Dashboard from './container/Dashboard';
import contextPurchases from './context/contextPurchases';

function App() {
  const [location, setLocation] = useState('/dashboard');

  const contextValue = {
    location,
  };

  return (
    <div className="App">
      <contextPurchases.Provider value={contextValue}>
        <Route path="/" component={() => <Dashboard />} />
      </contextPurchases.Provider>
    </div>
  );
}

export default App;
