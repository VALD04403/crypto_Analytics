import React, { Fragment } from 'react';
import { Card, Divider } from 'semantic-ui-react';

function LastAction() {
  return (
    <Fragment>
      <Card>
        <Card.Content>
          <Card.Header>Derniers échanges</Card.Header>
        </Card.Content>
        <Card.Content>
          <Card.Meta>12 €</Card.Meta>
          <Divider />
          <Card.Meta>12 €</Card.Meta>
          <Divider />
          <Card.Meta>12 €</Card.Meta>
          <Divider />
          <Card.Meta>12 €</Card.Meta>
          <Divider />
          <Card.Meta>12 €</Card.Meta>
        </Card.Content>
      </Card>
    </Fragment>
  );
}

export default LastAction;
