import React, { useState, useEffect } from 'react';
import { Header, Container, Column, Card } from './styles';
import { useSelector } from 'react-redux';
import MiniCard from '../projects_cards_mini';
import { getScoreColor } from '../../constants/functions';
import { currentUrl } from '../../constants/global';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { storeProjects } from '../../store/modules/app_data/actions';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import KanbanUserCard from '../kanban_user_card';
import KanbanSidebar from '../kanban_sidebar';

const KanbanBoard = () => {

  const dispatch = useDispatch();

  const [status, setStatus] = useState('started');

  const projects = useSelector((state) => state.app_data.projects);

  const [currentOwnerID, setCurrentOwnerID] = useState('');
  const [currentProjectID, setCurrentProjectID] = useState('');
  const [updateComponent, setUpdateComponent] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [showingColumn, setShowingColumn] = useState(false);
  const [newUsers, setNewUsers] = useState([]);

  const navigate = useNavigate();

  const handleDragStart = (e, owner, projectID, projectStatus) => {
    e.dataTransfer.setData('text/plain', projectStatus);
    setCurrentOwnerID(owner);
    setCurrentProjectID(projectID);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setShowingColumn(!showingColumn);
  };

  
  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const currentStatus = e.dataTransfer.getData('text');

    if (currentStatus !== newStatus) {

      const token = sessionStorage.getItem('Authorization');
      const headers = { Authorization: `Bearer ${token}`, };
      
      axios
      .put(`${currentUrl}/api/projects/${currentProjectID}/update/`, { status: newStatus, owner: currentOwnerID }, { headers } )
      .then((response) => {
        setUpdateComponent(!updateComponent)

      })
      .catch((error) => {
        // Handle the error if any
      });
      axios.post(`${currentUrl}/api/send-notification/`, {
        user: currentOwnerID,
        notification_id: Math.floor(Math.random() * 5) + 1,
      }, { headers } ).then(response => console.log(response)).catch(error => console.log(error))
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = sessionStorage.getItem('Authorization');
        let response;
  
        if (currentUser.user_type === 'ADM') {
          response = await axios.get(`${currentUrl}/api/projects/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          response = await axios.get(`${currentUrl}/api/projects/${currentUser.id}/by_user/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
  
        dispatch(storeProjects(response.data));
      } catch (error) {
        // Handle error
      }
  
      if (currentUser.user_type === 'ADM') {
        try {
          const token = sessionStorage.getItem('Authorization');
          let response;
    
          if (currentUser.user_type === 'ADM' && newUsers.length === 0) {
            response = await axios.get(`${currentUrl}/api/users_without_projects/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            // Dispatch or handle response.data here
            console.log('response.data', response.data);
            setNewUsers(response.data);
            console.log('novos usuários?', newUsers);
          }
          // Rest of the fetchProjects function code...
        } catch (error) {
          // Handle error
        }
      }
    };
  
    fetchProjects();
  }, [updateComponent, newUsers]);
  
  
  const handleClick = (project) => {
    navigate('/intern_project', { state: { project }} );
  };


  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
    >
      <>
        <Header>Painel Desenvolvimento de Projetos - Acesso administrativo</Header>
        <Container>
        <KanbanSidebar />
          <Column showingColumn={showingColumn}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'started')}
          >
            <h4>Em espera</h4>
            {projects.map((project, key) => {
              if (project.status === 'started') {
                return (
                  <Card key={key} onClick={() => {handleClick(projects.find(storedProject => storedProject.id === project.id))}} scoreColor={getScoreColor(project.score)} draggable onDragStart={(e) => handleDragStart(e, project.owner, project.id, project.status)}>
                    <h3>{project.title}</h3>
                    <p>Informações</p>
                  </Card>
                );
              } else {
                return null; // or you can render something else here
              }
            })}

              {newUsers && newUsers.map((user, key) => {
                return <KanbanUserCard full_name={user.full_name} city={user.city} state={user.state} />
              })}
          </Column>
          <Column
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'analysis')}
          >
            <h4>Análise de viabilidade</h4>
            {projects.map((project, key) => {
              if (project.status === 'analysis') {
                return (
                  <Card key={key} onClick={() => {handleClick(projects.find(storedProject => storedProject.id === project.id))}} scoreColor={getScoreColor(project.score)} draggable onDragStart={(e) => handleDragStart(e, project.owner, project.id, project.status)}>
                    <h3>{project.title}</h3>
                    <p>Informações</p>
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
            <h4>Viabilidade concluída</h4>
            {projects.map((project, key) => {
              if (project.status === 'viability') {
                return (
                  <Card key={key} onClick={() => {handleClick(projects.find(storedProject => storedProject.id === project.id))}} scoreColor={getScoreColor(project.score)} draggable onDragStart={(e) => handleDragStart(e, project.owner, project.id, project.status)}>
                    <h3>{project.title}</h3>
                    <p>Informações</p>
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
            <h4>Em negociação</h4>
            {projects.map((project, key) => {
              if (project.status === 'negotiation') {
                return (
                  <Card key={key} onClick={() => {handleClick(projects.find(storedProject => storedProject.id === project.id))}} scoreColor={getScoreColor(project.score)} draggable onDragStart={(e) => handleDragStart(e, project.owner, project.id, project.status)}>
                    <h3>{project.title}</h3>
                    <p>Informações</p>
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
            <h4>Aguardando</h4>
            {projects.map((project, key) => {
              if (project.status === 'idle') {
                return (
                  <Card key={key} onClick={() => {handleClick(projects.find(storedProject => storedProject.id === project.id))}} scoreColor={getScoreColor(project.score)} draggable onDragStart={(e) => handleDragStart(e, project.owner, project.id, project.status)}>
                    <h3>{project.title}</h3>
                    <p>Informações</p>
                  </Card>
                );
              } else {
                return null; // or you can render something else here
              }
            })}
          </Column>
          <Column
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'implementing')}
          >
            <h4>Em andamento</h4>
            {projects.map((project, key) => {
              if (project.status === 'implementing') {
                return (
                  <Card key={key} onClick={() => {handleClick(projects.find(storedProject => storedProject.id === project.id))}} scoreColor={getScoreColor(project.score)} draggable onDragStart={(e) => handleDragStart(e, project.owner, project.id, project.status)}>
                    <h3>{project.title}</h3>
                    <p>Informações</p>
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
            <h4>Concluído</h4>
            {projects.map((project, key) => {
              if (project.status === 'concluded') {
                return (
                  <Card key={key} onClick={() => {handleClick(projects.find(storedProject => storedProject.id === project.id))}} scoreColor={getScoreColor(project.score)} draggable onDragStart={(e) => handleDragStart(e, project.owner, project.id, project.status)}>
                    <h3>{project.title}</h3>
                    <p>Informações</p>
                  </Card>
                );
              } else {
                return null; // or you can render something else here
              }
            })}
          </Column>
        </Container>
      </>
    </motion.div>
  );
};

export default KanbanBoard;

