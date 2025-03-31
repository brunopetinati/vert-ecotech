import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%; /* Garante que ocupe a tela inteira */
  margin: 0;
  padding: 20px;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5em;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 2;
  background: #fff;
  width: ${({ collapsed }) => (collapsed ? "80vw" : "70vw")};
  margin: auto;
  margin-top: 50px;
  position: relative;
  overflow: hidden; /* Para evitar vazamentos da imagem */

  h3 {
    display: flex;
    align-self: flex-start;
    color: #054D00;
  }

  @media screen and (max-width: 768px) {
    width: 90vw;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  padding: 10px 0;
  gap: 5px;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;  // Adicionado para centralização
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
  margin: 20px auto;  // Centraliza o container

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    button {
      width: 80%;  // Ajuste para melhor responsividade
    }
  }
`;

// Adicione este novo componente styled para o container do título
export const SectionContainer = styled.div`
  width: 100%;
  text-align: center;
  margin: 40px 0;
`;