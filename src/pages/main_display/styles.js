import styled from "styled-components";

export const Container = styled.div`
  display:flex;
  width: ${({collapsed}) => collapsed ? "90vw" : "100vw"};
  background: #F9FAFB;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: row;
    height: 153vh;
  }  
`;


export const SideContainer = styled.div`
  background: #f9fafb;
  position: relative; 
  width: calc(100% - ${({ collapsed }) => (collapsed ? "5vw" : "20vw")}); /* Ajusta largura */
  margin-left: ${({ collapsed }) => (collapsed ? "15vw" : "6vw")}; /* Ajusta a posição do conteúdo */
  transition: margin-left 0.5s ease-in-out, width 0.5s ease-in-out; /* Adiciona transições suaves */

  @media screen and (max-width: 768px) {
    margin-left: ${({ showSidebar }) => (showSidebar ? "15vw" : "0")};
    width: ${({ showSidebar }) => (showSidebar ? "85vw" : "100vw")};
    transition: margin-left 0.5s ease-in-out, width 0.5s ease-in-out;
  }
`;


export const SideContainerFlexStart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;