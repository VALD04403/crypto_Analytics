import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, useHistory } from 'react-router-dom';
import Dashboard from './container/Dashboard';
import AuthenticationForm from './components/AuthenticationForm';
import contextUser from './context/contextUser';
import SubscribeForm from './components/SubscribeForm';
import RecaptchaComponent from './components/Recaptcha';
import { loadReCaptcha } from 'react-recaptcha-google';
import Cookies from 'universal-cookie';
import axios from 'axios';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(null);

  const clientId = process.env.REACT_APP_COINBASE_CLIENT_ID;
  const secretClientId = process.env.REACT_APP_COINBASE_SECRET_CLIENT;

  const getCurrentUser = async () => {
    const cookies = new Cookies();
    const coinbaseUser = cookies.get('coinbaseUser');
    const coinbaseToken = cookies.get('coinbaseToken');
    if (coinbaseUser) {
      if (
        Math.round(+new Date() / 1000) - coinbaseToken.created_at >
        coinbaseToken.expires_in
      ) {
        const newToken = await axios.post(`/api/coinbase/token`, {
          info: {
            grant_type: 'refresh_token',
            client_id: clientId,
            client_secret: secretClientId,
            refresh_token: coinbaseToken.refresh_token,
          },
        });
        cookies.set('coinbaseToken', newToken, {
          sameSite: true,
        });
      }
      setCurrentUser({
        id: coinbaseUser.id,
        username: coinbaseUser.user,
        coinbaseUser: true,
      });
    } else {
      const response = await fetch('/api/whoami');
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
          <div>
            <Route path='/' component={() => <Dashboard />} />
          </div>
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
