import Modal from "../default_modal";
import { SimpleModal, ModalContent} from './styles'
import React, { useState } from 'react';

const KanbanSendNotificationModal = ({  isOpen, onClose, children }) => {

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} children={
      <SimpleModal isOpen={isOpen} onClick={onClose} >
        <ModalContent>
         <h4>Deseja notificar o usuário?</h4>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <button onClick={onClose}>Sim</button>
            <button>Não</button>
          </div>
        </ModalContent>
      </SimpleModal> }
    >  
    </Modal>
  );
};

export default KanbanSendNotificationModal;