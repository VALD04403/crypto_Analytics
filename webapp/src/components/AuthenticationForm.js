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

const AuthenticationForm = ({ onUserSignedIn }) => {
  const [isInSigninMode, setIsInSigninMode] = useState(true);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [password, setPassword] = useState('');

  const history = useHistory();

  const submit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const url = isInSigninMode ? '/api/sessions' : '/api/createUser';
    setPassword(formData.get('password'));
    if (password.length > 7) {
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (response.ok) {
        if (isInSigninMode) {
          onUserSignedIn();
        } else {
          setIsInSigninMode(true);
        }
        history.push('/accueil');
      }
    }
  };

  return (
    <Container>
      <Image
        style={{ width: '90px', paddingTop: '10em' }}
        centered
        src={logo}
      />
      <Card className="ui centered card">
        <Card.Content>
          <Header textAlign="center">
            <Header.Content>
              <h1 style={{ fontWeight: '200', color: '#1652F0' }}>
                {' '}
                {isInSigninMode ? 'Connexion' : 'Inscription'}
              </h1>
            </Header.Content>
          </Header>
          <Form onSubmit={submit}>
            <Form.Field
              name="username"
              placeholder="Nom d'utilisateur"
              control={Input}
            ></Form.Field>
            <Form.Field
              type="password"
              name="password"
              placeholder="Mot de passe"
              control={Input}
            ></Form.Field>
            <ButtonPrimary
              onClick={() => {
                setisSubmitted(true);
              }}
              type="submit"
            >
              Se connecter
            </ButtonPrimary>
          </Form>
          {isSubmitted && password.length < 8 ? (
            <Message negative compact>
              <p className="text">
                Le mot de passe doit contenir au minimum 8 caractères.
              </p>
            </Message>
          ) : (
            ''
          )}
        </Card.Content>
      </Card>
      <LinkSubscribe>Pas encore de compte ? Inscrivez-vous</LinkSubscribe>
    </Container>
  );
};

export default AuthenticationForm;
