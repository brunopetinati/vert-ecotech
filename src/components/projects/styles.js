import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 90%;
  font-family: 'Inter', sans-serif;
  color: #000; 
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 90%;
  margin-bottom: 32px;
`;

export const TableContainer = styled.div`
  display: flex;
  width: 90%;
`;