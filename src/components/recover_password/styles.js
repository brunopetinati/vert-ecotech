import styled from "styled-components";


export const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  input {
    margin: 16px;
  }

  button {
    margin-top: 16px;
  }
`;


export const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
  outline: none;
  width: 250px;

  &:focus {
    border-color: #007bff;
  }
`;