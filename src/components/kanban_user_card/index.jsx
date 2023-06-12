import React from 'react';
import styled from 'styled-components';
import Star from '../../assets/gifs/stargif.gif';
import NewLead from '../../assets/gifs/newlead.gif';

const Card = styled.div`
  color: #7eff00;
  background-color: #054d00;
  border-radius: 8px;
  box-shadow: 0 1px 0 rgba(9,30,66,.25);
  padding: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  min-width: 250px;
  max-width: 250px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const DisplayColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`;

const Img = styled.img`
  width: 64px;
`;

const KanbanUserCard = ({ full_name, city, state }) => {
  return (
    <Card>
      <InfoContainer>
        <DisplayColumn>
          <h3>{full_name}</h3>
          <p>{city +', ' + state}</p>
        </DisplayColumn>
        <Img src={NewLead} alt="new_lead" style={{width: '100px', height: '100px', marginTop: '-8px'}} />
      </InfoContainer>
      <ImgContainer><Img src={Star} alt="star" /></ImgContainer>
    </Card>
  );
};

export default KanbanUserCard;
