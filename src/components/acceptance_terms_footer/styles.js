import styled from 'styled-components';

export const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  width: 110vw;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  cursor: pointer;

  margin-right: 32px;

  &:hover {
    background-color: #3e8e41;
  }
`;