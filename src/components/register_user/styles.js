import styled from 'styled-components';
import Background from '../../assets/fundo.jpg'
import InputMask from "react-input-mask";


export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

export const Input = styled(InputMask)`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  font-size: 9pt;
  background-color: rgba(255, 255, 255, 0.2);
  color: #eeeeee;
  outline: none;
  outline-style: none;
  border: none;
  border-bottom: solid #eeeeee 1px;
  width: 280px !important;
  font-style: italic;


  ::placeholder {
    color: #ffffff;
  }

  :hover {
    color: #fff;
    --font-size: 22px;
    font-weight: bold; 
  }
`;

export const Button = styled.button`
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  background-color: #4caf50;
  color: #ffffff;
  font-size: 1rem;
  margin: 10px;
  cursor: pointer;
  width: 140px;
`;

export const Img = styled.img`
  width: 300px;
  height: 150px;
`;

export const StyledButtonVoltar = styled.button`
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
  border: 1.0px solid white;
  font-size: 14px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-right: 65px;
  width: 140px;
  height: 40px;

  :hover {
    box-shadow: rgba(0,128,0,.35) 0 -25px 18px -14px inset,rgba(0,128,0,.35) 0 1px 2px,rgba(0,128,0,.35) 0 2px 4px,rgba(0,128,0,.35) 0 4px 8px,rgba(0,128,0,.35) 0 8px 16px,rgba(0,128,0,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export const StyledButtonCadastrar = styled.button`
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
  border: 1.0px solid white;
  font-size: 14px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-right: 65px;
  width: 140px;
  height: 40px;

  :hover {
    box-shadow: rgba(0,128,0,.35) 0 -25px 18px -14px inset,rgba(0,128,0,.35) 0 1px 2px,rgba(0,128,0,.35) 0 2px 4px,rgba(0,128,0,.35) 0 4px 8px,rgba(0,128,0,.35) 0 8px 16px,rgba(0,128,0,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export const Span = styled.span`
  font-style: italic;
  font-size: 10pt;
  padding: 10px;
`;