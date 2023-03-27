import styled from 'styled-components';

export const Container = styled.div`
  background: white;
  padding: 32px;
  width: ${({collapsed}) => collapsed ? "95vw" : "80vw"};
  height: 90vh;
`;