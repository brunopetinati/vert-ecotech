import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  width: ${({collapsed}) => collapsed ? "95vw" : "85vw"};

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
    overflow-x: auto;
    white-space: nowrap;
  }  
`;