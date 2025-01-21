import styled from 'styled-components';
import InputMask from "react-input-mask";

export const Container = styled.div`
  width: 600px;
  padding: 2em;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 2;
  background: #fff;
  
  h3 {
    color:#054D00;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  --padding: 16px;
  z-index: 1;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Label = styled.label`
  --margin-bottom: 10px;
  --font-weight: 700;
  font-size: 10pt;
  color: rgb(54, 54, 54);
`;

export const ShowInput = styled(InputMask)`
  margin-bottom: 5px;
  border: 2px solid rgb(204, 204, 204);
  border-radius: 4px;
  font-size: 12px;
  outline: none;
  width: 400px;
  background: rgba(245, 245, 245, 0.2);
  margin-top: 5px;

  &:focus {
    border-color: #007bff;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

export const Input = styled(InputMask)`
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

export const Span = styled.span`
  color: #323338;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }
`;

export const ButtonDisplay = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 102%;
`;

export const Button = styled.button`
  background-color: #c2fbd7;
  border-radius: 10px;
  box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px;
  color: green;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-,-apple-system,system-ui,Roboto,sans-serif;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-top: 50px;
  margin-right: 16px;

  :hover {
  box-shadow: rgba(44,187,99,.35) 0 -25px 18px -14px inset,rgba(44,187,99,.25) 0 1px 2px,rgba(44,187,99,.25) 0 2px 4px,rgba(44,187,99,.25) 0 4px 8px,rgba(44,187,99,.25) 0 8px 16px,rgba(44,187,99,.25) 0 16px 32px;
  transform: scale(1.02) ;
  }
`;

export const IndexContainer = styled.div`
  --display: flex;
  --flex-direction: column;
  --justify-content: center;
  --align-items: center;
  --background: #f5f5f5;
  width: 100%;
  height: 100%;
  --margin-left: 200px;
`;

export const ProfileContainerInfo = styled.div`
  --display: flex;
  --flex-direction: column;
  --justify-content: space-around;
  --align-items: center;
  --padding: 4em;
  --border-radius: 20px;
  --box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  --z-index: 2;
  --background: #fff;
  --max-height: 550px;
  --width: ${({collapsed}) => collapsed ? "80vw" : "70vw"};

  h3 {
    display: flex;
    align-self: flex-start;
    color: #054D00;
  }

  @media screen and (max-width: 768px) {
    max-height: 139vh;
  }
`;

export const ButtonContainerIndex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 600px;
  padding: 2em;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 2;
  background: #fff;

  h3 {
    color:#054D00;
  }
`;

export const InnerContainer = styled.div`
  --display: flex;
  --flex-direction: column;
  --justify-content: space-around;
  --align-items: center;
  width: 650px;
  padding: 10px;
  --background: #fff;
  margin-top: 30px;
  -border-radius: 20px;
  --box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  h3 {
    display: flex;
    align-self: flex-start;
    color: #054D00;
  }
`;