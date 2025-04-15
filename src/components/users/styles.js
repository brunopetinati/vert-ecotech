import styled from "styled-components";



export const IndexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%; /* Garante que ocupe a tela inteira */
  margin: 0;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5em;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 2;
  background: #fff;
  width: ${({ collapsed }) => (collapsed ? "70vw" : "70vw")};
  margin: auto;
  margin-top: 50px;
  position: relative;
  overflow: hidden; /* Para evitar vazamentos da imagem */

  h3 {
    display: flex;
    align-self: flex-start;
    color: #054d00;
  }

  @media screen and (max-width: 768px) {
    width: 90vw;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.2;
    z-index: -1; /* Para que fique atrás do conteúdo */
  }
`;

export const Label = styled.label`
  font-weight: bold;
  font-size: 12pt;
  color: rgb(54, 54, 54);
  margin-bottom: 5px;
`;

// styles.js (correção)
export const ShowInput = styled.input`
  width: 100%;
  max-width: 350px;
  padding: 10px;
  border: 2px solid rgb(204, 204, 204);
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background: rgba(245, 245, 245, 0.4);
  transition: all 0.3s ease-in-out;

  &:focus {
    border-color: #007bff;
    background: #fff;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  max-width: 350px;
  height: 40px;
  border: 2px solid rgb(204, 204, 204);
  border-radius: 8px;
  padding: 8px;
  font-size: 14px;
  outline: none;
  background: rgba(245, 245, 245, 0.4);
  transition: all 0.3s ease-in-out;
  margin-left: 0px;
  color: #888; /* Deixa o texto cinza */

  &:focus {
    border-color: #007bff;
    background: #fff;
    color: #333; /* Escurece o texto ao focar */
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`;


export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  padding: 10px 0;
  gap: 5px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 48%;
`;

export const RightColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 48%;
`;


export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  --align-items: center;
  width: 170px;
  --margin-bottom: 32px;
  --margin-top: 20px;
  text-align: right;
  float: "left";
  height: 50px;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 90%;
  font-family: "Inter", sans-serif;
  color: #000;
`;

export const TableContainer = styled.div`
  display: flex;
  width: 90%;
  --box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 20px;
  margin-top: 30px;

  @media screen and (max-width: 768px) {
    width: 90vw;
    margin: 0 auto;
  }
`;

export const MarginForCelphone = styled.div`
  @media screen and (max-width: 768px) {
    margin-top: 32px;
  }
`;

export const StyledButtonAdicionarUser = styled.button`
background-color: #559D46;
  border-radius: 100px;
  box-shadow: rgba(128, 128, 128, 0.15) 0 -15px 12px -10px inset,
    rgba(128, 128, 128, 0.15) 0 1px 2px, rgba(128, 128, 128, 0.15) 0 2px 4px,
    rgba(128, 128, 128, 0.15) 0 4px 8px, rgba(128, 128, 128, 0.15) 0 8px 16px;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif;
  padding: 6px 10px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 14px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 140px;
  height: 35px;
  z-index: 1;

  :hover {
    box-shadow: rgba(128, 128, 128, 0.3) 0 -25px 18px -14px inset,
      rgba(128, 128, 128, 0.3) 0 1px 2px, rgba(128, 128, 128, 0.3) 0 2px 4px,
      rgba(128, 128, 128, 0.3) 0 4px 8px, rgba(128, 128, 128, 0.3) 0 8px 16px,
      rgba(128, 128, 128, 0.3) 0 16px 32px;
    transform: scale(1.05);
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
    width: 130px;
    height: 30px;
  }
`;
