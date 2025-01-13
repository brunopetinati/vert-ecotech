import React from 'react';
import styled from 'styled-components';

const ColumnContainer = styled.div`
  min-width: 9vw;
  background-color: #FFF;
  margin-right: 8px;
  position: relative;
  border-radius: 5px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  h2 {
    min-height: 80px;
    text-align: center;
  }

  h3 {
    text-transform: capitalize;
  }

  h4 {
  text-align: center;
  }
`;

const KanbanColumn = ({ title, projects, status, getScoreColor, handleClick, handleDragStart, handleDragOver, handleDrop }) => {
  return (
    <ColumnContainer onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, status)}>
      <h4>{title}</h4>
      {projects.map((project, key) => {
        if (project.status === status) {
          return (
            <CardContainer key={key} onClick={() => { handleClick(projects.find(storedProject => storedProject.id === project.id)) }} scoreColor={getScoreColor(project.score)} draggable onDragStart={(e) => handleDragStart(e, project.owner, project.id, project.status)}>
              <KanbanCard project={project} />
            </CardContainer>
          );
        } else {
          return null;
        }
      })}
    </ColumnContainer>
  );
};

export default KanbanColumn;
