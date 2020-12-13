import React, { Fragment, useEffect, useState } from 'react';
import {
  Card,
  Image,
  Table,
  Header,
  Dimmer,
  Loader,
  Button,
} from 'semantic-ui-react';
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
import link from '../assets/svg/link.svg';
import bsv from '../assets/svg/bsv.svg';
import axios from 'axios';

function Prices() {
  const [list, setList] = useState();
  const listCoin = [
    'BTC',
    'ETH',
    'ETC',
    'XTZ',
    'LTC',
    'XRP',
    'EOS',
    'KNC',
    'BCH',
    'XLM',
    'LINK',
    'BSV',
  ];
  const getValueList = async () => {
    const data = await axios.get('/api/listValue');
    setList(data.data.response.Data);
  };

  useEffect(() => {
    getValueList();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Card style={{ width: '100%' }}>
        <Card.Content>
          {list ? (
            <Table basic='very'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    style={{ width: '50px' }}
                  ></Table.HeaderCell>
                  <Table.HeaderCell>Nom</Table.HeaderCell>
                  <Table.HeaderCell>Prix</Table.HeaderCell>
                  <Table.HeaderCell>Variation</Table.HeaderCell>
                  <Table.HeaderCell>Ajouter</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {list &&
                  list.map((item) => (
                    <Table.Row key={item.CoinInfo.Id}>
                      <Table.Cell style={{ width: '50px' }}>
                        {listCoin.includes(item.CoinInfo.Name) && (
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
                                : item.CoinInfo.Name === 'LINK'
                                ? link
                                : item.CoinInfo.Name === 'BSV'
                                ? bsv
                                : ''
                            }
                          />
                        )}
                      </Table.Cell>
                      <Table.Cell style={{ display: 'flex' }}>
                        <Header style={{ marginTop: '10px' }} as='h3'>
                          {item.CoinInfo.FullName}
                        </Header>
                        <div style={{ marginLeft: '15px', marginTop: '13px' }}>
                          {item.CoinInfo.Name}
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <Header style={{ fontWeight: '200' }} as='h3'>
                          {Math.round(item.RAW.EUR.PRICE * 100) / 100} €
                        </Header>
                      </Table.Cell>
                      <Table.Cell>
                        <Header
                          style={{ fontWeight: '200' }}
                          as='h3'
                          color={
                            item.RAW.EUR.CHANGEPCT24HOUR > 0 ? 'green' : 'red'
                          }
                        >
                          {item.RAW.EUR.CHANGEPCT24HOUR > 0 && '+'}{' '}
                          {Math.round(item.RAW.EUR.CHANGEPCT24HOUR * 100) / 100}{' '}
                          %
                        </Header>
                      </Table.Cell>
                      <Table.Cell>
                        {listCoin.includes(item.CoinInfo.Name) && (
                          <Button
                            style={{
                              backgroundColor: '#1652F0',
                              color: '#fff',
                            }}
                            as={Link}
                            to='/portefeuille'
                          >
                            Ajouter
                          </Button>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          ) : (
            <Dimmer active style={{ height: '200px' }}>
              <Loader />
            </Dimmer>
          )}
        </Card.Content>
      </Card>
    </Fragment>
  );
}

export default Prices;
