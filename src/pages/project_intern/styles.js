import styled from "styled-components";

export const Label = styled.label`
  display: flex;
  align-items: center; /* Alinha verticalmente */
  justify-content: flex-end; /* Move o label para a direita */
  text-align: right; /* Alinha o texto à direita */
  width: 100%; /* Ocupa toda a largura disponível */
  padding-right: 10px; /* Espaço extra à direita */
  font-size: 14px;
  color: #333;
`;

export const stylesPgMenuInf = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '1000px', // Isso faz com que ocupe toda a altura da tela
    width: '100%',  // Isso faz com que ocupe toda a largura
    backgroundColor: 'red', // Substitua pelo código da cor desejada
  },
};


//a parti daqui

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  //background: rgb(88, 166, 243);

  @media screen and (max-width: 1024px) {
    height: auto; /* Permite que a altura se ajuste conforme necessário */
    min-height: 100vh;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column; /* Altera para layout em coluna */
    height: auto;
    min-height: 100vh;
  }

  @media screen and (max-width: 480px) {
    padding: 10px; /* Adiciona um espaçamento interno para telas muito pequenas */
  }
`;

export const SideContainer = styled.div`
  scrollbar-width: none;
  overflow-y: auto;
  overflow-x: hidden;
  //background: rgb(218, 16, 16);
  position: relative;
  height: 100vh;
  min-height: 100vh;
  width: ${({ collapsed }) => (collapsed ? "15vw" : "6vw")}; /* Alterna entre os tamanhos */
  transition: width 0.5s ease-in-out; 

  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    width: ${({ collapsed }) => (collapsed ? "80vw" : "100%")}; /* Usa uma largura maior quando colapsado */
    height: auto;
    min-height: 100vh;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
    min-height: auto;
    padding: 20px; /* Adiciona espaçamento interno */
  }
`;
