import React, { Fragment, useEffect, useState } from 'react';
import { Card, Image, Table, Header } from 'semantic-ui-react';

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

function Prices() {
  const [list, setList] = useState();

  const getValueList = async () => {
    const data = await fetch('/api/listValue');
    data.json().then((res) => {
      setList(res.response.Data);
    });
  };

  const lowerCase = (name) => {
    return name.toLowerCase();
  };

  useEffect(() => {
    getValueList();
  }, []);

  return (
    <Fragment>
      <Card style={{ width: '100%' }}>
        <Card.Content>
          <Table basic="very" celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{ width: '50px' }}></Table.HeaderCell>
                <Table.HeaderCell>Nom</Table.HeaderCell>
                <Table.HeaderCell>Prix</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {list &&
                list.map((item) => (
                  <Table.Row key={item.CoinInfo.Id}>
                    <Table.Cell style={{ width: '50px' }}>
                      <Image
                        style={{
                          width: '30px',
                          height: '30px',
                        }}
                        src={
                          item.CoinInfo.Name === 'BTC'
                            ? btc
                            : item.CoinInfo.Name === 'ETH'
                            ? eth
                            : item.CoinInfo.Name === 'ETC'
                            ? etc
                            : item.CoinInfo.Name === 'XTZ'
                            ? xtz
                            : item.CoinInfo.Name === 'LTC'
                            ? ltc
                            : item.CoinInfo.Name === 'XRP'
                            ? xrp
                            : item.CoinInfo.Name === 'EOS'
                            ? eos
                            : item.CoinInfo.Name === 'KNC'
                            ? knc
                            : item.CoinInfo.Name === 'BCH'
                            ? bch
                            : item.CoinInfo.Name === 'XLM'
                            ? xlm
                            : ''
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Header as="h3">{item.CoinInfo.FullName}</Header>
                      <div>{item.CoinInfo.Name}</div>
                    </Table.Cell>
                    <Table.Cell>
                      <Header as="h3">{item.RAW.EUR.PRICE} €</Header>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Card.Content>
      </Card>
    </Fragment>
  );
}

export default Prices;
