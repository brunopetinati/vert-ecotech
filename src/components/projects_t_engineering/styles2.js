import styled from 'styled-components';
import Select from "react-select";
import InputMask from "react-input-mask";

export const Container = styled.div`
  
  --height: 100vh;
  --width: 90vw;
  --display: flex;
  --flex-direction: column;
  --justify-content: flex-start;
  --align-items: center;

  h2 {
    color: #054d00;
    margin-bottom: 36px;
  }
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60vw;
  margin-left: 64px;
  text-align: left;
`;

export const Column = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 10px;
  width: 630px;
`;

export const Label = styled.label`
  margin-bottom: 10px;
  font-weight: 500;
`;

export const Input = styled(InputMask)`
  padding: 2px;
  margin-bottom: 20px;
  width: 430px;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;

  ::placeholder {
    font-size: 12px;
  }

  &:focus {
    border-color: #007bff;
  }
`;

export const Span = styled.span`
  color: #323338;
  margin-bottom: 16px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  --justify-content: flex-end;
  --align-items: center;
  --height: 5vw;
  --width: 93vw;
  margin-top: 32px;
  margin-bottom: 50px;
  padding-bottom: 50px;
  margin-left: 90px;
  float: left;
`;

export const Button = styled.button`
  background-color: #c2fbd7;
  border-radius: 10px;
  box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px;
  color: green;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 3px 10px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-right: 0px;

  :hover {
  box-shadow: rgba(44,187,99,.35) 0 -25px 18px -14px inset,rgba(44,187,99,.25) 0 1px 2px,rgba(44,187,99,.25) 0 2px 4px,rgba(44,187,99,.25) 0 4px 8px,rgba(44,187,99,.25) 0 8px 16px,rgba(44,187,99,.25) 0 16px 32px;
  transform: scale(1.02) ;
  }
`;

export const ButtonProximo = styled.button`
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

export const ButtonAposentar = styled.button`
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
  width: 90px;
  height: 25px;

  :hover {
    box-shadow: rgba(0,128,0,.35) 0 -25px 18px -14px inset,rgba(0,128,0,.35) 0 1px 2px,rgba(0,128,0,.35) 0 2px 4px,rgba(0,128,0,.35) 0 4px 8px,rgba(0,128,0,.35) 0 8px 16px,rgba(0,128,0,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export const ButtonAposentados = styled.button`
  --background-color: #98FB98;
  background-color: silver;
  border-radius: 100px;
  box-shadow: rgba(0,128,0, .2) 0 -25px 18px -14px inset,rgba(0,128,0, .15) 0 1px 2px,rgba(0,128,0, .15) 0 2px 4px,rgba(0,128,0, .15) 0 4px 8px,rgba(0,128,0, .15) 0 8px 16px,rgba(0,128,0, .15) 0 16px 32px;
  color: lightblck;
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
  width: 90px;
  height: 25px;

  :hover {
    box-shadow: rgba(0,128,0,.35) 0 -25px 18px -14px inset,rgba(0,128,0,.35) 0 1px 2px,rgba(0,128,0,.35) 0 2px 4px,rgba(0,128,0,.35) 0 4px 8px,rgba(0,128,0,.35) 0 8px 16px,rgba(0,128,0,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export const TextArea = styled.textarea `
  padding: 10px;
  margin-bottom: 20px;

  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

export const ButtonLink = styled.button`
  background: none;
  border: none;
  color: blue;
  cursor: pointer;
  font: inherit;
  padding: 0;
  text-decoration: underline;
  font-weight: 400;
  font-size: 14px;
  text-decoration: none;
  margin-left: 170px;

  &:hover {
  color: darkblue;
  text-decoration: none;
}
`;

export const StyledSelect = styled(Select)`
  margin-bottom: 20px;
  width: 450px;
  border-radius: 4px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

export const StyledSelectForUser = styled.select`
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
  outline: none;
  background: white;
  color: grey;
  margin-bottom: 20px;
  width: 450px;
  font-size: 16px;
  outline: none;

  ::placeholder {
    font-size: 16px;
  }

  &:focus {
    border-color: #7eff00;
  }
`;


export const DownloadButton = styled.button`
  margin: 16px;
  width: 100px;
`; 

export const FileInput = styled.input.attrs({ type: 'file' })`
  /* Add your file input styles here */
`;

export const TextInput = styled.textarea`
  height: 150px;
`;

const MainContainer = styled.div`
  float: left;
  width: 100%;
  text-align: center;
  min-height: 600px;
`;  

const CardTopo = styled.div`
  max-width: 645px;
  position: absolute;
  top: 100px;
  left: 46%;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    max-width: 80%; /* Cambia el ancho máximo para dispositivos móviles */
    top: 50px; /* Cambia la posición superior para dispositivos móviles */
    transform: translate(-50%, 0); /* Cambia la transformación para dispositivos móviles */
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 645px;
  position: absolute;
  top: 160px;
  left: 50%;
  transform: translate(-57%, -8%); 

  @media (max-width: 768px) {
    max-width: 100%;
    top: 150px;
    transform: translate(-50%, 0); 
    flex-direction: row; /* Mudança para duas colunas */
    align-items: flex-start; /* Alinhamento dos elementos na parte superior */
    
    & > div {
      flex-basis: 48%; /* Largura de 48% para cada card */
      margin-bottom: 10px; /* Espaço entre os cards */
    }
  }    
`; 

const UploadsContainer = styled.div`
  margin-top: 70px;
`;