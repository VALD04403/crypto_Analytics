import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Image } from 'semantic-ui-react';
import { Container } from '../styles/Navbar';
import { useLocation } from 'react-router-dom';
import contextPurchases from '../context/contextPurchases';

import wallet from '../assets/svg/wallet.svg';

function Navbar() {
  const { setLocation, location } = useContext(contextPurchases);
  const changePage = (e, { name }) => {
    setLocation(name);
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
          active={location === 'home'}
          onClick={changePage}
        />
        <Menu.Item
          as={Link}
          to="/wallet"
          style={{ height: '50px' }}
          name="wallet"
          active={location === 'wallet'}
          onClick={changePage}
        />
        <Menu.Item
          as={Link}
          to="/price"
          style={{ height: '50px' }}
          name="price"
          active={location === 'price'}
          onClick={changePage}
        />
        <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            to="/account"
            style={{ height: '55px' }}
            name="account"
            active={location === 'account'}
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
