import React, { useContext } from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Container } from '../styles/Navbar';
import { useHistory } from 'react-router-dom';
import contextUser from '../context/contextUser';
import '../styles/Navbar.css';

import wallet from '../assets/svg/wallet.svg';

function Navbar() {
  const history = useHistory();
  const { setCurrentUser, getCurrentUser } = useContext(contextUser);

  const changePage = (e, { name }) => {
    history.push('/' + name);
  };

  const logOut = async () => {
    const response = await fetch('/api/sessions', {
      headers: { 'Content-Type': 'Application/json' },
      method: 'DELETE',
    });
    if (response.ok) {
      setCurrentUser(null);
      getCurrentUser();
    }
  };

  return (
    <Container style={{ margin: '0rem ', zIndex: '100', position: 'fixed' }}>
      <Menu
        icon="labeled"
        style={{
          height: '60px',
          zIndex: '100',
          position: 'fixed',
          backgroundColor: '#FFF',
        }}
        pointing
        secondary
        color={'blue'}
        fixed={'top'}
        size={'large'}
      >
        <Menu.Item>
          <Image src={wallet} />
        </Menu.Item>
        <Menu.Item
          style={{ height: '50px' }}
          name="accueil"
          active={history.location.pathname === '/accueil'}
          onClick={changePage}
        />
        <Menu.Item
          style={{ height: '50px' }}
          name="portefeuille"
          active={history.location.pathname === '/portefeuille'}
          onClick={changePage}
        />
        <Menu.Item
          style={{ height: '50px' }}
          name="prix"
          active={history.location.pathname === '/prix'}
          onClick={changePage}
        />
        <Menu.Menu position="right">
          <Menu.Item
            style={{ height: '55px' }}
            name="compte"
            active={history.location.pathname === '/compte'}
          >
            <Dropdown icon="user circle">
              <Dropdown.Menu>
                <Dropdown.Item text="Profil" />
                <Dropdown.Item text="Paramètres" />
                <Dropdown.Divider />
                <Dropdown.Item
                  className="logout"
                  onClick={logOut}
                  text="Déconnexion"
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  );
}
export { Navbar };
