import styled from "styled-components";

export const SimpleDefaultModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* Set a higher z-index value */
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  z-index: 10000; /* Set a higher z-index value */
`;