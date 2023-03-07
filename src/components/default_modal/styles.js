import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBox = styled.div`
  position: relative;
  border-radius: 4px;
  padding: 20px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 50px;
  right: 50px;
  transform: translate(50%, -50%);
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;
