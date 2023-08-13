import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100vw;
  margin-top: 32px;
`;

export const Column = styled.div`
  margin: 0 auto;
`;

export const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 512px;
  margin: 0 auto;
`;

export const InputLabel = styled.label`
  font-weight: 700;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;

export const SmallText = styled.small`
  color: #777;
  margin-bottom: 8px;
`;

