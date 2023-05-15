import styled from 'styled-components';

//https://www.youtube.com/watch?v=pire3zYPKe0

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Column = styled.div`
  width: 300px;
  background-color: #f5f5f5;
  margin-right: 8px;
  position: relative;
  border-radius: 5px;
  padding: 10px;
  height: 90vh;

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

  h3 {
    color: ${(props) => props.scoreColor};
  }
`;
