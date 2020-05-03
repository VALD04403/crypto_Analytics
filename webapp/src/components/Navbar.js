import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Container } from '../styles/Navbar';
import { useHistory } from 'react-router-dom';
import contextUser from '../context/contextUser';

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
          as={Link}
          to="/home"
          style={{ height: '50px' }}
          name="home"
          active={history.location.pathname === '/home'}
          onClick={changePage}
        />
        <Menu.Item
          as={Link}
          to="/wallet"
          style={{ height: '50px' }}
          name="wallet"
          active={history.location.pathname === '/wallet'}
          onClick={changePage}
        />
        <Menu.Item
          as={Link}
          to="/price"
          style={{ height: '50px' }}
          name="price"
          active={history.location.pathname === '/price'}
          onClick={changePage}
        />
        <Menu.Menu position="right">
          <Menu.Item
            style={{ height: '55px' }}
            name="account"
            active={history.location.pathname === '/account'}
          >
            {/* <Header as="h3">
              <Header.Content> */}
            <Dropdown icon="user circle">
              <Dropdown.Menu>
                <Dropdown.Item text="Profil" />
                <Dropdown.Item text="Paramètres" />
                <Dropdown.Divider />
                <Dropdown.Item onClick={logOut} text="Déconnexion" />
              </Dropdown.Menu>
            </Dropdown>
            {/* </Header.Content>
            </Header> */}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  );
}
export { Navbar };
