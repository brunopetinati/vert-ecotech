import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Column = styled.div`
  width: 300px;
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 10px;

  h2 {
    min-height: 80px;
    text-align: center;
  }
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  cursor: move;
  color: ${(props) => props.scoreColor};
  border: 1px solid ${(props) => props.scoreColor};
  border-radius: 8px;
  margin-bottom: 8px;
`;
