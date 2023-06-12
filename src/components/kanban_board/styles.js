import styled from 'styled-components';


export const Header = styled.div`
  background: #054d00;
  color: #7eff00;
  width: 2400px;
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
  justify-content: space-between;
  background: #F9FAFB;
  width: 2400px;
`;

export const Column = styled.div`
  min-width: 300px;
  background-color: #FFF;
  margin-right: 8px;
  position: relative;
  border-radius: 5px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  h2 {
    min-height: 80px;
    text-align: center;
  }

  h3 {
    text-transform: capitalize;
  }

  h4 {
   text-align: center;
  }

  :hover {

  }
`;

export const Card = styled.div`
  background-color: ${(props) => props.showingColumn ? 'red' : '#fff'};
  border-radius: 5px;
  padding: 10px;
  cursor: move;
  border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
  width: 250px;

  h3 {
    color: ${(props) => props.scoreColor};
  }
`;
