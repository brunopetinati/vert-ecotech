import styled from "styled-components";
import InputMask from "react-input-mask";
import Select from 'react-select';


export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: #f5f5f5;
`;

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

export const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 600px;
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
  width: 80%;
  padding: 16px;
`;

export const Label = styled.label`
  margin-bottom: 10px;
  font-weight: 700;
`;

export const ShowInput = styled(InputMask)`
  padding: 10px;
  margin-bottom: 20px;
  
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
  outline: none;
  width: 350px;

  &:focus {
    border-color: #007bff;
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
  margin-top: 50px;
  margin-right: 16px;

  :hover {
  box-shadow: rgba(44,187,99,.35) 0 -25px 18px -14px inset,rgba(44,187,99,.25) 0 1px 2px,rgba(44,187,99,.25) 0 2px 4px,rgba(44,187,99,.25) 0 4px 8px,rgba(44,187,99,.25) 0 8px 16px,rgba(44,187,99,.25) 0 16px 32px;
  transform: scale(1.02) ;
  }
`;

export const IndexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f9fafb;
  width: 100%;
  height: 100%;
`;

export const ProfileContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 900px;
  height: 1200px;
  padding: 4em;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 2;
  background: #fff;
  max-height: 500px;

  h3 {
    display: flex;
    align-self: flex-start;
    color: #054D00;
  }

  @media screen and (min-width: 1920px) {
    width: 1400px;
    height: 1500px;
    padding: 10em;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: auto;
    padding: 2em;
    border-radius: 0;
    box-shadow: none;
    max-height: none;

    h3 {
      align-self: center;
    }
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

export const StyledSelect = styled(Select)`
  margin-bottom: 20px;
  width: 370px  ;
  border-radius: 4px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;