import styled from "styled-components";

export const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 80vw;
  }  
`;

export const ChartTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;