import styled from "styled-components";

export const Container = styled.div`
    display:flex;
    width: 100%;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: row;
    background: green;
    height: 100vw;
    width: 100vw;
  }  
`;


export const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f9fafb;
`;

export const SideContainerFlexStart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;