import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, useHistory } from 'react-router-dom';
import Dashboard from './container/Dashboard';
import AuthenticationForm from './components/AuthenticationForm';
import contextUser from './context/contextUser';
import SubscribeForm from './components/SubscribeForm';
import RecaptchaComponent from './components/Recaptcha';
import { loadReCaptcha } from 'react-recaptcha-google';

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
    } else if (
      history.location.pathname !== '/authentication' &&
      history.location.pathname !== '/subscribe'
    ) {
      history.push('/authentication');
    }
    if (history.location.pathname === '/authentication' && response.ok) {
      history.push('/accueil');
    }
  };

  const contextValue = {
    currentUser,
    setCurrentUser,
    getCurrentUser,
  };

  useEffect(() => {
    loadReCaptcha();
    getCurrentUser();
  }, []);

  return (
    <div
      className='App'
      style={{
        height: '100vh',
        backgroundColor:
          (history.location.pathname === '/authentication' ||
            history.location.pathname === '/subscribe') &&
          '#1652F0',
      }}
    >
      <contextUser.Provider value={contextValue}>
        <RecaptchaComponent />
        {currentUser ? (
          <Route path='/' component={() => <Dashboard />} />
        ) : history.location.pathname === '/authentication' ? (
          <Route
            path='/authentication'
            component={() => (
              <AuthenticationForm onUserSignedIn={getCurrentUser} />
            )}
          />
        ) : (
          <Route
            path='/subscribe'
            component={() => <SubscribeForm onUserSignedIn={getCurrentUser} />}
          />
        )}
      </contextUser.Provider>
    </div>
  );
}

export default App;
