import React, { useState, useEffect } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Dashboard from './container/Dashboard';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const getCurrentUser = async () => {
    const response = await fetch('/api/whoami', {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });

    if (response.ok) {
      const _currentUser = await response.json();
      setCurrentUser(_currentUser);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div
      className="App"
      style={{
        backgroundColor: !currentUser && '#1652F0',
      }}
    >
      <Route path="/" component={() => <Dashboard />} />
    </div>
  );
}

export default App;
