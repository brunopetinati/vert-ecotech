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