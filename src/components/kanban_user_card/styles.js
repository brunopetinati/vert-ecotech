import styled from "styled-components";

export const Card = styled.div`
  color: #7eff00;
  background-color: #054d00;
  border-radius: 8px;
  box-shadow: 0 1px 0 rgba(9,30,66,.25);
  padding: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  min-width: 110px;
  max-width: 110px;
  height: 110px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const DisplayColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 130px;

  h3 {
    font-size: 12px;
  }
`;

export const ImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Img = styled.img`
  width: 16px;
`;