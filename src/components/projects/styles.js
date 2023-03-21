import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  background: var(--body-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-bottom: 32px;
`;

export const TableContainer = styled.div`
  display: flex;
  width: 90%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 20px;
`;

export const Input = styled.input`
  padding: 10px;
  width: 350px;
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
  outline: none;

  ::placeholder {
    font-size: 16px;
  }

  &:focus {
    border-color: #7eff00;
  }
`;

export const StyledSelect = styled.select`
  padding: 10px;
  width: 350px;
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
  outline: none;
  margin-left: 16px;
  background: white;

  ::placeholder {
    font-size: 16px;
  }

  &:focus {
    border-color: #7eff00;
  }
`;