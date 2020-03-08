import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import CardWallet from '../components/Card';
import LastAction from '../components/LastActionCard';
import FormAddAction from '../components/FormAddAction';
import Purchases from '../components/Purchases';
import AppLayout from '../styles/AppLayout';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.min.css';

function Dashboard() {
  const [items, setItems] = useState();
  const orderItems = [];
  const listItems = [];
  let location = useLocation();

  useEffect(() => {
    if (location.pathname === '/wallet') {
      getPurchases();
    }
  }, []);

  if (location.pathname === '/') {
    return <Redirect to="/dashboard" />;
  }

  const getPurchases = async () => {
    const response = await axios.get('/api/purchases');
    response.data.purchases.map(item => {
      if (listItems.indexOf(item.coin_name) === -1) {
        const coin = {
          name: item.coin_name,
          purchases: []
        };
        orderItems.push(coin);
        listItems.push(item.coin_name);
      }
      orderItems.map(purchase => {
        if (purchase.name === item.coin_name) {
          purchase.purchases.push(item);
        }
      });
    });
    setItems(orderItems);
  };

  return (
    <div className="Dashboard">
      <AppLayout>
        <Navbar></Navbar>
        <div id="wrapper" style={{ marginTop: '90px' }}>
          <ToastContainer position="top-center" />
          <Route path="/dashboard" component={() => <CardWallet />} />
          <Route path="/dashboard" component={() => <LastAction />} />
          <Route path="/wallet" component={() => <FormAddAction />} />

          <Route
            path="/wallet"
            component={() => (
              <div>
                {items &&
                  items.map(category => (
                    <Purchases key={category.name} category={category} />
                  ))}
              </div>
            )}
          />
        </div>
      </AppLayout>
    </div>
  );
}

export default Dashboard;
