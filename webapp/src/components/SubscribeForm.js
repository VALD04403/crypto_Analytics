import React, { useState } from 'react';
import {
  Card,
  Header,
  Message,
  Form,
  Input,
  Container,
  Image,
} from 'semantic-ui-react';
import { ButtonPrimary } from '../styles/Button';
import { useHistory } from 'react-router-dom';
import { LinkSubscribe } from '../styles/Item';
import logo from '../assets/svg/wallet_white.svg';
import axios from 'axios';

const SubscribeForm = ({ onUserSignedIn }) => {
  const [isSubmitted, setisSubmitted] = useState(false);
  const [password, setPassword] = useState('');

  const history = useHistory();

  const submit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const firstname = formData.get('firstname');
    const name = formData.get('name');
    const mail = formData.get('mail');
    const password = formData.get('password');
    const createUrl = '/api/createUser';
    const sessionUrl = '/api/sessions';
    setPassword(formData.get('password'));
    if (password.length > 7) {
      const response = await axios.post(createUrl, {
        firstname,
        name,
        mail,
        password,
      });
      if (response.status === 201) {
        const login = await axios.post(sessionUrl, {
          mail,
          password,
        });
        if (login.status === 201) {
          onUserSignedIn();
          history.push('/accueil');
        }
      }
    }
  };

  const gotToAuth = () => {
    history.push('/authentication');
  };

  return (
    <Container>
      <Image
        style={{ width: '90px', paddingTop: '5em', paddingBottom: '2em' }}
        centered
        src={logo}
      />
      <Card className='ui centered card'>
        <Card.Content>
          <Header textAlign='center'>
            <Header.Content>
              <h1 style={{ fontWeight: '200', color: '#1652F0' }}>
                Inscription
              </h1>
            </Header.Content>
          </Header>
          <Form onSubmit={submit}>
            <Form.Field
              name='firstname'
              placeholder='Prénom'
              control={Input}
            ></Form.Field>
            <Form.Field
              name='name'
              placeholder='Nom'
              control={Input}
            ></Form.Field>
            <Form.Field
              name='mail'
              placeholder='Mail'
              control={Input}
            ></Form.Field>
            <Form.Field
              type='password'
              name='password'
              placeholder='Mot de passe'
              control={Input}
            ></Form.Field>
            <ButtonPrimary
              onClick={() => {
                setisSubmitted(true);
              }}
              type='submit'
            >
              S'inscrire
            </ButtonPrimary>
          </Form>
          {isSubmitted && password.length < 8 ? (
            <Message negative compact>
              <p className='text'>
                Le mot de passe doit contenir au minimum 8 caractères.
              </p>
            </Message>
          ) : (
            ''
          )}
        </Card.Content>
      </Card>
      <LinkSubscribe onClick={gotToAuth}>
        Déjà un compte ? Connectez-vous
      </LinkSubscribe>
    </Container>
  );
};

export default SubscribeForm;
