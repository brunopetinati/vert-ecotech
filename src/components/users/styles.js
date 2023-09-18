import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  background: var(--body-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({collapsed}) => collapsed ? "96vw" : "85vw"};

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
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

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const TableContainer = styled.div`
  display: flex;
  width: 90%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 20px;

  @media screen and (max-width: 768px) {
    width: 90vw;
    margin: 0 auto;
  }
`;

export const Input = styled.input`
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

  @media screen and (max-width: 768px) {
    margin-left: 20px;
    margin-top: 64px;
    width: 75%;
    font-size: 12px;
    
    ::placeholder {
      font-size: 12px; 
    }
  }
`;

export const StyledSelect = styled.select`
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

  @media screen and (max-width: 768px) {
    margin-left: 20px;
    margin-top: 64px;
    width: 81%;
    font-size: 12px;
    
    ::placeholder {
      font-size: 12px; 
    }
  }
`;

export const MarginForCelphone = styled.div`
  @media screen and (max-width: 768px) {
    margin-top: 32px;
  }
`;