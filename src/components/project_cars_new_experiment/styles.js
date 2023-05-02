import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  overflow-x: auto;
  overflow-y: auto;
  height: 79vh;
`;

export const CardContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 450px;
  height: 200px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 16px;
  margin-right: 8px;
  cursor: pointer;
`;

export const ImageContainer = styled.div`
  margin-right: 16px;
`;

export const Image = styled.img`
  width: 150px;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 50%;
`;

export const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #054d00;
`;

export const Info = styled.p`
  font-size: 16px;
  margin-bottom: 4px;
`;

export const ScoreContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  font-size: 24px;
  font-weight: bold;
`;
