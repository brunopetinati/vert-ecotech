import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  color: #7eff00;
  background-color: #054d00;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9,30,66,.25);
  padding: 8px;
  margin-bottom: 8px;
  cursor: pointer;
`;

const KanbanUserCard = ({ full_name, city, state }) => {
  return (
    <Card>
      <h3>{full_name}</h3>
      <p>{city +', ' + state}</p>
    </Card>
  );
};

export default KanbanUserCard;
