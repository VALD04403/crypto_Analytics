import React, { useState, useEffect, useContext } from 'react';
import {
  Card,
  Header,
  Form,
  Input,
  Container,
  Image,
  Message,
} from 'semantic-ui-react';
import { ButtonPrimary, ButtonOutlinePrimary } from '../styles/Button';
import { useHistory, useLocation } from 'react-router-dom';
import { LinkSubscribe } from '../styles/Item';
import logo from '../assets/svg/wallet_white.svg';
import coinbase from '../assets/svg/coinbase.svg';
import axios from 'axios';
import Cookies from 'universal-cookie';
import contextUser from '../context/contextUser';

const AuthenticationForm = ({ onUserSignedIn }) => {
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentUser } = useContext(contextUser);

  const clientId = process.env.REACT_APP_COINBASE_CLIENT_ID;
  const secretClientId = process.env.REACT_APP_COINBASE_SECRET_CLIENT;
  const redirectUrl = process.env.REACT_APP_REDIRECT_URL;
  const url = `https://www.coinbase.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&callback&scope=wallet:accounts:read,wallet:transactions:read,wallet:buys:read`;

  function handleChangeUsername(e) {
    setDisplayErrorMessage(false);
    setUsername(e.target.value);
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
        username,
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

  const redirectCoinbase = () => {
    window.location.href = url;
  };

  //coinbase connexion

  const cookies = new Cookies();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();

  const createWithoAuth = async () => {
    const coinbaseUrl = 'https://api.coinbase.com/oauth/token';
    const coinbaseOAuth = await axios.post(coinbaseUrl, {
      grant_type: 'authorization_code',
      code: query.get('code'),
      client_id: clientId,
      client_secret: secretClientId,
      redirect_uri: window.location + '/authentication',
    });
    console.log(coinbaseOAuth);
    if (coinbaseOAuth.data.access_token) {
      cookies.set('coinbaseToken', coinbaseOAuth.data, { path: '/' });
      const coinbaseCookie = cookies.get('coinbaseToken');
      console.log(coinbaseCookie);
      getCurrentUserCoinbase();
    }
  };

  if (query.get('code')) {
    createWithoAuth();
  }

  const getCurrentUserCoinbase = async () => {
    const coinbaseCookie = cookies.get('coinbaseToken');
    console.log(coinbaseCookie);
    const coinbaseUser = cookies.get('coinbaseUser');
    if (!coinbaseUser && coinbaseCookie) {
      const url = `https://api.coinbase.com/v2/user`;
      const user = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${coinbaseCookie?.access_token}`,
        },
      });
      cookies.set('coinbaseUser', user.data.data, { path: '/' });
      console.log('notcookie', user.data.data);
      setCurrentUser({
        id: user.data.data.id,
        username: user.data.data.user,
        coinbaseUser: true,
      });
      history.push('/accueil');
    } else if (coinbaseUser) {
      console.log('hasCookie', coinbaseUser);
      setCurrentUser({
        id: coinbaseUser.id,
        username: coinbaseUser.user,
        coinbaseUser: true,
      });
      history.push('/accueil');
    }
  };

  useEffect(() => {
    getCurrentUserCoinbase();
  }, []);

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
              name='username'
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
              disabled={username.length === 0 || password.length < 8}
              type='submit'
            >
              Se connecter
            </ButtonPrimary>
          </Form>
          <ButtonOutlinePrimary
            onClick={redirectCoinbase}
            style={{ marginTop: '15px' }}
          >
            <Image src={coinbase} style={{ marginRight: '5px' }} />
            Se connecter avec Coinbase
          </ButtonOutlinePrimary>
        </Card.Content>
      </Card>
      <LinkSubscribe onClick={goToSubscribe}>
        Pas encore de compte ? Inscrivez-vous
      </LinkSubscribe>
    </Container>
  );
};

export default AuthenticationForm;
