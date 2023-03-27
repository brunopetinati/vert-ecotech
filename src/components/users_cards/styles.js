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
`;

export const CardHeader = styled.div`
  background-color: #f2f2f2;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
`;

export const CardBody = styled.div`
  padding: 10px;
  font-size: 14px;
`;

export const CardFooter = styled.div`
  background-color: #f2f2f2;
  padding: 10px;
  font-size: 12px;
  text-align: right;
`;
