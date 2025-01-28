import styled from 'styled-components';
import Select from "react-select";
import InputMask from "react-input-mask";
import imgExcluir from '../../../src/assets/icons/delete.png';

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
  align-text: left;
  color: rgb(79,79,79);

  background-color: lightgrey;
  width: 89%;
  margin-top: 20px;
  float: left;
  min-height: 25px;
  height: 50px;
  margin-bottom: 50px;

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
`

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

export const ListItemDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  border: 2px solid #ddd;
  border-radius: 50px;  
  transition: background-color 0.3s;
  align-text: left;
  color: rgb(79,79,79);

  width: 65vw;
  margin-top: 3px;
  min-height: 25px;

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

export const ListItemDivContract = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  border: 2px solid #ddd;
  border-radius: 10px;  
  transition: background-color 0.3s;
  align-text: left;
  color: rgb(79,79,79);

  width: 65vw;
  margin-top: 3px;
  min-height: 25px;

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
display: flex;
flex-wrap: wrap;
justify-content: space-between;
max-width: 645px;
position: absolute;
top: 140px;
left: 55%;
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

export const CardTopo = styled.div`
max-width: 645px;
position: absolute;
top: 100px;
left: 38%;
transform: translate(-50%, -50%);

@media (max-width: 768px) {
  max-width: 80%; /* Cambia el ancho máximo para dispositivos móviles */
  top: 50px; /* Cambia la posición superior para dispositivos móviles */
  transform: translate(-50%, 0); /* Cambia la transformación para dispositivos móviles */
}
`;

export const styles = {
  tabletMenu: {
    width: '1200px', // Mantém a largura do menu
    backgroundColor: 'var(--background-color, #f0f0f0)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto', 
    position: 'relative',// Faz o menu "flutuar" em relação à tela
    bottom: '0', // Alinha o menu à parte inferior da tela
    left: '50%', // Centraliza horizontalmente
    transform: 'translateX(-50%)',
    height: '500px',
    top: '50px',
  },
  menuItem: {
    cursor: 'pointer',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    width: '240px',
  },
  menuItemHover: {
    backgroundColor: 'silver',
    color: '#fff',
  },
  icon: {
    marginRight: '10px',
  },
  pagina: {
    width: '800px',
    padding: '20px',
    margin: '0 auto', // Centraliza horizontalmente
    flexDirection: 'column', // Alinha os itens verticalmente
    alignItems: 'center', // Centraliza os itens horizontalmente
    backgroundColor: 'var(--background-color, #f0f0f0)',
  },
  h2: {
    color: '#007BFF',
  },
};