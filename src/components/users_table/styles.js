import styled from 'styled-components';

export const StyledTable = styled.table`
  width: 60vw;
  border-collapse: collapse;
  margin-top: 20px;
  margin: 0 auto; 
`;

export const StyledTableHead = styled.thead`
  background-color: #f2f2f2;
`;

export const StyledTableRow = styled.tr`
  border-bottom: 2px solid #ddd;
  transition: background-color 0.3s;
  color: #363636;

  &:hover {
    background-color: #e0f2f1;
  }
`;

export const StyledTableCell = styled.td`
  padding: 10px;
  text-align: left;
  color: rgb(79,79,79);
  font-size: 9pt;
  width: 450px;  
`;

export const StyledTableHeader = styled.th`
  padding: 10px;
  text-align: left;
  font-weight: 700;
  color: #363636;
  font-size: 9pt;
  width: 450px;  
  background-color: #D3D3D3;
  --border-radius: 30px;
`;

export const StyledViewLink = styled.span`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;

export const StyledButtonVisualizar = styled.button`
  background-color: #87CEFA;
  border-radius: 100px;
  box-shadow: rgba(0,255,255, .2) 0 -25px 18px -14px inset,rgba(0,255,255, .15) 0 1px 2px,rgba(0,255,255, .15) 0 2px 4px,rgba(0,255,255, .15) 0 4px 8px,rgba(0,255,255, .15) 0 8px 16px,rgba(0,255,255, .15) 0 16px 32px;
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
  float: left;

  :hover {
    box-shadow: rgba(0,255,255,.35) 0 -25px 18px -14px inset,rgba(0,255,255,.35) 0 1px 2px,rgba(0,255,255,.35) 0 2px 4px,rgba(0,255,255,.35) 0 4px 8px,rgba(0,255,255,.35) 0 8px 16px,rgba(0,255,255,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;