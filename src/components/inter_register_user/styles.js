import styled from 'styled-components';
import InputMask from "react-input-mask";
import Select from 'react-select';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%; /* Garante que ocupe a tela inteira */
  margin: 0;
  padding: 20px;
`;

export const ProfileContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5em;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 2;
  background: #fff;
  width: ${({ collapsed }) => (collapsed ? "60vw" : "50vw")};
  margin: auto 0;
  margin-top: 50px;

  h3 {
    display: flex;
    align-self: flex-start;
    color: #054D00;
  }

  @media screen and (max-width: 768px) {
    width: 90vw;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
  
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
  
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Label = styled.label`
  font-weight: bold;
  font-size: 12pt;
  color: rgb(54, 54, 54);
  margin-bottom: 5px;
`;

export const ShowInput = styled(InputMask)`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  border: 2px solid rgb(204, 204, 204);
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background: rgba(245, 245, 245, 0.4);
  transition: all 0.3s ease-in-out;

  &:focus {
    border-color: #007bff;
    background: #fff;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  margin-top: 40px; /* Aumenta a distância dos botões para o conteúdo acima */
  padding-top: 30px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;


export const StyledSelect = styled(Select)`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  border: 2px solid rgb(204, 204, 204);
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background: rgba(245, 245, 245, 0.4);
  transition: all 0.3s ease-in-out;
  margin-bottom: 10px;

  &:focus {
    border-color: #007bff;
    background: #fff;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`;



