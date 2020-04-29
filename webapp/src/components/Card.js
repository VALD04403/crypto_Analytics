import React, { Fragment, useEffect, useState } from 'react';
import { Card, Grid } from 'semantic-ui-react';

function CardWallet() {
  const [walletValue, setWalletValue] = useState();
  const [total, setTotal] = useState();
  const [fees, setFees] = useState();
  const [totalWithFees, setTotalWithFees] = useState();

  // const getTotalWallet = async () => {
  //   const response = await fetch('/api/totalWallet');
  // };

  const getGeneralData = async () => {
    const data = await fetch('/api/info');
    await data.json().then((res) => {
      res.data.map((info) => {
        setTotal(info.total_invest);
        setFees(info.total_fees);
        setTotalWithFees(info.total_with_fees);
      });
    });
  };

  useEffect(() => {
    getGeneralData();
    // getTotalWallet();
  }, []);

  return (
    <Fragment>
      <Card fluid>
        <Card.Content>
          <Card.Header as="h1">Solde du portefeuille</Card.Header>
        </Card.Content>
        <Card.Content>
          <Grid columns={3} divided>
            <Grid.Row>
              <Grid.Column>
                Total placé: <h2>{total} € </h2>
              </Grid.Column>
              <Grid.Column>
                Frais: <h2>{fees} €</h2>
              </Grid.Column>
              <Grid.Column>
                Total avec frais: <h2>{totalWithFees} €</h2>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    </Fragment>
  );
}

export default CardWallet;
