import React, { useState, useEffect, Fragment } from 'react';
import { Card, Header, Image, Table, Dimmer, Loader } from 'semantic-ui-react';
import Moment from 'react-moment';

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
import bat from '../assets/svg/bat.svg';

function Purchases(props) {
  const [value, setValue] = useState();
  const [total, setTotal] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [totalValue, setTotalValue] = useState();
  const [percent, setPercent] = useState();

  const getInfos = async (coin, purchases) => {
    //valeur crypto
    let coinValue;
    const response = await fetch(`/api/value/${coin}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    await response.json().then((res) => {
      coinValue = res.response;
      setValue(res.response);
    });

    //total crypto
    const sumCoin = await purchases.reduce(function (res, item) {
      return res + parseFloat(item.amount_coin);
    }, 0);
    setTotalAmount(sumCoin);

    //euro dépensé
    const sumEuro = await purchases.reduce(function (res, item) {
      return (
        res +
        parseFloat(item.amount_coin * item.transaction_price) +
        parseFloat(item.transaction_fees)
      );
    }, 0);
    setTotal(Math.round(sumEuro * 100) / 100);

    //valeur total
    const valueOfWallet = sumCoin * coinValue;
    setTotalValue(Math.round(valueOfWallet * 100) / 100);

    //pourcentage plus-value/moins-value
    const difference = valueOfWallet - sumEuro;
    const percentValue = (difference / sumEuro) * 100;
    percentValue === Infinity
      ? setPercent(100)
      : setPercent(Math.round(percentValue * 100) / 100);
  };

  const Capitalize = (str) => {
    return ' ' + str.toUpperCase();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getInfos(props.category.name, props.category.purchases);
  }, []);

  return (
    <div>
      <Card key={props.category.name} fluid>
        {value ? (
          <Fragment>
            <Card.Content>
              <Header as="h2" floated="left">
                <Image
                  style={{ width: '40px', height: '40px', marginRight: '10px' }}
                  src={
                    props.category.name === 'btc'
                      ? btc
                      : props.category.name === 'eth'
                      ? eth
                      : props.category.name === 'etc'
                      ? etc
                      : props.category.name === 'xtz'
                      ? xtz
                      : props.category.name === 'ltc'
                      ? ltc
                      : props.category.name === 'xrp'
                      ? xrp
                      : props.category.name === 'eos'
                      ? eos
                      : props.category.name === 'knc'
                      ? knc
                      : props.category.name === 'bch'
                      ? bch
                      : props.category.name === 'xlm'
                      ? xlm
                      : props.category.name === 'bat'
                      ? bat
                      : ''
                  }
                ></Image>
                {Capitalize(props.category.name)}
                <span style={{ marginLeft: '40px' }}> {value} €</span>
              </Header>
            </Card.Content>
            <Card.Content style={{ textAlign: 'left' }}>
              <Header as="h4">
                Total achété: {total} € / {totalAmount}{' '}
                {Capitalize(props.category.name)}
              </Header>
              <Header as="h3">Valeur actuelle: {totalValue} €</Header>
              <Header as="h4" color={percent > 0 ? 'green' : 'red'}>
                {percent > 0 ? 'Plus-value:' : ' Moins-value:'} {percent} %
              </Header>
            </Card.Content>
          </Fragment>
        ) : (
          <Dimmer active>
            <Loader />
          </Dimmer>
        )}
        <Card.Content>
          <Table basic="very" striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Volume</Table.HeaderCell>
                <Table.HeaderCell>Prix</Table.HeaderCell>
                <Table.HeaderCell>Frais</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {props.category.purchases.map((item) => (
                <Table.Row key={item.transaction_id}>
                  <Table.Cell>
                    {item.amount_coin}
                    {Capitalize(item.coin_name)}
                  </Table.Cell>
                  <Table.Cell>{item.transaction_price}€</Table.Cell>
                  <Table.Cell>{item.transaction_fees}€</Table.Cell>
                  <Table.Cell>
                    <Moment
                      format="DD/MM/YYYY"
                      date={new Date(item.transaction_date)}
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
