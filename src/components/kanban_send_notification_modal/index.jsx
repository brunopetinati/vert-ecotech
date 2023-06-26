import Modal from "../default_modal";
import { SimpleModal, ModalContent} from './styles'
import React, { useState } from 'react';
import { StyledButton } from "../default_button/styles";

const KanbanSendNotificationModal = ({ isOpen, onClose, onConfirmNotification, children }) => {

  const handleConfirmNotification = () => {
    onConfirmNotification(); // Call the provided handler function
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} children={
      <SimpleModal isOpen={isOpen} onClick={onClose} >
        <ModalContent>
         <h4>Deseja notificar o usuário?</h4>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <StyledButton onClick={handleConfirmNotification} style={{width: '128px'}}>Sim</StyledButton>
            <StyledButton style={{width: '128px'}}>Não</StyledButton>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: '32px', marginBottom: '32px'}}>
            <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>Visualizar notificação</span>
          </div>
        </ModalContent>
      </SimpleModal> }
    >  
    </Modal>
  );
};

export default KanbanSendNotificationModal;
