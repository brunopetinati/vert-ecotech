import React, { useState, useEffect } from 'react';
import { Container, Column, Card } from './styles';
import { useSelector } from 'react-redux';
import MiniCard from '../projects_cards_mini';
import { getScoreColor } from '../../constants/functions';
import { currentUrl } from '../../constants/global';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { storeProjects } from '../../store/modules/app_data/actions';

const KanbanBoard = () => {

  const dispatch = useDispatch();

  const [status, setStatus] = useState('started');

  const projects = useSelector((state) => state.app_data.projects);

  const [currentOwnerID, setCurrentOwnerID] = useState('');
  const [currentProjectID, setCurrentProjectID] = useState('');
  const [updateComponent, setUpdateComponent] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleDragStart = (e, owner, projectID, projectStatus) => {
    e.dataTransfer.setData('text/plain', projectStatus);
    setCurrentOwnerID(owner);
    setCurrentProjectID(projectID);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const currentStatus = e.dataTransfer.getData('text');

    console.log('newStatus', newStatus);
    console.log('currentStatus', currentStatus);

    if (currentStatus !== newStatus) {

      const token = sessionStorage.getItem('Authorization');
      const headers = { Authorization: `Bearer ${token}`, };
      
      axios
      .put(`http://${currentUrl}:8000/api/projects/${currentProjectID}/update/`, { status: newStatus, owner: currentOwnerID }, { headers } )
      .then((response) => {
        console.log('response', response)
        setUpdateComponent(!updateComponent);
      })
      .catch((error) => {
        // Handle the error if any
      });
    }
  };

  useEffect(() => {

      const fetchProjects = async () => {
        try {
          const token = sessionStorage.getItem('Authorization');
          if (currentUser.user_type === 'ADM') {
            const response = await axios.get(`http://${currentUrl}:8000/api/projects/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log(response, 'entrou no useEffect')

            dispatch(storeProjects(response.data));
          } else {
            const response = await axios.get(`http://${currentUrl}:8000/api/projects/${currentUser.id}/by_user/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            dispatch(storeProjects(response.data));
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchProjects();
    
  }, [updateComponent]);

  return (
    <Container>
      <Column
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'started')}
      >
        <h2>Iniciados</h2>
        {projects.map((project) => {
          if (project.status === 'started') {
            return (
              <Card draggable onDragStart={(e) => handleDragStart(e, project.owner, project.id, project.status)}>
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
              <Card draggable onDragStart={(e) => handleDragStart(e, project.owner, project.id, project.status)}>
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
              <Card draggable onDragStart={(e) => handleDragStart(e, project.owner, project.id, project.status)}>
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
              <Card draggable onDragStart={(e) => handleDragStart(e, project.owner, project.id, project.status)}>
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
              <Card draggable onDragStart={(e) => handleDragStart(e, project.owner, project.id, project.status)}>
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
              <Card draggable onDragStart={(e) => handleDragStart(e, project.owner, project.id, project.status)}>
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

