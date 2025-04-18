import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: #c2fbd7;
  border-radius: 100px;
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
  font-size: 11px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left: 50px;

  :hover {
  box-shadow: rgba(44,187,99,.35) 0 -25px 18px -14px inset,rgba(44,187,99,.25) 0 1px 2px,rgba(44,187,99,.25) 0 2px 4px,rgba(44,187,99,.25) 0 4px 8px,rgba(44,187,99,.25) 0 8px 16px,rgba(44,187,99,.25) 0 16px 32px;
  transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

export const StyledButtonSalvar = styled.button`
  background-color: #559d46;
  border-radius: 100px;
  box-shadow: rgba(128, 128, 128, 0.15) 0 -15px 12px -10px inset, 
              rgba(128, 128, 128, 0.15) 0 1px 2px, 
              rgba(128, 128, 128, 0.15) 0 2px 4px, 
              rgba(128, 128, 128, 0.15) 0 4px 8px, 
              rgba(128, 128, 128, 0.15) 0 8px 16px;
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
  margin-right: 65px;
  width: 140px;
  height: 35px;
  z-index: 1;

  :hover {
    box-shadow: rgba(128, 128, 128, 0.3) 0 -25px 18px -14px inset, 
                rgba(128, 128, 128, 0.3) 0 1px 2px, 
                rgba(128, 128, 128, 0.3) 0 2px 4px, 
                rgba(128, 128, 128, 0.3) 0 4px 8px, 
                rgba(128, 128, 128, 0.3) 0 8px 16px, 
                rgba(128, 128, 128, 0.3) 0 16px 32px;
    transform: scale(1.05);
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
    width: 130px;
    height: 30px;
  }
`;



export const StyledButtonVoltar = styled.button`
  background-color: #3A70B2;
  border-radius: 100px;
  box-shadow: rgba(128, 128, 128, 0.15) 0 -15px 12px -10px inset, 
              rgba(128, 128, 128, 0.15) 0 1px 2px, 
              rgba(128, 128, 128, 0.15) 0 2px 4px, 
              rgba(128, 128, 128, 0.15) 0 4px 8px, 
              rgba(128, 128, 128, 0.15) 0 8px 16px;
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
                rgba(128, 128, 128, 0.3) 0 1px 2px, 
                rgba(128, 128, 128, 0.3) 0 2px 4px, 
                rgba(128, 128, 128, 0.3) 0 4px 8px, 
                rgba(128, 128, 128, 0.3) 0 8px 16px, 
                rgba(128, 128, 128, 0.3) 0 16px 32px;
    transform: scale(1.05);
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
    width: 130px;
    height: 30px;
  }
`;

export const StyledButtonProjetos = styled.button`
  background-color: #228B22;
  border-radius: 10px;
  box-shadow: rgba(0,100,0, .2) 0 -25px 18px -14px inset,rgba(0,100,0, .15) 0 1px 2px,rgba(0,100,0, .15) 0 2px 4px,rgba(0,100,0, .15) 0 4px 8px,rgba(0,100,0, .15) 0 8px 16px,rgba(0,100,0, .15) 0 16px 32px;
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
  width: 130px;
  height: 60px;

  :hover {
    box-shadow: rgba(0,100,0,.35) 0 -25px 18px -14px inset,rgba(0,100,0,.35) 0 1px 2px,rgba(0,100,0,.35) 0 2px 4px,rgba(0,100,0,.35) 0 4px 8px,rgba(0,100,0,.35) 0 8px 16px,rgba(0,100,0,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;