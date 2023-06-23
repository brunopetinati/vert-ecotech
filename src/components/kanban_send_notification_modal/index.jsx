import Modal from "../default_modal";
import { SimpleModal, ModalContent} from './styles'
import React, { useState } from 'react';

const KanbanSendNotificationModal = ({  isOpen, onClose, children }) => {

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} children={
      <SimpleModal isOpen={isOpen} onClick={onClose} >
        <ModalContent>
         <h4>Deseja notificar o usuário? (Beta)</h4>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <button onClick={onClose} style={{width: '128px'}}>Sim</button>
            <button style={{width: '128px'}}>Não</button>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: '32px', marginBottom: '32px'}}>
            <button>Visualizar notificação</button>
          </div>
        </ModalContent>
      </SimpleModal> }
    >  
    </Modal>
  );
};

export default KanbanSendNotificationModal;