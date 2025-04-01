import styled from 'styled-components';
import folha1 from "../../assets/icons/folha1.png";

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
  margin: auto;
  margin-top: 50px;
  position: relative;
  overflow: hidden; /* Para evitar vazamentos da imagem */

  h3 {
    display: flex;
    align-self: flex-start;
    color: #054D00;
  }

  @media screen and (max-width: 768px) {
    width: 90vw;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${folha1});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.2;
    z-index: -1; /* Para que fique atrás do conteúdo */
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

export const ShowInput = styled.input`
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
  margin-top: 20px; /* Aumenta a distância dos botões para o conteúdo acima */
  padding-top: 30px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const BackgroundImage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
    margin: 0;

  &.background-image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.2;
    --z-index: -1;
  }
`;





