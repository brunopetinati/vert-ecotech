import React, { useState } from 'react';
import styled from 'styled-components';
import KanbanCard from '../kanban_card/index';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 8px;
`;

const ColumnTitle = styled.h2`
  margin-bottom: 8px;
`;

const KanbanBoard = () => {
  const [todoCards, setTodoCards] = useState([
    {
      id: 1,
      title: 'Create Kanban Board',
      description: 'Use React and Styled Components to create a Kanban board',
    },
    {
      id: 2,
      title: 'Add Drag and Drop',
      description: 'Add drag and drop functionality to the Kanban board',
    },
  ]);

  const [doneCards, setDoneCards] = useState([]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDrop = (e, targetColumn) => {
    const id = e.dataTransfer.getData('text/plain');
    const card = todoCards.find((c) => c.id === parseInt(id));
    if (card) {
      setTodoCards(todoCards.filter((c) => c.id !== parseInt(id)));
      setDoneCards([...doneCards, card]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <BoardContainer>
      <ColumnContainer
        onDrop={(e) => handleDrop(e, 'todo')}
        onDragOver={handleDragOver}
      >
        <ColumnTitle>Todo</ColumnTitle>
        {todoCards.map((card) => (
          <KanbanCard
            key={card.id}
            title={card.title}
            description={card.description}
            draggable
            onDragStart={(e) => handleDragStart(e, card.id)}
          />
        ))}
      </ColumnContainer>
      <ColumnContainer
        onDrop={(e) => handleDrop(e, 'done')}
        onDragOver={handleDragOver}
      >
        <ColumnTitle>Done</ColumnTitle>
        {doneCards.map((card) => (
          <KanbanCard key={card.id} title={card.title} description={card.description} />
        ))}
      </ColumnContainer>
    </BoardContainer>
  );
};

export default KanbanBoard;
