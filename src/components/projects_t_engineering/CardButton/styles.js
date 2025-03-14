import styled from 'styled-components';

export const Card = styled.div`
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  cursor: pointer;
  width: 90px;
  height: 90px;
  transition: border-color 0.3s, background-color 0.3s, opacity 0.3s;
  opacity: ${(props) => (props.isSelected ? '1' : '0.3')};
  border: ${(props) => (props.isSelected ? '5px solid White' : '5px solid transparent')};
  
  display: flex; /* Centraliza a imagem dentro do card */
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Garante que a imagem se encaixe bem */
  }

  &:hover {
    border-color: green;
    background-color: lightblue;
  }
`;
