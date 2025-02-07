import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100vw; /* Garante que a largura ocupe 100% da tela */
  height: 100vh; /* Garante que a altura ocupe 100% da tela */
  //background: rgb(88, 166, 243);
  
  @media screen and (max-width: 1024px) {
    width: 100vw; /* Garante que a largura ocupe 100% da tela em telas menores */
    height: 100vh; /* Garante que a altura ocupe 100% da tela em telas menores */
  }

  @media screen and (max-width: 768px) {
    flex-direction: column; /* Altera para coluna em telas menores */
    height: auto; /* Evita altura fixa para telas pequenas */
  }

  @media screen and (max-width: 480px) {
    padding: 10px; /* Adiciona espaçamento para telas muito pequenas */
  }
`;




export const SideContainer = styled.div`
  scrollbar-width: none; 
  overflow-y: auto; 
  overflow-x: hidden; 
  //background:rgb(218, 16, 16);
  position: relative; 
  height: 100vh; 
  min-height: 100vh; /* Garante que sempre tenha a altura mínima */
  width: calc(100% - ${({ collapsed }) => (collapsed ? "15vw" : "6vw")}); /* Cálculo direto de largura */
  //margin-left: ${({ collapsed }) => (collapsed ? "15vw" : "6vw")}; 
  transition: margin-left 0.5s ease-in-out, width 0.5s ease-in-out; 

  display: flex;
  flex-direction: column;
  //align-items: center; /* Centraliza horizontalmente */
  //justify-content: center; /* Centraliza verticalmente */

  &::-webkit-scrollbar {
    display: none; /* Remove scrollbar no Chrome/Safari */
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    margin-left: 0; /* Remove a margem lateral */
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto; /* Permite que a altura se ajuste */
    min-height: auto;
    padding: 20px; /* Adiciona espaçamento interno */
  }
`;



export const SideContainerFlexStart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;