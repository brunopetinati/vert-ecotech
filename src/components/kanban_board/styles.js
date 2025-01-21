import styled from 'styled-components';


export const Header = styled.div`
  background: #054d00;
  color: #7eff00;
  width: 2690px;
  height: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 32px;


  font-family: Verdana, Geneva, sans-serif;
  font-size: 25px;
  letter-spacing: 1.5px;
  word-spacing: 2px;
  font-weight: normal;
  text-decoration: rgb(68, 68, 68);
`;

export const Container = styled.div`
  display: flex;
  background: #F9FAFB;
  width: 98vw;
`;

export const Column = styled.div`
  width: 110px;
  background-color: #E9F9EC;
  margin-right: 8px;
  position: relative;
  border-radius: 5px;
  padding: 5px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;


  h4 {
    text-align: center;
    min-height: 30px;
    border-bottom: 1px solid silver;
    font-weight: 400;
    font-size: 9pt;
    color: #1bb55e;
    margin-bottom: 25px;
  }

`;

export const CardContainer = styled.div`
  background-color: ${(props) => props.showingColumn ? 'red' : '#fff'};
  border-radius: 5px;
  padding: 10px;
  cursor: move;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.30) 3px 3px 8px 3px;
  width: 90px;

  h3 {
    color: ${(props) => props.scoreColor};
  }
`;
