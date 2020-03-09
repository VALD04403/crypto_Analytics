import React, { Fragment, useEffect, useState } from 'react';
import { Card } from 'semantic-ui-react';

function CardWallet() {
  const [walletValue, setWalletValue] = useState();

  const getTotalWallet = async () => {
    const response = await fetch('/api/totalWallet').then(res =>
      console.log(res)
    );
    setWalletValue(response);
  };

  useEffect(() => {
    getTotalWallet();
  }, []);

  return (
    <Fragment>
      <Card fluid>
        <Card.Content>
          <Card.Header>Solde du portefeuille</Card.Header>
        </Card.Content>
        <Card.Content>
          <Card.Meta>125.12€</Card.Meta>
        </Card.Content>
      </Card>
    </Fragment>
  );
}

export default CardWallet;
