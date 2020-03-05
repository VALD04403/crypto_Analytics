import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Header, Image, Table } from 'semantic-ui-react';
import Moment from 'react-moment';

import btc from '../assets/svg/btc.svg';
import eth from '../assets/svg/eth.svg';
import xtz from '../assets/svg/xtz.svg';
import eos from '../assets/svg/eos.svg';
import ltc from '../assets/svg/ltc.svg';
import xrp from '../assets/svg/xrp.svg';
import bch from '../assets/svg/bch.svg';
import etc from '../assets/svg/etc.svg';

function Purchases() {
  const [items, setItems] = useState();
  const orderItems = [];
  const listItems = [];

  const getPurchases = async () => {
    const response = await axios.get('/api/purchases');
    response.data.purchases.map(item => {
      if (listItems.indexOf(item.coin_name) === -1) {
        const coin = {
          name: item.coin_name,
          purchases: []
        };
        orderItems.push(coin);
        listItems.push(item.coin_name);
      }
      orderItems.map(purchase => {
        if (purchase.name === item.coin_name) {
          purchase.purchases.push(item);
        }
      });
    });
    setItems(orderItems);
  };

  const Capitalize = str => {
    return str.toUpperCase();
  };

  useEffect(() => {
    getPurchases();
  }, []);

  return (
    <div>
      {items &&
        items.map(category => (
          <Card key={category.name} fluid>
            <Card.Content>
              <Header as="h2" floated="left">
                <Image
                  style={{ width: '40px', height: '40px', marginRight: '10px' }}
                  src={
                    category.name === 'btc'
                      ? btc
                      : category.name === 'eth'
                      ? eth
                      : category.name === 'etc'
                      ? etc
                      : category.name === 'xtz'
                      ? xtz
                      : category.name === 'ltc'
                      ? ltc
                      : category.name === 'xrp'
                      ? xrp
                      : category.name === 'eos'
                      ? eos
                      : ''
                  }
                ></Image>
                {Capitalize(category.name)}
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
                  {category.purchases.map(item => (
                    <Table.Row key={item.purchase_id}>
                      <Table.Cell>
                        {item.amount_coin}
                        {Capitalize(item.coin_name)}
                      </Table.Cell>
                      <Table.Cell>{item.purchase_mount}€</Table.Cell>
                      <Table.Cell>{item.purchase_price}€</Table.Cell>
                      <Table.Cell>{item.purchase_fees}€</Table.Cell>
                      <Table.Cell>
                        <Moment
                          format="MM/DD/YYYY"
                          date={new Date(item.purchase_date)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Card.Content>
          </Card>
        ))}
    </div>
  );
}

export default Purchases;
