import styled from "styled-components";

export const Card = styled.div`
  color: #7eff00;
  background-color: #054d00;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.30) 3px 3px 8px 3px;
  padding: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  min-width: 90px;
  max-width: 90px;
  height: 90px;
  border: 5px solid #e3831d;
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