import React, { useState } from 'react';
import { Container, Column, Card } from './styles';
import { useSelector } from 'react-redux';

const KanbanBoard = () => {
  const [status, setStatus] = useState('started');

  const projects = useSelector((state) => state.app_data.projects);
  console.log(projects);

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
        onDrop={(e) => handleDrop(e, 'started')}
      >
        <h2>Iniciados</h2>
        {status === 'started' && (
          <Card draggable onDragStart={handleDragStart}>
            <h3>Task 1</h3>
            <p>This task needs to be completed today.</p>
          </Card>
        )}
      </Column>
      <Column
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'analysis')}
      >
        <h2>Análise de viabilidade</h2>
        {status === 'analysis' && (
          <Card draggable onDragStart={handleDragStart}>
            <h3>Task 1</h3>
            <p>This task needs to be completed today.</p>
          </Card>
        )}
      </Column>
      <Column
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'viability')}
      >
        <h2>Viabilidade concluída</h2>
        {status === 'viability' && (
          <Card draggable onDragStart={handleDragStart}>
            <h3>Task 1</h3>
            <p>This task needs to be completed today.</p>
          </Card>
        )}
      </Column>
      <Column
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'negotiation')}
      >
        <h2>Em negociação</h2>
        {status === 'negotiation' && (
          <Card draggable onDragStart={handleDragStart}>
            <h3>Task 1</h3>
            <p>This task needs to be completed today.</p>
          </Card>
        )}
      </Column>
      <Column
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'idle')}
      >
        <h2>Projeto aguardando</h2>
        {status === 'idle' && (
          <Card draggable onDragStart={handleDragStart}>
            <h3>Task 1</h3>
            <p>This task needs to be completed today.</p>
          </Card>
        )}
      </Column>
      <Column
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'concluded')}
      >
        <h2>Projeto em andamento</h2>
        {status === 'concluded' && (
          <>
          <Card draggable onDragStart={handleDragStart}>
            <h3>Task 1</h3>
            <p>This task needs to be completed today.</p>
          </Card>
          <Card draggable onDragStart={handleDragStart}>
            <h3>Task 1</h3>
            <p>This task needs to be completed today.</p>
          </Card>
          </>
        )}
      </Column>
    </Container>
  );
};

export default KanbanBoard;

