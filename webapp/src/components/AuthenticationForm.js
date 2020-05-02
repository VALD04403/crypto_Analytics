import React, { useState } from 'react';
import { Card, Header, Message, Form, Input } from 'semantic-ui-react';
import { ButtonPrimary } from '../styles/Button';
import { useHistory } from 'react-router-dom';

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
        history.push('/home');
      }
    }
  };

  return (
    <Card>
      <Card.Content>
        <Header textAlign="center">
          <Header.Content>
            <h1> {isInSigninMode ? 'Connexion' : 'Inscription'}</h1>
          </Header.Content>
        </Header>
        <Form onSubmit={submit}>
          <Form.Field
            name="username"
            label="Nom d'utilisateur"
            control={Input}
            placeholder="Utilisateur"
          ></Form.Field>
          <Form.Field
            type="password"
            name="password"
            label="Mot de passe"
            control={Input}
            placeholder="*******"
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
  );
};

export default AuthenticationForm;
