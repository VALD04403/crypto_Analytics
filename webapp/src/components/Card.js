import React, { Fragment, useEffect, useState } from 'react';
import { Card, Grid, Header } from 'semantic-ui-react';

function CardWallet() {
  let totalSpend = 0;
  const [walletValue, setWalletValue] = useState();
  const [percent, setPercent] = useState();
  const [total, setTotal] = useState();
  const [fees, setFees] = useState();
  const [totalWithFees, setTotalWithFees] = useState();

  const getGeneralData = async () => {
    const data = await fetch('/api/info');
    await data.json().then((res) => {
      res.data.map((info) => {
        setTotal(info.total_invest);
        setFees(info.total_fees);
        setTotalWithFees(Number(info.total_invest) + Number(info.total_fees));
        totalSpend = Number(info.total_invest) + Number(info.total_fees);
      });
    });
  };

  const getTotalValueWallet = async () => {
    const orderItems = [];
    const listItems = [];
    const totalAmountByCoin = [];
    const total = [];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const purschases = await fetch('/api/purchases');
    purschases.json().then((res) => {
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
      orderItems.map((item) => {
        const amount = item.purchases.reduce(function (res, item) {
          return res + parseFloat(item.amount_coin);
        }, 0);
        totalAmountByCoin.push({ name: item.name, amount: amount });
      });
      totalAmountByCoin.map(async (item) => {
        const value = await fetch(`/api/value/${item.name}`, {
          headers: { 'Content-Type': 'application/json' },
          method: 'GET',
        });
        await value.json().then((res) => {
          total.push(res.response * item.amount);
        });
        setWalletValue(total.reduce(reducer));
        const calculPercent = (totalSpend * 100) / total.reduce(reducer);
        setPercent((100 - Number(calculPercent)).toFixed(2));
      });
    });
  };

  useEffect(() => {
    getGeneralData();
    getTotalValueWallet();
  }, []);

  return (
    <Fragment>
      <Card fluid>
        <Card.Content>
          <Card.Header as="h1">Solde du portefeuille</Card.Header>
        </Card.Content>
        <Card.Content>
          <Grid columns={5} divided>
            <Grid.Row>
              <Grid.Column>
                Fond investi: <h2>{total} € </h2>
              </Grid.Column>
              <Grid.Column>
                Frais: <h3>{fees} €</h3>
              </Grid.Column>
              <Grid.Column>
                Total avec frais: <h3>{totalWithFees} €</h3>
              </Grid.Column>
              <Grid.Column>
                Solde portefeuille:{' '}
                <h2>{walletValue && walletValue.toFixed(2)} €</h2>
              </Grid.Column>
              <Grid.Column>
                {percent > 0 ? 'Plus-value' : ' Moins-value'} portefeuille:{' '}
                <Header as="h3" color={percent > 0 ? 'green' : 'red'}>
                  {percent} %
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    </Fragment>
  );
}

export default CardWallet;
