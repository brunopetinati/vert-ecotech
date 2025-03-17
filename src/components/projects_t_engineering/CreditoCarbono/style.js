import styled from 'styled-components';

export const CreditoCarbonoContainer = styled.div`
  display: flex;
  flex-direction: column;
  -moz-box-pack: center;
  justify-content: center;
  width: 60vw;
  --margin-left: 230px;
  text-align: left;
  --margin-top: 400px;
`;

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