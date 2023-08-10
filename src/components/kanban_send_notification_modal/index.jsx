import axios from 'axios';
import { currentUrl } from '../../constants/global';
import { useSelector } from 'react-redux';
import DefaultModal from "../default_modal";
import { SimpleDefaultModal, ModalContent } from './styles';
import React, { useState } from 'react';
import { StyledButton } from "../default_button/styles";


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
        console.log('criar token ExponentPushToken resposta:', response);
        if (response.status === 200) {
          return axios.post(`${currentUrl}/api/send-notification/`, {
            user: currentOwnerID,
            notification_id: notificationID,
          }, { headers });
        } else {
          throw new Error('Atualização de token falhou');
          console.log('as requisições de envio de notificação deram errado, verificar')
        }
      })
      .then(notificationResponse => {
        console.log('resposta da notificação', notificationResponse);
      })
      .catch(error => {
        console.log('Erro:', error);
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
              Visualizar notificação
            </span>
          </div>
          {showNotificationMessage && <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}><span style={{fontStyle: 'italic', fontSize: '14px'}}>"{notification}"</span></div>}
        </ModalContent>
      </SimpleDefaultModal>
    </DefaultModal>
  );
};

export default KanbanSendNotificationModal;
