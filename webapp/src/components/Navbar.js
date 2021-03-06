import React, { useContext, useEffect, useState } from 'react';
import { Menu, Image, Dropdown, Icon } from 'semantic-ui-react';
import { Container } from '../styles/Navbar';
import { useHistory } from 'react-router-dom';
import contextUser from '../context/contextUser';
import '../styles/Navbar.css';
import axios from 'axios';

import wallet from '../assets/svg/wallet.svg';
import Cookies from 'universal-cookie';

function Navbar() {
  const history = useHistory();
  const { currentUser, setCurrentUser, getCurrentUser } = useContext(
    contextUser
  );
  const [mobileScreen, setMobileScreen] = useState(false);

  const changePage = (e, { name }) => {
    history.push('/' + name);
  };

  const logOut = async () => {
    if (!currentUser.coinbaseUser) {
      const response = await axios.delete('/api/sessions');
      if (response.status === 200) {
        setCurrentUser(null);
        getCurrentUser();
      }
    } else {
      const cookies = new Cookies();
      cookies.remove('coinbaseUser');
      cookies.remove('coinbaseToken');
      setCurrentUser(null);
      getCurrentUser();
    }
  };

  const windowResize = () => {
    window.innerWidth < 768 ? setMobileScreen(true) : setMobileScreen(false);
  };

  useEffect(() => {
    windowResize();
    function handleResize() {
      windowResize();
    }
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <Container style={{ margin: '0rem ', zIndex: '100', position: 'fixed' }}>
      <Menu
        icon='labeled'
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
        {!mobileScreen && (
          <Menu.Item
            style={{ height: '50px' }}
            name='accueil'
            active={history.location.pathname === '/accueil'}
            onClick={changePage}
          />
        )}
        {!mobileScreen && (
          <Menu.Item
            style={{ height: '50px' }}
            name='portefeuille'
            active={history.location.pathname === '/portefeuille'}
            onClick={changePage}
          />
        )}
        {!mobileScreen && (
          <Menu.Item
            style={{ height: '50px' }}
            name='prix'
            active={history.location.pathname === '/prix'}
            onClick={changePage}
          />
        )}

        <Menu.Menu position='right'>
          {!mobileScreen ? (
            <Menu.Item
              style={{ height: '55px' }}
              name='compte'
              active={history.location.pathname === '/compte'}
            >
              <Dropdown icon='user circle'>
                <Dropdown.Menu>
                  <Dropdown.Item text='Profil' />
                  <Dropdown.Item text='Paramètres' />
                  <Dropdown.Divider />
                  <Dropdown.Item
                    className='logout'
                    onClick={logOut}
                    text='Déconnexion'
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          ) : (
            <Menu.Item>
              <Dropdown icon='bars'>
                <Dropdown.Menu>
                  <Dropdown.Item
                    text='Accueil'
                    name='accueil'
                    active={history.location.pathname === '/accueil'}
                    onClick={changePage}
                  />
                  <Dropdown.Item
                    text='Portefeuille'
                    name='portefeuille'
                    active={history.location.pathname === '/portefeuille'}
                    onClick={changePage}
                  />
                  <Dropdown.Item
                    text='Prix'
                    name='prix'
                    active={history.location.pathname === '/prix'}
                    onClick={changePage}
                  />
                  <Dropdown.Divider />
                  {/* <Dropdown.Item text='Profil' />
                  <Dropdown.Item text='Paramètres' /> */}
                  <Dropdown.Item
                    className='logout'
                    onClick={logOut}
                    text='Déconnexion'
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    </Container>
  );
}
export { Navbar };
