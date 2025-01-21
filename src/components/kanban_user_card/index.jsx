import React from 'react';
import { useState } from 'react';
import Star from '../../assets/gifs/stargif.gif';
import NewLead from '../../assets/gifs/newlead.gif';
import { Card, InfoContainer, DisplayColumn, Img, ImgContainer } from './styles';

const KanbanUserCard = ({ full_name, city, state }) => {
  
  return (
    <Card>
      <InfoContainer>
        <DisplayColumn>
          <div style={{ fontSize: '8pt', zIndex: '1' }}>{full_name}</div>
        </DisplayColumn>
      </InfoContainer>
      <ImgContainer>
        <Img src={NewLead} alt="new_lead" style={{ width: '90px', marginTop: '-10px', zIndex: '0' }} />
      </ImgContainer>
    </Card>
  );
};

export default KanbanUserCard;
