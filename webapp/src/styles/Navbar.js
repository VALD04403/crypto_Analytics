import styled from 'styled-components';

const Container = styled.div`
  background-color: '#000000';
  opacity: 0.95;
`;

const MenuContainer = styled.div`
  @media screen and (min-width: 1216px) {
    display: flex;
    margin-left: 125px;
    margin-right: 125px;
  }
  @media screen and (max-width: 1216px) {
    margin-left: 25px;
    margin-right: 25px;
    display: flex;
  }
`;
export { Container, MenuContainer };
