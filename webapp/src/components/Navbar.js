import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Image } from 'semantic-ui-react';
import { Container } from '../styles/Navbar';
import { useLocation } from 'react-router-dom';

import logo from '../assets/logo.svg';

function Navbar() {
  let location = useLocation();
  const [currentPage, setCurrentPage] = useState(
    location.pathname.split('/')[1]
  );
  const changePage = (e, { name }) => {
    setCurrentPage(name);
  };

  return (
    <Container style={{ margin: '0rem ', zIndex: '100', position: 'fixed' }}>
      <Menu
        icon="labeled"
        style={{
          height: '60px',
          zIndex: '100',
          position: 'fixed',
          backgroundColor: '#FFF'
        }}
        pointing
        secondary
        color={'blue'}
        fixed={'top'}
        size={'large'}
      >
        <Menu.Item>
          <Image src={logo} />
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/dashboard"
          style={{ height: '50px' }}
          name="dashboard"
          active={currentPage === 'dashboard'}
          onClick={changePage}
        />
        <Menu.Item
          as={Link}
          to="/wallet"
          style={{ height: '50px' }}
          name="wallet"
          active={currentPage === 'wallet'}
          onClick={changePage}
        />
        <Menu.Item
          as={Link}
          to="/price"
          style={{ height: '50px' }}
          name="price"
          active={currentPage === 'price'}
          onClick={changePage}
        />
        <Menu.Menu style={{ marginRight: '0px' }} position="right">
          <Menu.Item
            as={Link}
            to="/account"
            style={{ height: '55px' }}
            name="account"
            active={currentPage === 'account'}
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
