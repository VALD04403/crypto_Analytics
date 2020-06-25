import React, { useEffect, useState, useContext, Fragment } from 'react';
import {
  Card,
  Grid,
  Header,
  Divider,
  Dimmer,
  Loader,
  Button,
  Icon,
} from 'semantic-ui-react';
import contextUser from '../context/contextUser';
import { Link } from 'react-router-dom';

function CardWallet() {
  let totalSpend = 0;
  const [walletValue, setWalletValue] = useState();
  const [percent, setPercent] = useState();
  const [differenceValue, setDifferenceValue] = useState();
  const [total, setTotal] = useState();
  const [fees, setFees] = useState();
  const [totalWithFees, setTotalWithFees] = useState();
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  const { currentUser } = useContext(contextUser);

  const getGeneralData = async () => {
    const data = await fetch(`/api/user/${currentUser.id}/info`);
    await data.json().then((res) => {
      if (res.data.length > 0) {
        res.data.map((info) => {
          setTotal(Number(info.total_invest).toFixed(2));
          setFees(Number(info.total_fees).toFixed(2));
          setTotalWithFees(
            (Number(info.total_invest) + Number(info.total_fees)).toFixed(2)
          );
          return (totalSpend =
            Number(info.total_invest) + Number(info.total_fees));
        });
      } else {
        setNoData(true);
      }
    });
  };

  const getTotalValueWallet = async (id) => {
    const orderItems = [];
    const listItems = [];
    const totalAmountByCoin = [];
    const total = [];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const purchases = await fetch(`/api/purchases/${id}/list`);
    purchases.json().then((res) => {
      if (res.purchases.length > 0) {
        res.purchases.map((item) => {
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
      }
      if (orderItems.length > 0) {
        orderItems.map((item) => {
          const amount = item.purchases.reduce(function (res, item) {
            return res + parseFloat(item.amount_coin);
          }, 0);
          totalAmountByCoin.push({ name: item.name, amount: amount });
        });

        const getTotalValue = totalAmountByCoin.map(async (item) => {
          const value = await fetch(`/api/value/${item.name}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
          });
          return await value.json().then((res) => {
            total.push(res.response * item.amount);
          });
        });

        Promise.all(getTotalValue).then(() => {
          setWalletValue(total.reduce(reducer));
          const calculPercent = (totalSpend * 100) / total.reduce(reducer);
          setPercent((100 - Number(calculPercent)).toFixed(2));
          setDifferenceValue((total.reduce(reducer) - totalSpend).toFixed(2));
          setLoading(false);
        });
      } else {
        setNoData(true);
        setLoading(false);
      }
    });
  };

  const numberWithSpaces = (value) => {
    var parts = value.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    parts[1] = parts[1].slice(0, 2);
    return parts.join('.');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getGeneralData();
    getTotalValueWallet(currentUser.id);
  }, []);

  return (
    <Card fluid>
      <Card.Content>
        <Header style={{ opacity: '0.6' }} floated="left">
          <Icon name="dollar" />
          Solde du portefeuille
        </Header>
      </Card.Content>
      <Card.Content>
        {!loading && !noData ? (
          <Grid columns={3} divided>
            <Grid.Row>
              <Grid.Column>
                Solde portefeuille:{' '}
                <h2 style={{ marginTop: '5px' }}>
                  {walletValue && numberWithSpaces(walletValue)} €
                </h2>
              </Grid.Column>
              <Grid.Column>
                {percent > 0 ? 'Plus-value' : ' Moins-value'} portefeuille: %
                <Header
                  style={{ marginTop: '5px' }}
                  as="h2"
                  color={percent > 0 ? 'green' : 'red'}
                >
                  {percent > 0 ? '+' : ' -'}
                  {percent} %
                </Header>
              </Grid.Column>
              <Grid.Column>
                {differenceValue > 0 ? 'Plus-value' : ' Moins-value'}{' '}
                portefeuille: €
                <Header
                  style={{ marginTop: '5px' }}
                  as="h2"
                  color={differenceValue > 0 ? 'green' : 'red'}
                >
                  {differenceValue > 0 ? '+' : ' -'}{' '}
                  {numberWithSpaces(differenceValue)} €
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Divider></Divider>
            <Grid.Row>
              <Grid.Column>
                Fonds investis:{' '}
                <h2 style={{ marginTop: '5px' }}>
                  {numberWithSpaces(total)} €{' '}
                </h2>
              </Grid.Column>
              <Grid.Column>
                Frais:{' '}
                <h2 style={{ marginTop: '5px' }}>{numberWithSpaces(fees)} €</h2>
              </Grid.Column>
              <Grid.Column>
                Fonds investis avec frais:{' '}
                <h2 style={{ marginTop: '5px' }}>
                  {numberWithSpaces(totalWithFees)} €
                </h2>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ) : (
          <Fragment>
            <p style={{ marginTop: '15px' }}>
              Vous n'avez pas encore ajoutez de transactions.
            </p>
            <Button
              style={{ marginTop: '15px', marginBottom: '10px' }}
              as={Link}
              to="/portefeuille"
              basic
            >
              Ajouter ma première tansaction
            </Button>
          </Fragment>
        )}
        {loading && (
          <Dimmer active>
            <Loader />
          </Dimmer>
        )}
      </Card.Content>
    </Card>
  );
}

export default CardWallet;
