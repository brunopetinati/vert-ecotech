import DefaultModal from "../default_modal";
import { SimpleDefaultModal, ModalContent } from './styles';
import React, { useState } from 'react';
import { StyledButton } from "../default_button/styles";

const KanbanSendNotificationModal = ({ isOpen, onClose, onConfirmNotification, notification, children }) => {
  const [showNotificationMessage, setShowNotificationMessage] = useState(false);

  const handleConfirmNotification = () => {
    onConfirmNotification();
    onClose();
  };

  if (!isOpen) return null;

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  return (
    <DefaultModal isOpen={isOpen} onClose={onClose}>
      <SimpleDefaultModal onClick={onClose}>
        <ModalContent style={{ width: '350px' }}>
          <h4>Deseja notificar o usuário de seu novo status?</h4>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            <StyledButton onClick={handleConfirmNotification} style={{ width: '128px' }}>Sim</StyledButton>
            <StyledButton style={{ width: '128px' }}>Não</StyledButton>
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

