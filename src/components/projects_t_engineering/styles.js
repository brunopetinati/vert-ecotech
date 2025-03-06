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
  padding: 10px;
  margin-bottom: 20px;
  width: 430px;
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 8px;
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
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-right: 16px;

  :hover {
  box-shadow: rgba(44,187,99,.35) 0 -25px 18px -14px inset,rgba(44,187,99,.25) 0 1px 2px,rgba(44,187,99,.25) 0 2px 4px,rgba(44,187,99,.25) 0 4px 8px,rgba(44,187,99,.25) 0 8px 16px,rgba(44,187,99,.25) 0 16px 32px;
  transform: scale(1.02) ;
  }
`;

export const TextArea = styled.textarea`
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
  margin-left: 80px;
`;

export const TextInput = styled.textarea`
  height: 150px;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-left: -140px;
  margin-top: 5px;
`;

export const List2 = styled.ul`
  list-style: none;
  padding: 0;
  margin-left: -10px;
  margin-top: 0px;
`;

export const ListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  border: 2px solid #ddd;
  border-radius: 50px;  
  transition: background-color 0.3s;
  align-text: left;
  color: rgb(79,79,79);

  --width: 65vw;
  --margin: 10px;
  --min-height: 25px;

  &:hover {
    background-color: #e0f2f1;
  }

  div {
    --width: 100%;
    --display: flex;
    --flex-direction: row;
    --align-items: center;
    --justify-content: center;    
  }

  span {
    font-size: 20px;
  }
`;

export const ContainerNewButton = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  border: 2px solid #ddd;
  border-radius: 50px;  
  transition: background-color 0.3s;
  text-align: left;
  color: rgb(79,79,79);
  background-color: white; /* Alterado para branco */
  width: 89%;
  min-height: 25px;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 50px;
  float: left;
  position: relative; /* Mantendo o posicionamento relativo */
  top: 50px; /* Movendo para baixo */

  &:hover {
    background-color: #e0f2f1;
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;    
    width: 100%;
  }

  span {
    font-size: 20px;
  }
