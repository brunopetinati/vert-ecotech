import styled from 'styled-components';
import Background from '../../assets/fundo.jpg'

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

export const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  font-size: 1rem;


     background-color: transparent;
    color: #eeeeee;
    outline: none;
    outline-style: none;
    border: none;
    border-bottom: solid #eeeeee 1px;
`;

export const Button = styled.button`
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  background-color: #4caf50;
  color: #ffffff;
  font-size: 1rem;
  margin: 10px;
  cursor: pointer;
`;

export const Img = styled.img`
  width: 400px;
`;