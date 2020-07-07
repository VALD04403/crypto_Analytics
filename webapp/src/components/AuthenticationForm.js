import React, { useState } from 'react';
import {
  Card,
  Header,
  Form,
  Input,
  Container,
  Image,
  Message,
} from 'semantic-ui-react';
import { ButtonPrimary } from '../styles/Button';
import { useHistory } from 'react-router-dom';
import { LinkSubscribe } from '../styles/Item';
import logo from '../assets/svg/wallet_white.svg';

const AuthenticationForm = ({ onUserSignedIn }) => {
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeUsername(e) {
    setDisplayErrorMessage(false);
    setUser(e.target.value);
  }
  function handleChangePassword(e) {
    setDisplayErrorMessage(false);
    setPassword(e.target.value);
  }

  const history = useHistory();
  const errorMessage = `Nom d'utilisateur ou mot de passe incorrect.`;

  const submit = async (event) => {
    event.preventDefault();
    setDisplayErrorMessage(false);
    const url = '/api/sessions';
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        user,
        password,
      }),
    });
    if (response.ok) {
      onUserSignedIn();
      history.push('/accueil');
    } else {
      setDisplayErrorMessage(true);
      document.getElementById('auth-form').reset();
    }
  };

  const goToSubscribe = () => {
    history.push('/subscribe');
  };

  return (
    <Container>
      <Image
        style={{ width: '90px', paddingTop: '10em', paddingBottom: '2em' }}
        centered
        src={logo}
      />
      <Card className='ui centered card'>
        <Card.Content>
          <Header textAlign='center'>
            <Header.Content>
              <h1 style={{ fontWeight: '200', color: '#1652F0' }}>Connexion</h1>
            </Header.Content>
          </Header>
          <Form id='auth-form' onSubmit={submit}>
            <Form.Field
              onChange={handleChangeUsername}
              name='user'
              placeholder="Nom d'utilisateur"
              control={Input}
            ></Form.Field>
            <Form.Field
              onChange={handleChangePassword}
              type='password'
              name='password'
              placeholder='Mot de passe'
              control={Input}
            ></Form.Field>
            {displayErrorMessage && (
              <Message negative compact>
                <p className='text'>{errorMessage}</p>
              </Message>
            )}
            <ButtonPrimary
              disabled={user.length === 0 || password.length < 8}
              type='submit'
            >
              Se connecter
            </ButtonPrimary>
          </Form>
        </Card.Content>
      </Card>
      <LinkSubscribe onClick={goToSubscribe}>
        Pas encore de compte ? Inscrivez-vous
      </LinkSubscribe>
    </Container>
  );
};

export default AuthenticationForm;
