import axios from 'axios';
import { currentUrl } from '../../constants/global';
import { useSelector } from 'react-redux';
import DefaultModal from "../default_modal";
import { SimpleDefaultModal, ModalContent } from './styles';
import React, { useState } from 'react';
import { StyledButton } from "../default_button/styles";
import CurrentNotifications from '../current_notifitcations';

const KanbanSendNotificationModal = ({ isOpen, onClose, onConfirmNotification, notification, currentOwnerID, notificationID, children }) => {


  const sendNotificationNow = () => {
    const token = sessionStorage.getItem('Authorization');
    const headers = { Authorization: `Bearer ${token}`};
    
    axios
      .post(`${currentUrl}/api/update-expo-push-token/`, {
        user: currentOwnerID,
        token: "ExponentPushToken[ebpVLBJTGyx0B3U8pbCmUL]"
      }, { headers })
      .then(response => {

        if (response.status === 200) {
          return axios.post(`${currentUrl}/api/send-notification/`, {
            user: currentOwnerID,
            notification_id: notificationID,
          }, { headers });
        } else {
          throw new Error('Atualização de token falhou');
  
        }
      })
      .then(notificationResponse => {
        console.log("Resposta da notificação:",notificationResponse);
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  }
  


  const [showNotificationMessage, setShowNotificationMessage] = useState(false);

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  const handleConfirmNotification = () => {
    onConfirmNotification();
    onClose();
    sendNotificationNow();
  };

  const handleCancelNotification = () => {
    onClose();
  };

  if (!isOpen) return null;


  return (
    <DefaultModal isOpen={isOpen} onClose={onClose}>
      <SimpleDefaultModal onClick={onClose}>
        <ModalContent style={{ width: '350px' }}>
          <h4>Deseja notificar o usuário de seu novo status?</h4>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            <StyledButton onClick={handleConfirmNotification} style={{ width: '128px' }}>Sim</StyledButton>
            <StyledButton onClick={handleCancelNotification} style={{ width: '128px' }}>Não</StyledButton>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: '32px', marginBottom: '32px' }}
            onClick={handleContentClick} // Handle click event for the modal content area
          >
            <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setShowNotificationMessage(!showNotificationMessage)}>
            {showNotificationMessage ? "Colapsar notificações" : "Visualizar notificações"}
            </span>
          </div>
          {showNotificationMessage && <CurrentNotifications />}
        </ModalContent>
      </SimpleDefaultModal>
    </DefaultModal>
  );
};

export default KanbanSendNotificationModal;
