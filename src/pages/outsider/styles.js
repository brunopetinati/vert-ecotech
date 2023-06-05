import styled from 'styled-components';

export const Container = styled.div`
  width: 800px;
  border-radius: 20px;
  padding: 2em;
  border-radius: 20px;
  height: 620px;
  z-index: 2;
  background: #fff;

  h3 {
    color: #054D00;
  }

  @media (max-width: 768px) {
    width: 90vw;
    height: auto;
    padding: 1em;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 600px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
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
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;

export const Button = styled.button`
  border-radius: 8px;
  padding: 16px;
  width: 70%;
  margin: 0 auto 8px auto;
  background: #00ae00;
  color: #fff;
`;

export const ButtonSecondary = styled.button`
  border-radius: 8px;
  padding: 16px;
  width: 70%;
  margin: 0 auto 8px auto;
  background: transparent;
  border: 1px solid #00ae00;
  color: #00ae00;
`;
