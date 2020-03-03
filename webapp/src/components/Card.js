import React, { Fragment } from 'react';
import { Card } from 'semantic-ui-react';

function CardWallet() {
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
