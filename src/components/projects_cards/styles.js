import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  overflow-x: auto;
  overflow-y: auto;
  height: 79vh;
`;

export const Card = styled.div`
  width: 220px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  :hover {
    cursor: pointer;
  }
`;

export const CardHeader = styled.div`
  background-color: #d1e7dd;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #054d00;
`;

export const CardBody = styled.div`
  padding: 10px;
  font-size: 14px;
  min-height: 210px;
`;

export const CardFooter = styled.div`
  background-color: #d1e7dd;
  padding: 10px;
  font-size: 12px;
  text-align: right;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const Score = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: green;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// estou fazendo a cor da pontuação

export const CardWrapper = styled.div`
  width: 300px;
  height: 200px;
  background-color: #d1e7dd;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #173f5f;
`;

export const Description = styled.p`
  font-size: 16px;
  color: #20639b;
`;


