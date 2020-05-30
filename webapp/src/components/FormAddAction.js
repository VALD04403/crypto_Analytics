import React, { useState, useEffect, useContext } from 'react';
import { Card, Form, Input, Select, Image, Checkbox } from 'semantic-ui-react';
import { ButtonPrimary } from '../styles/Button';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import contextUser from '../context/contextUser';
import '../styles/Form.css';

import 'react-datepicker/dist/react-datepicker.css';

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

function FormAddAction({ onSubmitForm }) {
  const { currentUser } = useContext(contextUser);

  const [date, setDate] = useState();
  const [name, setName] = useState('');
  const [amountCrypto, setAmountCrypto] = useState('');
  const [price, setPrice] = useState('');
  const [fees, setFees] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [staking, setStaking] = useState(false);
  const [isFree, setIsFree] = useState(false);

  const handleChangeAmountCrypto = (data) => setAmountCrypto(data);
  const handleChangePrice = (data) => setPrice(data);
  const handleChangeFees = (data) => setFees(data);
  const handleChangeDate = (data) => setDate(data);
  const handleChangeStaking = () => setStaking(!staking);
  const handleChangeFree = () => setIsFree(!isFree);
  const handleChangeName = (e, { value }) => setName(value);

  const Greet = () => <div>Échange ajouté !</div>;
  const submit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);
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
    const amountCrypto = form.get('amountCrypto');
    const fees = form.get('fees');

    if (cryptoName && price && date && amountCrypto && fees) {
      axios
        .post('/api/purchase', {
          cryptoName,
          date,
          price,
          amountCrypto,
          fees,
          staking,
          isFree,
          currentUser,
        })
        .then(function (res) {
          toast.success(<Greet />);
          setIsSubmitted(false);
          document.getElementById('coin-form').reset();
          setName(null);
          setDate(null);
          setAmountCrypto(null);
          setFees(null);
          setPrice(null);
          setIsFree(false);
          setStaking(false);
          onSubmitForm();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
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
      ),
    },
    {
      key: 'bat',
      value: 'bat',
      text: (
        <span>
          <Image style={{ width: '20px', marginRight: '10px' }} src={bat} /> Bat
        </span>
      ),
    },
    {
      key: 'eth',
      value: 'eth',
      text: (
        <span>
          <Image style={{ width: '20px', marginRight: '10px' }} src={eth} />{' '}
          Ethereum
        </span>
      ),
    },
    {
      key: 'ltc',
      value: 'ltc',
      text: (
        <span>
          <Image style={{ width: '20px', marginRight: '10px' }} src={ltc} />{' '}
          Litecoin
        </span>
      ),
    },
    {
      key: 'xtz',
      value: 'xtz',
      text: (
        <span>
          <Image style={{ width: '20px', marginRight: '10px' }} src={xtz} />{' '}
          Tezos
        </span>
      ),
    },
    {
      key: 'xrp',
      value: 'xrp',
      text: (
        <span>
          <Image style={{ width: '20px', marginRight: '10px' }} src={xrp} /> XRP
        </span>
      ),
    },
    {
      key: 'eos',
      value: 'eos',
      text: (
        <span>
          <Image style={{ width: '20px', marginRight: '10px' }} src={eos} /> EOS
        </span>
      ),
    },
    {
      key: 'bch',
      value: 'bch',
      text: (
        <span>
          <Image style={{ width: '20px', marginRight: '10px' }} src={bch} />{' '}
          Bitcoin Cash
        </span>
      ),
    },
    {
      key: 'etc',
      value: 'etc',
      text: (
        <span>
          <Image style={{ width: '20px', marginRight: '10px' }} src={etc} />{' '}
          Ethereum Classic
        </span>
      ),
    },
    {
      key: 'knc',
      value: 'knc',
      text: (
        <span>
          <Image style={{ width: '20px', marginRight: '10px' }} src={knc} />{' '}
          Kyber Network
        </span>
      ),
    },
    {
      key: 'xlm',
      value: 'xlm',
      text: (
        <span>
          <Image style={{ width: '20px', marginRight: '10px' }} src={xlm} />{' '}
          Stellar Lumens
        </span>
      ),
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Card style={{ marginTop: '1em' }}>
      <Card.Content>
        <Card.Header>Ajouter une transaction</Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Meta style={{ marginTop: '10px' }}>
          <Form id="coin-form" onSubmit={submit}>
            <Form.Field className={isSubmitted && !name ? 'error' : ''}>
              <label>Cryptomonnaie</label>
              <Select
                name="cryptoName"
                placeholder="Cryptomonnaie"
                selected={name}
                value={name}
                options={cryptoOptions}
                onChange={handleChangeName}
              />
            </Form.Field>
            <Form.Field
              className={isSubmitted && !amountCrypto ? 'error' : ''}
              onChange={handleChangeAmountCrypto}
              name="amountCrypto"
              step="any"
              label="Volume crypto"
              type="number"
              control={Input}
              placeholder="Volume"
            ></Form.Field>
            <Form.Field
              className={isSubmitted && !price ? 'error' : ''}
              onChange={handleChangePrice}
              name="price"
              step="any"
              label="Prix"
              type="number"
              control={Input}
              placeholder="Prix €"
            ></Form.Field>
            <Form.Field
              className={isSubmitted && !fees ? 'error' : ''}
              onChange={handleChangeFees}
              name="fees"
              step="any"
              label="Frais"
              type="number"
              control={Input}
              placeholder="Frais €"
            ></Form.Field>
            <Form.Field
              control={Input}
              type="date"
              className={isSubmitted && !date ? 'error' : ''}
              label="Date de la transaction"
            >
              <DatePicker
                className="datePicker"
                placeholderText="Date"
                name="date"
                dateFormat="dd/MM/yyyy"
                selected={date}
                onChange={handleChangeDate}
              />
            </Form.Field>
            <Checkbox
              onChange={handleChangeStaking}
              checked={staking}
              style={{ marginTop: '10px', display: 'flex' }}
              label="Récompense staking"
            />
            <Checkbox
              onChange={handleChangeFree}
              checked={isFree}
              style={{ marginTop: '15px', display: 'flex' }}
              label="Transaction en votre faveur"
            />
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
