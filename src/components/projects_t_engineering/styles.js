import styled from 'styled-components';
import Select from "react-select";
import InputMask from "react-input-mask";

export const Container = styled.div`
  margin: 4em;
  h2 {
    color: #054d00;
    margin-bottom: 36px;
  }
  height: 100vh;
  width: 100vw;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 60vw;
`;

export const Column = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 32px;
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
  justify-content: flex-end;
  align-items: center;
  height: 5vw;
  width: 93vw;
  margin-top: 32px;
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
  /* Add your file input styles here */
`;
export const TextInput = styled.input.attrs({ type: 'text' })`
  /* Add your text input styles here */
`;