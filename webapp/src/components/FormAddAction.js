import React, { useState } from 'react';
import { Card, Form, Input, Select, Image } from 'semantic-ui-react';
import { ButtonPrimary } from '../styles/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

import btc from '../assets/svg/btc.svg';
import eth from '../assets/svg/eth.svg';
import xtz from '../assets/svg/xtz.svg';
import eos from '../assets/svg/eos.svg';
import ltc from '../assets/svg/ltc.svg';
import xrp from '../assets/svg/xrp.svg';
import bch from '../assets/svg/bch.svg';
import etc from '../assets/svg/etc.svg';
import knc from '../assets/svg/knc.svg';

function FormAddAction() {
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');

  const handleChange = date => {
    setDate(date);
  };

  const handleChangeName = (e, { value }) => setName(value);

  const submit = async event => {
    event.preventDefault();
    const form = new FormData(event.target);
    const cryptoName = name;
    const formDate = form.get('date');
    const date =
      formDate.slice(3, 5) +
      '-' +
      formDate.slice(0, 2) +
      '-' +
      formDate.slice(6, 10);
    const price = form.get('price');
    const amountEuro = form.get('amountEuro');
    const amountCrypto = form.get('amountCrypto');
    const fees = form.get('fees');
    axios
      .post('/api/purchase', {
        cryptoName,
        date,
        price,
        amountEuro,
        amountCrypto,
        fees
      })
      .then(function(res) {
        console.log(res);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const cryptoOptions = [
    { key: '', value: '', text: 'Choisissez votre cryptomonnaie' },
    {
      key: 'btc',
      value: 'btc',
      text: (
        <span>
          <Image style={{ width: '20px', marginRight: '10px' }} src={btc} />{' '}
          Bitcoin
        </span>
      )
    },
    {
      key: 'eth',
      value: 'eth',
      text: (
        <span>
          <Image style={{ width: '20px', marginRight: '10px' }} src={eth} />{' '}
          Ethereum
        </span>
      )
    },
    {
      key: 'ltc',
      value: 'ltc',
      text: (
        <span>
          <Image style={{ width: '20px', marginRight: '10px' }} src={ltc} />{' '}
          Litecoin
        </span>
      )
    },
    {
      key: 'xtz',
      value: 'xtz',
      text: (
        <span>
          <Image style={{ width: '20px', marginRight: '10px' }} src={xtz} />{' '}
          Tezos
        </span>
      )
    },
    {
      key: 'xrp',
      value: 'xrp',
      text: (
        <span>
          <Image style={{ width: '20px', marginRight: '10px' }} src={xrp} /> XRP
        </span>
      )
    },
    {
      key: 'eos',
      value: 'eos',
      text: (
        <span>
          <Image style={{ width: '20px', marginRight: '10px' }} src={eos} /> EOS
        </span>
      )
    },
    {
      key: 'bch',
      value: 'bch',
      text: (
        <span>
          <Image style={{ width: '20px', marginRight: '10px' }} src={bch} />{' '}
          Bitcoin Cash
        </span>
      )
    },
    {
      key: 'etc',
      value: 'etc',
      text: (
        <span>
          <Image style={{ width: '20px', marginRight: '10px' }} src={etc} />{' '}
          Ethereum Classic
        </span>
      )
    },
    {
      key: 'knc',
      value: 'knc',
      text: (
        <span>
          <Image style={{ width: '20px', marginRight: '10px' }} src={knc} />{' '}
          Kyber Network
        </span>
      )
    }
  ];
  return (
    <Card>
      <Card.Content>
        <Card.Header>Ajouter un achat</Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Meta style={{ marginTop: '20px' }}>
          <Form onSubmit={submit}>
            <Form.Field>
              <label>Cryptomonnaie</label>
              <Select
                name="cryptoName"
                placeholder="Cryptomonnaie"
                options={cryptoOptions}
                onChange={handleChangeName}
              />
            </Form.Field>
            <Form.Field
              name="amountCrypto"
              type="number"
              step="any"
              label="Montant crypto"
              control={Input}
              placeholder="0.0002"
            ></Form.Field>
            <Form.Field
              name="amountEuro"
              type="number"
              step="any"
              label="Montant €"
              control={Input}
              placeholder="10 €"
            ></Form.Field>
            <Form.Field
              name="fees"
              type="number"
              step="any"
              label="Frais"
              control={Input}
              placeholder="0,99 €"
            ></Form.Field>
            <Form.Field
              name="price"
              type="number"
              step="any"
              label="Prix"
              control={Input}
              placeholder="8123,23 €"
            ></Form.Field>
            <Form.Field>
              <label>Date d'achat</label>
              <DatePicker
                name="date"
                dateFormat="dd/MM/yyyy"
                selected={date}
                onChange={handleChange}
              />
            </Form.Field>
            <ButtonPrimary id="button-end-page" type="submit">
              Ajouter
            </ButtonPrimary>
          </Form>
        </Card.Meta>
      </Card.Content>
    </Card>
  );
}
export default FormAddAction;
