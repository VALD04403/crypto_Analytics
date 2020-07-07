import React, { useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Container } from '../styles/Navbar';
import contextUser from '../context/contextUser';

function Footer() {
  const { setCurrentUser, getCurrentUser } = useContext(contextUser);

  return (
    <Menu
      style={{
        backgroundColor: '#E2E2E2',
        position: 'absolute',
        left: '0',
        right: '0',
      }}
      secondary
    ></Menu>
  );
}
export { Footer };
