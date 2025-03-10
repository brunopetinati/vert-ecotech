import styled from 'styled-components';

export const StyledButtonContas = styled.button`
  background-color: #32CD32;
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
  margin-left: 5px;
  margin-top: 10px;
  width: 85px;
  height: 25px;

  :hover {
    box-shadow: rgba(0,255,0,.35) 0 -25px 18px -14px inset,rgba(0,255,0,.35) 0 1px 2px,rgba(0,255,0,.35) 0 2px 4px,rgba(0,255,0,.35) 0 4px 8px,rgba(0,255,0,.35) 0 8px 16px,rgba(0,255,0,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export const StyledButton = styled.button`
  background-color: #BA55D3;
  border-radius: 100px;
  box-shadow: rgba(0,255,0, .2) 0 -25px 18px -14px inset,rgba(0,255,0, .15) 0 1px 2px,rgba(0,255,0, .15) 0 2px 4px,rgba(0,255,0, .15) 0 4px 8px,rgba(0,255,0, .15) 0 8px 16px,rgba(0,255,0, .15) 0 16px 32px;
  color: white;
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
  margin-left: 5px;
  margin-top: 10px;
  width: 80px;
  height: 30px;

  :hover {
    box-shadow: rgba(0,255,0,.35) 0 -25px 18px -14px inset,rgba(0,255,0,.35) 0 1px 2px,rgba(0,255,0,.35) 0 2px 4px,rgba(0,255,0,.35) 0 4px 8px,rgba(0,255,0,.35) 0 8px 16px,rgba(0,255,0,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export const Card = styled.div`
background-color: #fff;
border: 1px solid #ddd;
border-radius: 8px;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
margin: 5px;
padding: 10px;
max-width: 200px;
min-height: 400px;
float: left;
`;

export const CardHeader = styled.h2`
font-size: 8pt;
margin-bottom: 10px;
word-wrap: break-word; 
`;

export const CardContent = styled.div`
font-size: 8pt;
margin-bottom: 5px;
word-wrap: break-word; 
`;

export const CardTitle = styled.h1`
font-size: 8pt;
text-align: center;
word-wrap: break-word; 
`;