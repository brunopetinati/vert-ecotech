import styled from 'styled-components';
import Select from "react-select";
import InputMask from "react-input-mask";


// caso você queira transformar o css da parte interna de projetos, mais espeficiamente para suas abas
// verificar o arquivo /project_tabs/styles.js
// aqui de nada alterará lá

export const Container = styled.div`
  display:flex;
  flex-direction: column;
  width: ${({collapsed}) => collapsed ? "110vw" : "120vw"};
  floa: left;
  margin-left: 220px;

  @media screen and (max-width: 768px) {
    --display: flex;
    --flex-direction: row;
    height: 100%;
    width: 100vw;
  }  
`;


export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  width: 80%;
  height: 100%;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 10px;
  font-weight: 700;
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
  justify-content: flex-end;
  align-items: center;
  height: 5vw;
  width: 69vw;
  margin-top: -20px;
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

export const ListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  border: 2px solid #ddd;
  border-radius: 50px;  
  transition: background-color 0.3s;
  align-text: left;
  color: rgb(79,79,79);

  width: 57vw;
  margin-top: 5px;
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

export const ListItemText = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left !important;
  margin-left: 35px;
  color: #363636;
  font-size: 9pt;
  width: 450px;
`;

export const ListItemTextResposta = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left !important;
  margin-left: 50px;
  color: rgb(79,79,79);
  font-size: 8pt;
  width: 450px;
`;

export const StyledButtonEditar = styled.button`
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
  width: 120px;
  height: 25px;
  z-index: 1;

  :hover {
    box-shadow: rgba(0,128,0,.35) 0 -25px 18px -14px inset,rgba(0,128,0,.35) 0 1px 2px,rgba(0,128,0,.35) 0 2px 4px,rgba(0,128,0,.35) 0 4px 8px,rgba(0,128,0,.35) 0 8px 16px,rgba(0,128,0,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export const StyledButtonVoltar = styled.button`
  background-color: #4682B4;
  border-radius: 100px;
  box-shadow: rgba(70,130,180, .2) 0 -25px 18px -14px inset,rgba(70,130,180, .15) 0 1px 2px,rgba(70,130,180, .15) 0 2px 4px,rgba(70,130,180, .15) 0 4px 8px,rgba(70,130,180, .15) 0 8px 16px,rgba(70,130,180, .15) 0 16px 32px;
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
  width: 60px;
  height: 25px;
  z-index: 1;

  :hover {
    box-shadow: rgba(70,130,180,.35) 0 -25px 18px -14px inset,rgba(70,130,180,.35) 0 1px 2px,rgba(70,130,180,.35) 0 2px 4px,rgba(70,130,180,.35) 0 4px 8px,rgba(70,130,180,.35) 0 8px 16px,rgba(70,130,180,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;