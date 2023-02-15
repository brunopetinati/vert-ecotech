import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  border-radius: 20px;
  height: auto;
  background: #FFFFFF;
  border-radius: 20px;


  h3 {
    color:#054D00;
  }
`;

export const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 800px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 10px;
  font-weight: 700;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;

  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

export const Span = styled.span`
  color: #323338;
  font-family: 'Baloo 2';
`;

export const TextArea = styled.textarea `
  padding: 10px;
  margin-bottom: 20px;

  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

export const Button = styled.button`
  background: #054D00;
  border-radius: 4px;
  width: 154px;
  height: 32px;
  color: white;
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  letter-spacing: 1px;
  font-weight: 700;
`;