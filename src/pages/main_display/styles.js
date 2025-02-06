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
  scrollbar-width: none; 
  overflow-y: auto; 
  overflow-x: hidden; 
  background: #f9fafb;
  position: relative; 
  height: 100vh; 
  min-height: 100vh; /* Garante que sempre tenha a altura mínima */
  width: calc(100% - ${({ collapsed }) => (collapsed ? "15vw" : "6vw")}); /* Cálculo direto de largura */
  margin-left: ${({ collapsed }) => (collapsed ? "15vw" : "6vw")}; 
  transition: margin-left 0.5s ease-in-out, width 0.5s ease-in-out; 

  &::-webkit-scrollbar {
    display: none; /* Remove scrollbar no Chrome/Safari */
  }
`; 


export const SideContainerFlexStart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;