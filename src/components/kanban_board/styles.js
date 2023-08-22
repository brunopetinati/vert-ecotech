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
  width: 10vw;
  background-color: #FFF;
  margin-right: 8px;
  position: relative;
  border-radius: 5px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;


  h4 {
   text-align: center;
   min-height: 50px; 
   border-bottom: 1px solid black;
   font-weight: 400;
  }

`;

export const CardContainer = styled.div`
  background-color: ${(props) => props.showingColumn ? 'red' : '#fff'};
  border-radius: 5px;
  padding: 10px;
  cursor: move;
  border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
  width: 130px;

  h3 {
    color: ${(props) => props.scoreColor};
  }
`;
