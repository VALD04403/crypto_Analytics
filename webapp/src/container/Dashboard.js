import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import CardWallet from '../components/Card';
import LastAction from '../components/LastActionCard';
import FormAddAction from '../components/FormAddAction';
import Purchases from '../components/Purchases';
import Prices from '../components/Prices';
import AuthenticationForm from '../components/AuthenticationForm';
import AppLayout from '../styles/AppLayout';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.min.css';

function Dashboard() {
  const [items, setItems] = useState();
  const [currentUser, setCurrentUser] = useState(null);

  const orderItems = [];
  const listItems = [];
  const history = useHistory();

  useEffect(() => {
    getCurrentUser();
    if (history.location.pathname === '/wallet') {
      getPurchases();
    } else if (history.location.pathname === '/') {
      history.push('/home');
    }
  }, []);

  const getPurchases = async () => {
    const response = await axios.get('/api/purchases');
    response.data.purchases.map((item) => {
      if (listItems.indexOf(item.coin_name) === -1) {
        const coin = {
          name: item.coin_name,
          purchases: [],
        };
        orderItems.push(coin);
        listItems.push(item.coin_name);
      }
      orderItems.map((purchase) => {
        if (purchase.name === item.coin_name) {
          purchase.purchases.push(item);
        }
      });
    });
    setItems(orderItems);
  };

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

  return (
    <div className="Dashboard">
      <AppLayout>
        <div id="wrapper" style={{ marginTop: '90px' }}>
          {currentUser ? (
            <div>
              <Navbar></Navbar>
              <ToastContainer position="top-center" />
              <Route path="/home" component={() => <CardWallet />} />
              <Route path="/home" component={() => <LastAction />} />
              <Route path="/wallet" component={() => <FormAddAction />} />
              <Route
                path="/wallet"
                component={() => (
                  <div>
                    {items &&
                      items.map((category) => (
                        <Purchases key={category.name} category={category} />
                      ))}
                  </div>
                )}
              />
              <Route path="/price" component={() => <Prices />} />
            </div>
          ) : (
            <Route
              path="/authentication"
              component={() => (
                <AuthenticationForm onUserSignedIn={getCurrentUser} />
              )}
            />
          )}
        </div>
      </AppLayout>
    </div>
  );
}

export default Dashboard;
