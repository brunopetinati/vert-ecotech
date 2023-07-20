import React from 'react';
import styled from 'styled-components';
import { transformNumbersToHectares, getStatusCARColor } from '../../constants/functions';

const Card = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9,30,66,.25);
  padding: 8px;
  margin-bottom: 8px;
  cursor: pointer;
`;

const KanbanCard = ({ project }) => {
  return (
    <Card>
       <h3>{project.title}</h3>                    
        <p>SICAR: <span style={{color: getStatusCARColor(project.status_car)}}>{project.status_car}</span></p>
        <p style={{fontStyle: 'italic'}}>{transformNumbersToHectares(project.total_area)}</p>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}} >
          <small>status: {project.status}</small>
        </div>
    </Card>
  );
};

export default KanbanCard;
