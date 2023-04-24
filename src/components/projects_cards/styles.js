import styled from 'styled-components';
import { getScoreColor } from '../../constants/functions';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  overflow-x: auto;
  overflow-y: auto;
  height: 79vh;

`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #f5f5f5;
  width: 220px;
  height: 350px; /* set a fixed height for all cards */
  border-radius: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* prevent content overflow */
  :hover {
    cursor: pointer;
  }
`;


export const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #d1e7dd;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #054d00;
  overflow: hidden;
  height: 35px;
`;

export const CardBody = styled.div`
  padding: 10px;
  font-size: 14px;
  height: 200px;
  background: #f5f5f5;
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
  border-radius: 16px;
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
  border: 1px solid ${props => getScoreColor(props.score)};
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


