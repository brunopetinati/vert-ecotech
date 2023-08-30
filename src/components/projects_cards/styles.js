import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  overflow-x: auto;
  overflow-y: auto;
  height: 79vh;

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    height: auto;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 460px;
  height: 200px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 16px;
  margin-right: 8px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    width: 100px;
    height: 130px;
    align-items: center;
    justify-content: center;
    margin-right: 0;
    flex-direction: column-reverse;
  } 
`;

export const ImageContainer = styled.div`
  margin-right: 16px;

  @media screen and (max-width: 768px) {
     margin-right: 0;
  }
`;

export const Image = styled.img`
  width: 150px;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;

  @media screen and (max-width: 768px) {
    width: 70px;
    height: 80px;  
    margin: 0 auto;
  }
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 50%;

  @media screen and (max-width: 768px) {
    align-items: center;
    justify-content: space-between;
    width: 75px;
    overflow: scroll;
    height: 28px;
    margin-top: -8px;
  }
`;

export const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #054d00;
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;

  @media screen and (max-width: 768px) {
    font-size: 8px;
    text-align: center;
    margin-bottom: 0;
    margin: 0 auto;
  }
`;

export const Info = styled.p`
  font-size: 16px;
  margin-bottom: 4px;

  @media screen and (max-width: 768px) {
    display: none;  
  }
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

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const MobileScoreContainer = styled.div`
  display: none;
  
  @media screen and (max-width: 768px) {
    display: flex;
    -moz-box-align: center;
    align-items: center;
    -moz-box-pack: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 2px;
    font-size: 12px;
    font-weight: 700;
    position: relative;
    bottom: 12px;
    left: 28px;
  }
`;