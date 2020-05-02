import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Image } from 'semantic-ui-react';
import { Container } from '../styles/Navbar';
import { useHistory } from 'react-router-dom';

import wallet from '../assets/svg/wallet.svg';

function Navbar() {
  const history = useHistory();

  const changePage = (e, { name }) => {
    history.push('/' + name);
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
            as={Link}
            to="/account"
            style={{ height: '55px' }}
            name="account"
            active={history.location.pathname === '/account'}
            onClick={changePage}
          >
            <Icon name="user circle" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  );
}
export { Navbar };
