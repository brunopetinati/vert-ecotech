import styled from "styled-components";

export const Container = styled.div`
  float: left;
  height: 100%;
  background: var(--body-color);
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza horizontalmente */
  justify-content: center; /* Centraliza verticalmente */
  width: ${({ collapsed }) => (collapsed ? "96vw" : "85vw")};

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center; /* Mantém centralizado no mobile */
    align-items: center;
  }
`;


export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 90%;
  font-family: 'Inter', sans-serif;
  color: #000; 
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
  float: 'left';
  height: 50px;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
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

export const Input = styled.input`
  width: 250px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
  --padding: 8px;
  font-size: 12px;
  outline: none;

  ::placeholder {
    font-size: 12px;
  }

  &:focus {
    border-color: #7eff00;
  }

  @media screen and (max-width: 768px) {
    margin-left: 20px;
    margin-top: 64px;
    width: 75%;
    font-size: 12px;
    
    ::placeholder {
      font-size: 12px; 
    }
  }
`;

export const StyledSelect = styled.select`
  width: 350px;
  border: 2px solid #ccc;
  border-radius: 4px;
  --padding: 8px;
  font-size: 12px;
  outline: none;
  margin-left: 0px;
  background: white;
  width: 250px;
  height: 25px;

  ::placeholder {
    font-size: 16px;
  }

  &:focus {
    border-color: #7eff00;
  }

  @media screen and (max-width: 768px) {
    margin-left: 20px;
    margin-top: 64px;
    width: 81%;
    font-size: 12px;
    
    ::placeholder {
      font-size: 12px; 
    }
  }
`;

export const MarginForCelphone = styled.div`
  @media screen and (max-width: 768px) {
    margin-top: 32px;
  }
`;

export const Label = styled.label`
  color: #363636;
  font-size: 9pt;
`;

export const StyledButtonAdicionarUser = styled.button`
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
  width: 170px;
  height: 24px;

  :hover {
    box-shadow: rgba(0,128,0,.35) 0 -25px 18px -14px inset,rgba(0,128,0,.35) 0 1px 2px,rgba(0,128,0,.35) 0 2px 4px,rgba(0,128,0,.35) 0 4px 8px,rgba(0,128,0,.35) 0 8px 16px,rgba(0,128,0,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;