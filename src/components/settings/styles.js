import styled from 'styled-components';

export const Container = styled.div`
  background: white;
  width: ${({collapsed}) => collapsed ? "100vw" : "85vw"};
  height: 100vh;
`;

export const InnerContainer = styled.div`
  margin: 32px;
`;