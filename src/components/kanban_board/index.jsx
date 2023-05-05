import React, { useState } from 'react';
import { Container, Column, Card } from './styles';
import { useSelector } from 'react-redux';
import MiniCard from '../projects_cards_mini';
import { getScoreColor } from '../../constants/functions';

const KanbanBoard = () => {

  // esse status move o card
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
        {projects.map((project) => {
          if (project.status === 'concluded') {
            return (
              <Card draggable onDragStart={handleDragStart}>
                <h3 style={{color: getScoreColor(project.score)}}>{project.title}</h3>
                <p>project.description</p>
              </Card>
            );
          } else {
            return null; // or you can render something else here
          }
        })}
      </Column>
      <Column
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'analysis')}
      >
        <h2>Análise de viabilidade</h2>
        {projects.map((project) => {
          if (project.status === 'analysis') {
            return (
              <Card draggable onDragStart={handleDragStart}>
                <h3 style={{color: getScoreColor(project.score)}}>{project.title}</h3>
                <p>project.description</p>
              </Card>
            );
          } else {
            return null; // or you can render something else here
          }
        })}
      </Column>
      <Column
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'viability')}
      >
        <h2>Viabilidade concluída</h2>
        {projects.map((project) => {
          if (project.status === 'viability') {
            return (
              <Card draggable onDragStart={handleDragStart}>
                <h3 style={{color: getScoreColor(project.score)}}>{project.title}</h3>
                <p>project.description</p>
              </Card>
            );
          } else {
            return null; // or you can render something else here
          }
        })}
      </Column>
      <Column
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'negotiation')}
      >
        <h2>Em negociação</h2>
        {projects.map((project) => {
          if (project.status === 'negotiation') {
            return (
              <Card draggable onDragStart={handleDragStart}>
                <h3 style={{color: getScoreColor(project.score)}}>{project.title}</h3>
                <p>project.description</p>
              </Card>
            );
          } else {
            return null; // or you can render something else here
          }
        })}
      </Column>
      <Column
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'idle')}
      >
        <h2>Projeto aguardando</h2>
        {projects.map((project) => {
          if (project.status === 'idle') {
            return (
              <Card draggable onDragStart={handleDragStart}>
                <h3 style={{color: getScoreColor(project.score)}}>{project.title}</h3>
                <p>project.description</p>
              </Card>
            );
          } else {
            return null; // or you can render something else here
          }
        })}
      </Column>
      <Column
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'concluded')}
      >
        <h2>Projeto em andamento</h2>
        {projects.map((project) => {
          if (project.status === 'concluded') {
            return (
              <Card draggable onDragStart={handleDragStart}>
                <h3 style={{color: getScoreColor(project.score)}}>{project.title}</h3>
                <p>project.description</p>
              </Card>
            );
          } else {
            return null; // or you can render something else here
          }
        })}
      </Column>
    </Container>
  );
};

export default KanbanBoard;

