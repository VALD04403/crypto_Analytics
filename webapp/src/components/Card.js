import React from 'react';
import { Card } from 'semantic-ui-react';

function CardWallet() {
  return (
    <div>
      <Card fluid style={{ marginTop: '90px' }}>
        <Card.Content>
          <Card.Header>Solde du portefeuille</Card.Header>
          <Card.Meta>125.12€</Card.Meta>
        </Card.Content>
      </Card>
    </div>
  );
}

export { CardWallet };
