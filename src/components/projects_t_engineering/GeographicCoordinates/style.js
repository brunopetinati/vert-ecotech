import styled from 'styled-components';

/*
export const GeographicCoordinatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60vw;
  position: relative;
  left: 300px;  //Move para a direita 
  margin-top: -410px; // Ajuste para mover para cima 
  text-align: left;
`;
*/

export const Label = styled.label`
  --margin-bottom: 10px;
  --font-weight: 700;
  font-size: 10pt;
  color: rgb(54, 54, 54);
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

export const Input = styled.input`
  margin-bottom: 5px;
  border: 2px solid rgb(204, 204, 204);
  border-radius: 4px;
  font-size: 12px;
  outline: none;
  width: 400px;
  background: rgba(245, 245, 245, 0.2); 
  margin-top: 5px;

  &:focus {
    border-color: #007bff;
  }
`;
