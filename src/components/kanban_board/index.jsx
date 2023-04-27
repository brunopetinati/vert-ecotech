import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Column = styled.div`
  width: 300px;
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 10px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  cursor: move;
`;

const KanbanBoard = () => {
  const [status, setStatus] = useState('todo');

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', status);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const currentStatus = e.dataTransfer.getData('text');
    if (currentStatus !== newStatus) {
      setStatus(newStatus);
    }
  };

  return (
    <Container>
      <Column
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'todo')}
      >
        <h2>Todo</h2>
        {status === 'todo' && (
          <Card draggable onDragStart={handleDragStart}>
            <h3>Task 1</h3>
            <p>This task needs to be completed today.</p>
          </Card>
        )}
      </Column>
      <Column
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'done')}
      >
        <h2>Done</h2>
        {status === 'done' && (
          <Card draggable onDragStart={handleDragStart}>
            <h3>Task 1</h3>
            <p>This task has been completed.</p>
          </Card>
        )}
      </Column>
    </Container>
  );
};

export default KanbanBoard;

