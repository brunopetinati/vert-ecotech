import React from 'react';
import styled from 'styled-components';
import { transformNumbersToHectares, getStatusCARColor } from '../../constants/functions';
import DefaultForestImage from '../../assets/default-image2.png'

const Card = styled.div`
  --border-radius: 3px;
  --box-shadow: 0 1px 0 rgba(9,30,66,.25);
  padding: 3px;
  margin-bottom: 8px;
  cursor: pointer;
  --width: 120px;
  height: 90px;

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
        <img src={ project.project_image || DefaultForestImage } style={{ width: '85px' }} />
        <div style={{ fontSize: '8px', marginTop: '5px', wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal', width: 100 }}>
            {project.title}
        </div>
        <div style={{ float: 'left', width: '60px' }} >
          <p style={{ fontStyle: 'italic' }}>{transformNumbersToHectares(project.total_area)}</p>
        </div>
    </Card>
  );
};

export default KanbanCard;
