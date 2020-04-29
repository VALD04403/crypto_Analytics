import React, { Fragment, useEffect, useState } from 'react';
import { Card, Image, Table, Button } from 'semantic-ui-react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import btc from '../assets/svg/btc.svg';
import eth from '../assets/svg/eth.svg';
import xtz from '../assets/svg/xtz.svg';
import eos from '../assets/svg/eos.svg';
import ltc from '../assets/svg/ltc.svg';
import xrp from '../assets/svg/xrp.svg';
import bch from '../assets/svg/bch.svg';
import etc from '../assets/svg/etc.svg';
import knc from '../assets/svg/knc.svg';
import xlm from '../assets/svg/xlm.svg';

function LastAction() {
  const [top5, setTop5] = useState();

  const getTop5 = async () => {
    const data = await fetch('/api/top5');
    await data.json().then((res) => {
      setTop5(res.top5);
    });
  };

  const Capitalize = (str) => {
    return ' ' + str.toUpperCase();
  };

  useEffect(() => {
    getTop5();
  }, []);

  return (
    <Fragment>
      <Card style={{ width: '100%' }}>
        <Card.Content>
          <Card.Header>Derniers échanges</Card.Header>
        </Card.Content>
        <Card.Content>
          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell>Volume</Table.HeaderCell>
                <Table.HeaderCell>Montant €</Table.HeaderCell>
                <Table.HeaderCell>Prix</Table.HeaderCell>
                <Table.HeaderCell>Frais</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {top5 &&
                top5.map((item) => (
                  <Table.Row key={item.purchase_id}>
                    <Table.Cell>
                      <Image
                        floated="left"
                        style={{
                          width: '30px',
                          height: '30px',
                          marginRight: '10px',
                        }}
                        src={
                          item.coin_name === 'btc'
                            ? btc
                            : item.coin_name === 'eth'
                            ? eth
                            : item.coin_name === 'etc'
                            ? etc
                            : item.coin_name === 'xtz'
                            ? xtz
                            : item.coin_name === 'ltc'
                            ? ltc
                            : item.coin_name === 'xrp'
                            ? xrp
                            : item.coin_name === 'eos'
                            ? eos
                            : item.coin_name === 'knc'
                            ? knc
                            : item.coin_name === 'bch'
                            ? bch
                            : item.coin_name === 'xlm'
                            ? xlm
                            : ''
                        }
                      ></Image>
                    </Table.Cell>
                    <Table.Cell>
                      {item.amount_coin}
                      {Capitalize(item.coin_name)}
                    </Table.Cell>
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
        <Card.Content extra>
          <Button as={Link} to="/wallet" basic color="blue">
            Voir plus
          </Button>
        </Card.Content>
      </Card>
    </Fragment>
  );
}

export default LastAction;
