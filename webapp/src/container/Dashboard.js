import React, { useEffect, useState, useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import CardWallet from '../components/Card';
import LastAction from '../components/LastActionCard';
import FormAddAction from '../components/FormAddAction';
import Purchases from '../components/Purchases';
import Prices from '../components/Prices';
import News from '../components/News';
import contextUser from '../context/contextUser';

import AppLayout from '../styles/AppLayout';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.min.css';
import { Grid } from 'semantic-ui-react';

function Dashboard() {
  const [items, setItems] = useState([]);
  const [articles, setArticles] = useState();

  const orderItems = [];
  const articleItems = [];
  const listItems = [];
  const history = useHistory();
  const { currentUser } = useContext(contextUser);

  useEffect(() => {
    history.location.pathname === '/accueil' && getNewsArticles();
    if (history.location.pathname === '/portefeuille') {
      !currentUser.coinbaseUser
        ? getPurchases(currentUser.id)
        : getCoinbaseTransactions(currentUser.id);
    } else if (history.location.pathname === '/') {
      history.push('/accueil');
    }
    window.scrollTo(0, 0);
  }, []);

  const getPurchases = async (id) => {
    const response = await axios.get(`/api/purchases/${id}/list`);
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

  const getCoinbaseTransactions = async (id) => {};

  const getNewsArticles = async () => {
    const news = await axios.get(`/api/newsArticles`);
    news.data.response.Data.map((item) => {
      articleItems.push(item);
    });
    setArticles(articleItems);
  };

  return (
    <div className='Dashboard'>
      <AppLayout>
        <div id='wrapper' style={{ marginTop: '90px', paddingBottom: '30px' }}>
          <Navbar />
          <ToastContainer position='top-center' />
          <Route path='/accueil' component={() => <CardWallet />} />
          <Route path='/portefeuille' component={() => <CardWallet />} />
          <Route path='/accueil' component={() => <LastAction />} />
          <Route
            path='/accueil'
            component={() => (
              <div style={{ textAlign: 'left' }}>
                {articles && <News articles={articles} />}
              </div>
            )}
          />
          <Grid centered>
            <Grid.Row>
              {!currentUser.coinbaseUser && (
                <Grid.Column
                  mobile={16}
                  tablet={items.length > 0 ? 6 : 8}
                  computer={items.length > 0 ? 4 : 8}
                >
                  <Route
                    path='/portefeuille'
                    component={() => (
                      <FormAddAction
                        onSubmitForm={() => {
                          getPurchases(currentUser.id);
                        }}
                      />
                    )}
                  />
                </Grid.Column>
              )}
              <Grid.Column mobile={16} tablet={10} computer={12}>
                <Route
                  path='/portefeuille'
                  component={() => (
                    <div>
                      {items &&
                        items.map((category) => (
                          <Purchases key={category.name} category={category} />
                        ))}
                    </div>
                  )}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Route path='/prix' component={() => <Prices />} />
        </div>
      </AppLayout>
    </div>
  );
}

export default Dashboard;
