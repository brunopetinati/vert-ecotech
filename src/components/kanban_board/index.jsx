import React, { useState, useEffect } from 'react';
import { Header, Container, Column, CardContainer } from './styles';
import { useSelector } from 'react-redux';
import MiniCard from '../projects_cards_mini';
import { getScoreColor } from '../../constants/functions';
import { currentUrl } from '../../constants/global';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { storeProjects } from '../../store/modules/app_data/actions';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import KanbanCard from '../kanban_card';
import KanbanUserCard from '../kanban_user_card';
import KanbanSidebar from '../kanban_sidebar';
import KanbanUserCardDefaultModal from '../kanban_user_card_modal';
import KanbanSendNotificationModal from '../kanban_send_notification_modal';
import { appStatus } from '../../store/modules/app_status/actions';

import { transformNumbersToHectares, getStatusCARColor } from '../../constants/functions';

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
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showModalSendNotification, setShowModalSendNotification] = useState(false);
  const [sendNotification, setSendNotification] = useState(false);
  const users = useSelector((state) => state.app_data.users);

  const navigate = useNavigate();

  if (projects.length === 0) {
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
        console.log(response)
        dispatch(storeProjects(response.data));
      } catch (error) {
        // Handle error
      }
    };
    fetchProjects();
  };

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
      setShowModalSendNotification(!showModalSendNotification);
      if (sendNotification) { axios.post(`${currentUrl}/api/send-notification/`, {
        user: currentOwnerID,
        notification_id: Math.floor(Math.random() * 5) + 1,
      }, { headers } ).then(response => console.log('resposta da notificação', response)).catch(error => console.log(error))
    }}
  };

  useEffect(() => {
    const fetchProjects = async () => {
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
            setNewUsers(response.data);
          }
          // Rest of the fetchProjects function code...
        } catch (error) {
          // Handle error
        }
      }
    };
  
    fetchProjects(); // Call the async function immediately
  
  }, [updateComponent, newUsers]);
  
  
  
  const handleClick = (project) => {
    dispatch(appStatus(''));
    navigate('/intern_project', { state: { project }});
  };

  const handleClickUser = (user) => {
    //navigate('/new_path', { state: { user }});
    console.log('clicou aqui');
    console.log(user);
    setSelectedUser(user);
    setIsOpen(!isOpen);
  }

  const handleOnClose = () => {
    setIsOpen(!isOpen);
  };

  const handleOnCloseSendNotificationModal = () => {
    setShowModalSendNotification(!showModalSendNotification);
  };

  const handleConfirmNotification = () => {
    setSendNotification(true); // Update the sendNotification state to true
  };
  
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
    >
      <>
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
                  <CardContainer key={key} onClick={() => {handleClick(projects.find(storedProject => storedProject.id === project.id))}} scoreColor={getScoreColor(project.score)} draggable onDragStart={(e) => handleDragStart(e, project.owner, project.id, project.status)}>
                    <KanbanCard project={project} />
                  </CardContainer>
                );  
              } else {  
                return null; // or you can render something else here
              }
            })}

            {newUsers && newUsers.map((user, key) => {                
                return <div onClick={() => handleClickUser(newUsers.find(storedUser => storedUser.id === user.id))}><KanbanUserCard key={user.id} full_name={user.full_name} city={user.city} state={user.state}  /></div>
              })}
              {selectedUser && <KanbanUserCardDefaultModal user={selectedUser} isOpen={isOpen} onClose={handleOnClose} />}
          </Column>
          <Column
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'analysis')}
          >
            <h4>Análise de viabilidade</h4>
            {projects.map((project, key) => {
              if (project.status === 'analysis') {
                return (
                  <CardContainer key={key} onClick={() => {handleClick(projects.find(storedProject => storedProject.id === project.id))}} scoreColor={getScoreColor(project.score)} draggable onDragStart={(e) => handleDragStart(e, project.owner, project.id, project.status)}>
                    <KanbanCard project={project} />
                  </CardContainer>
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
            <h4>Proposta</h4>
            {projects.map((project, key) => {
              if (project.status === 'viability') {
                return (
                  <CardContainer key={key} onClick={() => {handleClick(projects.find(storedProject => storedProject.id === project.id))}} scoreColor={getScoreColor(project.score)} draggable onDragStart={(e) => handleDragStart(e, project.owner, project.id, project.status)}>
                    <KanbanCard project={project} />
                  </CardContainer>
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
                  <CardContainer key={key} onClick={() => {handleClick(projects.find(storedProject => storedProject.id === project.id))}} scoreColor={getScoreColor(project.score)} draggable onDragStart={(e) => handleDragStart(e, project.owner, project.id, project.status)}>
                    <KanbanCard project={project} />
                  </CardContainer>
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
            <h4>Análise Jurídica</h4>
            {projects.map((project, key) => {
              if (project.status === 'idle') {
                return (
                  <CardContainer key={key} onClick={() => {handleClick(projects.find(storedProject => storedProject.id === project.id))}} scoreColor={getScoreColor(project.score)} draggable onDragStart={(e) => handleDragStart(e, project.owner, project.id, project.status)}>
                    <KanbanCard project={project} />
                  </CardContainer>
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
            <h4>Contrato</h4>
            {projects.map((project, key) => {
              if (project.status === 'implementing') {
                return (
                  <CardContainer key={key} onClick={() => {handleClick(projects.find(storedProject => storedProject.id === project.id))}} scoreColor={getScoreColor(project.score)} draggable onDragStart={(e) => handleDragStart(e, project.owner, project.id, project.status)}>
                    <KanbanCard project={project} />
                  </CardContainer>
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
                  <CardContainer key={key} onClick={() => {handleClick(projects.find(storedProject => storedProject.id === project.id))}} scoreColor={getScoreColor(project.score)} draggable onDragStart={(e) => handleDragStart(e, project.owner, project.id, project.status)}>
                    <KanbanCard project={project} />
                  </CardContainer>
                );
              } else {
                return null; // or you can render something else here
              }
            })}
          </Column>
          <Column
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'lost')}
          >
            <h4>Perdido</h4>
            {projects.map((project, key) => {
              if (project.status === 'lost') {
                return (
                  <CardContainer key={key} onClick={() => {handleClick(projects.find(storedProject => storedProject.id === project.id))}} scoreColor={getScoreColor(project.score)} draggable onDragStart={(e) => handleDragStart(e, project.owner, project.id, project.status)}>
                    <KanbanCard project={project} />
                  </CardContainer>
                );
              } else {
                return null; // or you can render something else here
              }
            })}
          </Column>
        </Container>
        {showModalSendNotification && (
          <KanbanSendNotificationModal
            isOpen={showModalSendNotification}
            onClose={handleOnCloseSendNotificationModal}
            onConfirmNotification={handleConfirmNotification} // Pass the handler function
            notification={'mensagem de exemplo'}
          />
        )}
      </>
    </motion.div>
  );
};

export default KanbanBoard;

