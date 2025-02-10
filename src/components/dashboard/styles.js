import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column; /* Empilha os gráficos em telas pequenas */
  align-items: center; /* Centraliza o conteúdo horizontalmente */
  justify-content: center; /* Centraliza o conteúdo verticalmente */
  width: ${({ collapsed }) => (collapsed ? "85vw" : "85vw")};
  margin: 0 auto; /* Garante que o container fique centralizado */

  @media screen and (max-width: 1024px) {
    width: 100%;
    //margin-left: 0;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    //margin-left: 0;
  }
`;

export const GraphsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 colunas */
  gap: 5px; /* Pequeno espaçamento entre os gráficos */
  margin-bottom: 20px; /* Espaçamento entre fileiras */
  width: 100%;
`;


export const GraphWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  /* Garantir que o gráfico se ajuste ao espaço disponível */
  width: 100%;
  //height: 80%;
`;



//
export const Button = styled.button`
  --background-color: #98FB98;
  background-color: rgba(0, 80, 0, 0.7);
  border-radius: 100px;
  box-shadow: rgba(0,128,0, .2) 0 -25px 18px -14px inset,rgba(0,128,0, .15) 0 1px 2px,rgba(0,128,0, .15) 0 2px 4px,rgba(0,128,0, .15) 0 4px 8px,rgba(0,128,0, .15) 0 8px 16px,rgba(0,128,0, .15) 0 16px 32px;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 3px 5px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 11px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-right: 65px;
  width: 50px;
  height: 30px;

  :hover {
    box-shadow: rgba(0,128,0,.35) 0 -25px 18px -14px inset,rgba(0,128,0,.35) 0 1px 2px,rgba(0,128,0,.35) 0 2px 4px,rgba(0,128,0,.35) 0 4px 8px,rgba(0,128,0,.35) 0 8px 16px,rgba(0,128,0,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
  outline: none;
  width: 250px;

  &:focus {
    border-color: #007bff;
  }
`;