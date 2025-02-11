import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ collapsed }) => (collapsed ? "85vw" : "85vw")};
  //margin: 0 auto;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
export const Button = styled.button`
  background-color: rgba(0, 80, 0, 0.7);
  border-radius: 100px;
  box-shadow: rgba(0, 128, 0, 0.2) 0 -25px 18px -14px inset,
              rgba(0, 128, 0, 0.15) 0 1px 2px,
              rgba(0, 128, 0, 0.15) 0 2px 4px,
              rgba(0, 128, 0, 0.15) 0 4px 8px,
              rgba(0, 128, 0, 0.15) 0 8px 16px,
              rgba(0, 128, 0, 0.15) 0 16px 32px;
  color: white;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  padding: 5px 10px;
  text-align: center;
  transition: all 250ms;
  border: 0;
  font-size: 14px;
  user-select: none;
  width: 60px;
  height: 35px;
  margin: 0 5px; /* Ajuste para alinhar horizontalmente */

  &:hover {
    box-shadow: rgba(0, 128, 0, 0.35) 0 -25px 18px -14px inset,
                rgba(0, 128, 0, 0.35) 0 1px 2px,
                rgba(0, 128, 0, 0.35) 0 2px 4px,
                rgba(0, 128, 0, 0.35) 0 4px 8px,
                rgba(0, 128, 0, 0.35) 0 8px 16px,
                rgba(0, 128, 0, 0.35) 0 16px 32px;
    transform: scale(1.05);
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
    width: 50px;
    height: 30px;
  }
`;

export const Input = styled.input`
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  width: 70px;
  height: 35px;
  text-align: center;
  margin: 0 5px; /* Espaço entre os botões */
  background-color: #f8f9fa;
  color: #333;
  font-weight: bold;

  &:focus {
    border-color: #007bff;
    background-color: #fff;
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
    width: 60px;
    height: 30px;
  }
`;

export const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  //margin-top: 15px;
`;
