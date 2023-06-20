import styled from "styled-components";

export const Container = styled.div`
  width: 90vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    width: 80vw;
  }

  @media (max-width: 700px) { 
    width: 100vw;

    div {
      width: 90vw;
    }
  }
`;