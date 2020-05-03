import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, useHistory } from 'react-router-dom';
import Dashboard from './container/Dashboard';
import AuthenticationForm from './components/AuthenticationForm';
import contextUser from './context/contextUser';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(null);

  const getCurrentUser = async () => {
    const response = await fetch('/api/whoami', {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });

    if (response.ok) {
      const _currentUser = await response.json();
      setCurrentUser(_currentUser);
    } else {
      history.push('/authentication');
    }
  };

  const contextValue = {
    currentUser,
    setCurrentUser,
    getCurrentUser,
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div
      className="App"
      style={{
        height: '100vh',
        backgroundColor:
          history.location.pathname === '/authentication' && '#1652F0',
      }}
    >
      <contextUser.Provider value={contextValue}>
        {currentUser ? (
          <Route path="/" component={() => <Dashboard />} />
        ) : (
          <Route
            path="/authentication"
            component={() => (
              <AuthenticationForm onUserSignedIn={getCurrentUser} />
            )}
          />
        )}
      </contextUser.Provider>
    </div>
  );
}

export default App;
