import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Header, Image, Table } from 'semantic-ui-react';
import bitcoin from '../assets/svg/bitcoin.svg';
import Moment from 'react-moment';

function Purchases() {
  const [items, setItems] = useState();

  const getPurchases = async () => {
    const response = await axios.get('/api/purchases');
    setItems(response.data.purchases);
  };

  useEffect(() => {
    getPurchases();
  }, []);

  return (
    <div>
      <Card fluid>
        <Card.Content>
          <Header as="h2" floated="left">
            <Image
              style={{ width: '40px', height: '40px', marginRight: '10px' }}
              src={bitcoin}
            ></Image>
            Bitcoin
          </Header>
        </Card.Content>
        <Card.Content>
          <Table basic="very" celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Volume</Table.HeaderCell>
                <Table.HeaderCell>Montant €</Table.HeaderCell>
                <Table.HeaderCell>Prix</Table.HeaderCell>
                <Table.HeaderCell>Frais</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {items &&
                items.map(item => (
                  <Table.Row key={item.purchase_id}>
                    <Table.Cell>{item.amount_coin}BTC</Table.Cell>
                    <Table.Cell>{item.purchase_mount}€</Table.Cell>
                    <Table.Cell>{item.purchase_price}€</Table.Cell>
                    <Table.Cell>{item.purchase_fees}€</Table.Cell>
                    <Table.Cell>
                      <Moment
                        format="DD/MM/YYYY"
                        date={new Date(item.purchase_date)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Card.Content>
      </Card>
    </div>
  );
}

export default Purchases;
