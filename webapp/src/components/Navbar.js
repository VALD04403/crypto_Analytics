import React, { useState } from 'react';
import { Menu, Icon, Image } from 'semantic-ui-react';
import { Container, MenuContainer } from '../styles/Navbar';

function Navbar() {
  const [currentPage, setCurrentPage] = useState('Accueil');
  const changePage = (e, { name }) => {
    setCurrentPage(name);
  };

  return (
    <Container style={{ margin: '0rem ', fixed: 'top' }}>
      <Menu
        icon="labeled"
        style={{ height: '60px' }}
        pointing
        secondary
        color={'blue'}
        fixed={'top'}
        size={'large'}
      >
        <MenuContainer>
          <Menu.Item>
            <Image src="../assets/logo.svg" />
          </Menu.Item>
          <Menu.Item
            style={{ height: '50px' }}
            name="Accueil"
            active={currentPage === 'Accueil'}
            onClick={changePage}
          />
          <Menu.Item
            style={{ height: '50px' }}
            name="Portefeuille"
            active={currentPage === 'Portefeuille'}
            onClick={changePage}
          />
          <Menu.Item
            style={{ height: '50px' }}
            name="Prix"
            active={currentPage === 'Prix'}
            onClick={changePage}
          />
          <Menu.Menu position="right">
            <Menu.Item
              style={{ height: '55px' }}
              name="Compte"
              active={currentPage === 'Compte'}
              onClick={changePage}
            >
              <Icon name="user circle" />
            </Menu.Item>
          </Menu.Menu>
        </MenuContainer>
      </Menu>
      {/* <Dimmer active inverted>
          <Loader size="large" />
        </Dimmer> */}
    </Container>
  );
}
export { Navbar };
