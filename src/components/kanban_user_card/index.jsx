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
          <h3>{full_name}</h3>
          <p>{city +', ' + state}</p>
        </DisplayColumn>
        <Img src={NewLead} alt="new_lead" style={{width: '125px', height: '125px', marginTop: '-8px'}} />
      </InfoContainer>
      <ImgContainer><Img src={Star} alt="star" /></ImgContainer>
    </Card>
  );
};

export default KanbanUserCard;
