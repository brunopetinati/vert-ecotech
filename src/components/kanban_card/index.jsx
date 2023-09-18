import React from 'react';
import styled from 'styled-components';
import { transformNumbersToHectares, getStatusCARColor } from '../../constants/functions';
import DefaultForestImage from '../../assets/default-image2.png'

const Card = styled.div`
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9,30,66,.25);
  padding: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  width: 120px;
  height: 120px;

  h3 {
    font-size: 12px;
    overflow: hidden; 
    white-space: nowrap; 
    text-overflow: ellipsis;
  }

  p {
    font-size: 8px;
  }
`;

const KanbanCard = ({ project }) => {
  return (
    <Card>
        <img src={project.project_image || DefaultForestImage } style={{ width: '115px'}} />
        <h3>{project.title}</h3>                    
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}} >
          <p style={{fontStyle: 'italic'}}>{transformNumbersToHectares(project.total_area)}</p>
        </div>
    </Card>
  );
};

export default KanbanCard;
