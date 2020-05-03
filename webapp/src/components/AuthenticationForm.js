import React, { useState } from 'react';
import { Card, Header, Form, Input, Container, Image } from 'semantic-ui-react';
import { ButtonPrimary } from '../styles/Button';
import { useHistory } from 'react-router-dom';
import { LinkSubscribe } from '../styles/Item';
import logo from '../assets/svg/wallet_white.svg';

const AuthenticationForm = ({ onUserSignedIn }) => {
  const [isSubmitted, setisSubmitted] = useState(false);

  const history = useHistory();

  const submit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const url = '/api/sessions';
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
        onUserSignedIn();
        history.push('/accueil');
      }
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
      <Card className="ui centered card">
        <Card.Content>
          <Header textAlign="center">
            <Header.Content>
              <h1 style={{ fontWeight: '200', color: '#1652F0' }}>Connexion</h1>
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
        </Card.Content>
      </Card>
      <LinkSubscribe onClick={goToSubscribe}>
        Pas encore de compte ? Inscrivez-vous
      </LinkSubscribe>
    </Container>
  );
};

export default AuthenticationForm;
