import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  background: rgb(235,243,231);
  background: linear-gradient(90deg, rgba(235,243,231,1) 0%, rgba(240,240, 240,1) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({collapsed}) => collapsed ? "96vw" : "85vw"};
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