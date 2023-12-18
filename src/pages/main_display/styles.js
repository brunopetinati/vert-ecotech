import styled from "styled-components";

export const Container = styled.div`
  display:flex;
  width: ${({collapsed}) => collapsed ? "90vw" : "100vw"};
  background: #F9FAFB;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: row;
    height: 153vh;
  }  
`;


export const SideContainer = styled.div`
  --display: flex;
  --flex-direction: column;
  --justify-content: center;
  --align-items: center;
  background: #f9fafb;
  position: absolute;
  left: 50px;
  width: 1450px;
  margin-left: 100px;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: flex-start;
  }
`;

export const SideContainerFlexStart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;