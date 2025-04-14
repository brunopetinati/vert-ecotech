import styled from 'styled-components';

export const Button = styled.button`
  background-color: #7A4EAB;
  border-radius: 100px;
  box-shadow: rgba(128, 128, 128, 0.15) 0 -15px 12px -10px inset,
              rgba(128, 128, 128, 0.15) 0 1px 2px,
              rgba(128, 128, 128, 0.15) 0 2px 4px,
              rgba(128, 128, 128, 0.15) 0 4px 8px,
              rgba(128, 128, 128, 0.15) 0 8px 16px;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif;
  padding: 6px 10px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 14px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 140px;
  height: 35px;
  z-index: 1;

  &:hover {
    box-shadow: rgba(128, 128, 128, 0.3) 0 -25px 18px -14px inset,
                rgba(128, 128, 128, 0.3) 0 1px 2px,
                rgba(128, 128, 128, 0.3) 0 2px 4px,
                rgba(128, 128, 128, 0.3) 0 4px 8px,
                rgba(128, 128, 128, 0.3) 0 8px 16px,
                rgba(128, 128, 128, 0.3) 0 16px 32px;
    transform: scale(1.05);
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
    width: 130px;
    height: 30px;
  }
`;
