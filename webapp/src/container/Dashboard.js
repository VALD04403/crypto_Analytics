import React, { useEffect, useState, useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import CardWallet from '../components/Card';
import LastAction from '../components/LastActionCard';
import FormAddAction from '../components/FormAddAction';
import Purchases from '../components/Purchases';
import Prices from '../components/Prices';
import contextUser from '../context/contextUser';

import AppLayout from '../styles/AppLayout';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.min.css';

function Dashboard() {
  const [items, setItems] = useState();

  const orderItems = [];
  const listItems = [];
  const history = useHistory();
  const { currentUser } = useContext(contextUser);

  useEffect(() => {
    if (history.location.pathname === '/portefeuille') {
      getPurchases(currentUser.id);
    } else if (history.location.pathname === '/') {
      history.push('/accueil');
    }
    window.scrollTo(0, 0);
  }, []);

  const getPurchases = async (id) => {
    const response = await axios.get(`/api/purchases/${id}`);
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

  return (
    <div className="Dashboard">
      <AppLayout>
        <div id="wrapper" style={{ marginTop: '90px', paddingBottom: '30px' }}>
          <div>
            <Navbar></Navbar>
            <ToastContainer position="top-center" />
            <Route path="/accueil" component={() => <CardWallet />} />
            <Route path="/accueil" component={() => <LastAction />} />
            <Route path="/portefeuille" component={() => <FormAddAction />} />
            <Route
              path="/portefeuille"
              component={() => (
                <div>
                  {items &&
                    items.map((category) => (
                      <Purchases key={category.name} category={category} />
                    ))}
                </div>
              )}
            />
            <Route path="/prix" component={() => <Prices />} />
          </div>
        </div>
      </AppLayout>
    </div>
  );
}

export default Dashboard;