`;


export const StyledButtonCancelar = styled.button`
  background-color: #FFA07A;
  border-radius: 100px;
  box-shadow: rgba(255,20,147, .2) 0 -25px 18px -14px inset,rgba(255,20,147, .15) 0 1px 2px,rgba(255,20,147, .15) 0 2px 4px,rgba(255,20,147, .15) 0 4px 8px,rgba(255,20,147, .15) 0 8px 16px,rgba(255,20,147, .15) 0 16px 32px;
  color: #363636;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 3px 5px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left: 0px;
  width: 55px;
  height: 20px;

  :hover {
    box-shadow: rgba(255,20,147,.35) 0 -25px 18px -14px inset,rgba(255,20,147,.35) 0 1px 2px,rgba(255,20,147,.35) 0 2px 4px,rgba(255,20,147,.35) 0 4px 8px,rgba(255,20,147,.35) 0 8px 16px,rgba(255,20,147,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export const StyledButtonDownload = styled.button`
  background-color: #00FF7F;
  border-radius: 100px;
  box-shadow: rgba(255,20,147, .2) 0 -25px 18px -14px inset,rgba(255,20,147, .15) 0 1px 2px,rgba(255,20,147, .15) 0 2px 4px,rgba(255,20,147, .15) 0 4px 8px,rgba(255,20,147, .15) 0 8px 16px,rgba(255,20,147, .15) 0 16px 32px;
  color: #363636;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 3px 5px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left: 0px;
  width: 55px;
  height: 20px;

  :hover {
    box-shadow: rgba(255,20,147,.35) 0 -25px 18px -14px inset,rgba(255,20,147,.35) 0 1px 2px,rgba(255,20,147,.35) 0 2px 4px,rgba(255,20,147,.35) 0 4px 8px,rgba(255,20,147,.35) 0 8px 16px,rgba(255,20,147,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export const StyledButtonLogs = styled.button`
  background-color: #D8BFD8;
  border-radius: 100px;
  box-shadow: rgba(255,20,147, .2) 0 -25px 18px -14px inset,rgba(255,20,147, .15) 0 1px 2px,rgba(255,20,147, .15) 0 2px 4px,rgba(255,20,147, .15) 0 4px 8px,rgba(255,20,147, .15) 0 8px 16px,rgba(255,20,147, .15) 0 16px 32px;
  color: #363636;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 3px 5px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left: 0px;
  width: 55px;
  height: 20px;

  :hover {
    box-shadow: rgba(255,20,147,.35) 0 -25px 18px -14px inset,rgba(255,20,147,.35) 0 1px 2px,rgba(255,20,147,.35) 0 2px 4px,rgba(255,20,147,.35) 0 4px 8px,rgba(255,20,147,.35) 0 8px 16px,rgba(255,20,147,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;
//file upload
export const ListItemDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  border: 2px solid #ddd;
  border-radius: 50px;  
  transition: background-color 0.3s;
  align-text: left;
  color: rgb(79,79,79);

  width: 1000px;  // Define a largura diretamente aqui
  background-color: rgb(235,235,235);  // Define a cor de fundo diretamente aqui
  margin-top: 3px;
  min-height: 25px;

  &:hover {
    background-color: #e0f2f1;
  }


  span {
    font-size: 20px;
  }
`;


export const ListItemDivContract = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 2px solid #ddd;
  border-radius: 10px;
  transition: background-color 0.3s;
  color: rgb(79, 79, 79);
  width: 65vw;
  margin-top: 3px;
  min-height: 25px;
  padding: 10px 20px;

  &:hover {
    background-color: #e0f2f1;
  }
`;

export const ContractContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 20px;
`;

export const ContractDetails = styled.div`
 display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  text-align: center;
  width: 100%;
  gap: 20px; /* Espaçamento entre os blocos */
`;

export const ContractLabels = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Alinha os textos à direita */
  text-align: right;
  color: rgb(79,79,79);
  font-size: 10pt;
`;

export const ContractValues = styled.div`
   display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alinha os valores à esquerda */
  text-align: left;
  color: rgb(79,79,79);
  font-size: 10pt;
`;

export const BlockchainText = styled.div`
  color: rgb(79, 79, 79);
  font-size: 10pt;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%; /* Garante centralização dentro do container */
`;



export const StyledButtonConfirmarDocs = styled.button`
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
  margin-right: 10px;
  width: 120px;
  height: 25px;

  :hover {
    box-shadow: rgba(0,128,0,.35) 0 -25px 18px -14px inset,rgba(0,128,0,.35) 0 1px 2px,rgba(0,128,0,.35) 0 2px 4px,rgba(0,128,0,.35) 0 4px 8px,rgba(0,128,0,.35) 0 8px 16px,rgba(0,128,0,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export const StyledButtonSalvar = styled.button`
  --background-color: #98fb98;
  background-color: rgba(0, 80, 0, 0.7);
  border-radius: 100px;
  box-shadow: rgba(0, 128, 0, 0.2) 0 -25px 18px -14px inset,
    rgba(0, 128, 0, 0.15) 0 1px 2px, rgba(0, 128, 0, 0.15) 0 2px 4px,
    rgba(0, 128, 0, 0.15) 0 4px 8px, rgba(0, 128, 0, 0.15) 0 8px 16px,
    rgba(0, 128, 0, 0.15) 0 16px 32px;
  color: ${(props) => (props.disabled ? "" : "white")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  display: inline-block;
  font-family: CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif;
  padding: 3px 5px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 11px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-right: 10px;
  width: 120px;
  height: 25px;



  :hover {
    box-shadow: rgba(0, 128, 0, 0.35) 0 -25px 18px -14px inset,
      rgba(0, 128, 0, 0.35) 0 1px 2px, rgba(0, 128, 0, 0.35) 0 2px 4px,
      rgba(0, 128, 0, 0.35) 0 4px 8px, rgba(0, 128, 0, 0.35) 0 8px 16px,
      rgba(0, 128, 0, 0.35) 0 16px 32px;
    transform: scale(1.02);
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export const StyledButtonSalvarUnico = styled.button`
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
  margin-right: 10px;
  width: 25px;
  height: 25px;

  :hover {
    box-shadow: rgba(0,128,0,.35) 0 -25px 18px -14px inset,rgba(0,128,0,.35) 0 1px 2px,rgba(0,128,0,.35) 0 2px 4px,rgba(0,128,0,.35) 0 4px 8px,rgba(0,128,0,.35) 0 8px 16px,rgba(0,128,0,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export const StyledButtonNovo = styled.button`
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
  margin-right: 10px;
  width: 120px;
  height: 25px;

  :hover {
    box-shadow: rgba(0,128,0,.35) 0 -25px 18px -14px inset,rgba(0,128,0,.35) 0 1px 2px,rgba(0,128,0,.35) 0 2px 4px,rgba(0,128,0,.35) 0 4px 8px,rgba(0,128,0,.35) 0 8px 16px,rgba(0,128,0,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export const StyledButtonPesquisar = styled.button`
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
  margin-right: 10px;
  width: 120px;
  height: 25px;

  :hover {
    box-shadow: rgba(0,128,0,.35) 0 -25px 18px -14px inset,rgba(0,128,0,.35) 0 1px 2px,rgba(0,128,0,.35) 0 2px 4px,rgba(0,128,0,.35) 0 4px 8px,rgba(0,128,0,.35) 0 8px 16px,rgba(0,128,0,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export const StyledButtonIniciarEtapa = styled.button`
  background-color: #F4A460;
  border-radius: 100px;
  box-shadow: rgba(255,69,0, .2) 0 -25px 18px -14px inset,rgba(255,69,0, .15) 0 1px 2px,rgba(255,69,0, .15) 0 2px 4px,rgba(255,69,0, .15) 0 4px 8px,rgba(255,69,0, .15) 0 8px 16px,rgba(255,69,0, .15) 0 16px 32px;
  color: #363636;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 3px 5px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left: 0px;
  width: 60px;
  height: 20px;

  :hover {
    box-shadow: rgba(255,69,0,.35) 0 -25px 18px -14px inset,rgba(255,69,0,.35) 0 1px 2px,rgba(255,69,0,.35) 0 2px 4px,rgba(255,69,0,.35) 0 4px 8px,rgba(255,69,0,.35) 0 8px 16px,rgba(255,69,0,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export const StyledButtonIniciado = styled.button`
  background-color: #FFFF00;
  border-radius: 100px;
  box-shadow: rgba(255,255,0, .2) 0 -25px 18px -14px inset,rgba(255,255,0, .15) 0 1px 2px,rgba(255,255,0, .15) 0 2px 4px,rgba(255,255,0, .15) 0 4px 8px,rgba(255,255,0, .15) 0 8px 16px,rgba(255,255,0, .15) 0 16px 32px;
  color: #363636;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 3px 5px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left: 0px;
  width: 60px;
  height: 20px;

  :hover {
    box-shadow: rgba(255,255,0,.35) 0 -25px 18px -14px inset,rgba(255,255,0,.35) 0 1px 2px,rgba(255,255,0,.35) 0 2px 4px,rgba(255,255,0,.35) 0 4px 8px,rgba(255,255,0,.35) 0 8px 16px,rgba(255,255,0,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export const StyledButtonCriarContract = styled.button`
  background-color: #98FB98;
  border-radius: 100px;
  box-shadow: rgba(0,255,0, .2) 0 -25px 18px -14px inset,rgba(0,255,0, .15) 0 1px 2px,rgba(0,255,0, .15) 0 2px 4px,rgba(0,255,0, .15) 0 4px 8px,rgba(0,255,0, .15) 0 8px 16px,rgba(0,255,0, .15) 0 16px 32px;
  color: #363636;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 3px 5px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left: 0px;
  width: 80px;
  height: 20px;

  :hover {
    box-shadow: rgba(0,255,0,.35) 0 -25px 18px -14px inset,rgba(0,255,0,.35) 0 1px 2px,rgba(0,255,0,.35) 0 2px 4px,rgba(0,255,0,.35) 0 4px 8px,rgba(0,255,0,.35) 0 8px 16px,rgba(0,255,0,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export const StyledButtonMintNft = styled.button`
  background-color: #F5DEB3;
  border-radius: 100px;
  box-shadow: rgba(255,20,147, .2) 0 -25px 18px -14px inset,rgba(255,20,147, .15) 0 1px 2px,rgba(255,20,147, .15) 0 2px 4px,rgba(255,20,147, .15) 0 4px 8px,rgba(255,20,147, .15) 0 8px 16px,rgba(255,20,147, .15) 0 16px 32px;
  color: #363636;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 3px 5px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left: 0px;
  width: 55px;
  height: 20px;

  :hover {
    box-shadow: rgba(255,20,147,.35) 0 -25px 18px -14px inset,rgba(255,20,147,.35) 0 1px 2px,rgba(255,20,147,.35) 0 2px 4px,rgba(255,20,147,.35) 0 4px 8px,rgba(255,20,147,.35) 0 8px 16px,rgba(255,20,147,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export const StyledButtonShowNft = styled.button`
  background-color: #7FFF00;
  border-radius: 100px;
  box-shadow: rgba(255,20,147, .2) 0 -25px 18px -14px inset,rgba(255,20,147, .15) 0 1px 2px,rgba(255,20,147, .15) 0 2px 4px,rgba(255,20,147, .15) 0 4px 8px,rgba(255,20,147, .15) 0 8px 16px,rgba(255,20,147, .15) 0 16px 32px;
  color: #363636;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 3px 5px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left: 0px;
  width: 55px;
  height: 20px;

  :hover {
    box-shadow: rgba(255,20,147,.35) 0 -25px 18px -14px inset,rgba(255,20,147,.35) 0 1px 2px,rgba(255,20,147,.35) 0 2px 4px,rgba(255,20,147,.35) 0 4px 8px,rgba(255,20,147,.35) 0 8px 16px,rgba(255,20,147,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export const StyledButtonSubstituirNft = styled.button`
  background-color: #FFFF00;
  border-radius: 100px;
  box-shadow: rgba(255,20,147, .2) 0 -25px 18px -14px inset,rgba(255,20,147, .15) 0 1px 2px,rgba(255,20,147, .15) 0 2px 4px,rgba(255,20,147, .15) 0 4px 8px,rgba(255,20,147, .15) 0 8px 16px,rgba(255,20,147, .15) 0 16px 32px;
  color: #363636;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  --padding: 3px 5px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left: 0px;
  width: 55px;
  height: 20px;

  :hover {
    box-shadow: rgba(255,20,147,.35) 0 -25px 18px -14px inset,rgba(255,20,147,.35) 0 1px 2px,rgba(255,20,147,.35) 0 2px 4px,rgba(255,20,147,.35) 0 4px 8px,rgba(255,20,147,.35) 0 8px 16px,rgba(255,20,147,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;
//estou mexendo aquiiii
export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr); 
  grid-template-rows: repeat(3, auto);
  gap: 1px;
  position: relative; 
  justify-content: start; 
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(6, auto);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const CardTopo = styled.div`
  //width: 100%;
  //margin-left: -13px;
  position: relative; 
`;

export const sytleFileUpload = {
  //css do fileUpload
  centerTitle: {
    textAlign: 'center',
  },

  containerFileUpload: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',  // Ajusta a largura para 90% da tela
    maxWidth: '1200px', // Limita a largura máxima
    minHeight: '300px',
    border: '2px dashed #ccc',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
    padding: '20px',
    marginTop: '20px',  // Margem superior ajustada
    textAlign: 'center',
    boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
    position: 'relative',
    margin: '0 auto',  // Centraliza horizontalmente
    // Remove o 'transform' para garantir que o contêiner não se mova
  },
  

  buttonContainer: {
    float: 'left',
    backgroundColor: 'lightgrey',
    height: '50px',
    borderRadius: '100px 0px 0px 100px',
    width: '180px',
  },
  
  styleSmall: {
    float: 'left',
    width: '80px',
    color: 'green',
  },

  containerTopico: {
    cursor: 'pointer', 
    float: 'left', 
    marginLeft: '-80px', 
    width: '200px', 
    height: '20px',
  },

  // Estilo para a barra de progresso
  progressBarContainer: {
    width: '900px',
    height: '35px', // Aumento da altura para melhor acomodação
    //backgroundColor: 'green',
    marginLeft: '-90px',
    display: 'flex',
    alignItems: 'center', // Alinha os itens verticalmente no centro
    justifyContent: 'flex-start', // Alinha todos os itens à esquerda
    gap: '70px', // Espaço entre os elementos
    paddingLeft: '10px', // Pequeno espaço na esquerda para não grudar
  },
  

  progressBarTitle: {
    //textAlign: 'left',
    fontWeight: 'bold',
    color: 'black',
    marginLeft: '10px',
    //marginLeft: '-10px', // Ajuste conforme necessário
  },
  
  progressBarLabel: {
    //float: 'left',
    //Width: '420px',
    //height: '35px',
    fontSize: '8.6pt',
    //backgroundColor: 'pink',
    marginLeft: '-100px',
  },

  progressBar: {
    marginLeft: '-60px', // Ajusta a posição da barra de progresso
    width: '250px'
  },
  
};

export const styles = {
  tabletMenu: {
    width: '100%', 
    //maxWidth: '100%', 
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    position: 'relative',
    top: '0', 
    //background: 'green',
    maxHeight: '100vh',
    boxSizing: 'border-box',
    justifyContent: 'center', /* Centraliza horizontalmente */
    alignItems: 'center',     /* Centraliza verticalmente */
    overflow: 'hidden',
  },
  menu: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)', 
    gridTemplateRows: 'repeat(2, auto)',   
    gap: '5px',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80vw', /* Largura relativa à largura da tela */
    maxWidth: '80vw', 
    height: '20vh', /* Altura relativa à altura da tela */
    padding: '0 0px',
  },
  

  menuItem: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'left',
    padding: '1vw',  // Ajusta o padding de acordo com o viewport
    width: '90vw',  // Largura baseada no viewport
    maxWidth: '15vw', // Limita a largura a 20% da largura da tela
    minWidth: '10vw', // Garantir que a largura mínima seja adequada para o conteúdo
    height: '1vw',  // Altura baseada no viewport
    borderRadius: '10px',
    backgroundColor: '#f8f8f8',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
  
    // Responsividade para telas menores com media queries
    '@media (max-width: 1024px)': {
      padding: '2vw', // Ajuste o padding para telas médias
      width: '80vw', // Ajuste a largura para que fique mais proporcional
      height: '6vw', // Ajuste a altura proporcionalmente
    },
  
    '@media (max-width: 768px)': {
      padding: '3vw', // Mais padding para telas menores
      width: '70vw', // Ajusta a largura em telas menores
      height: '7vw',  // Ajusta a altura em telas menores
    },
  
    '@media (max-width: 480px)': {
      padding: '4vw', // Aumenta o padding em telas muito pequenas
      width: '60vw', // Ajusta a largura para telas de celular
      height: '8vw',  // Ajuste de altura no mobile
    },
  },
  
  pagina: {
    display: 'flex',
    flexDirection: 'column',
    //justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    width: '100%',  // Ocupa toda a largura disponível
    maxWidth: '60vw',  // Limita a largura máxima
    marginTop: '20px', // Espaço superior para separar do menu
    marginLeft: 'auto',
    marginRight: 'auto', // Centraliza horizontalmente
    textAlign: 'left',
    minHeight: '100vh', // Garante que a altura mínima ocupe toda a tela
    
    // Responsividade:
    '@media screen and (max-width: 1024px)': {
      maxWidth: '80vw',  // Aumenta a largura em telas menores
      marginTop: '20px', // Ajusta a margem superior
      marginLeft: '10px',
      marginRight: '10px',
    },
    
    '@media screen and (max-width: 768px)': {
      maxWidth: '90vw',  // Ajusta ainda mais a largura
      marginTop: '10px',
    },

    '@media screen and (max-width: 480px)': {
      maxWidth: '100vw',  // Ocupa toda a largura da tela em dispositivos pequenos
      marginTop: '0', 
    },
  },
  
};
  
