import Modal from "../default_modal";
import { SimpleModal, ModalContent} from './styles'
import React, { useState } from 'react';

const KanbanUserCardModal = ({ user, isOpen, onClose, children }) => {

  if (!isOpen) return null;

  console.log('olha que user bonito', user);

  const addressParts = [];

  if (user.street) {
    addressParts.push('Rua ' + user.street);
  }

  if (user.number) {
    addressParts.push(user.number);
  }

  if (user.complement) {
    addressParts.push('Complemento ' + user.complement);
  }

  if (user.district) {
    addressParts.push(user.district);
  }

  if (user.city) {
    addressParts.push(user.city);
  }

  if (user.state) {
    addressParts.push(user.state);
  }

  if (user.cep) {
    addressParts.push('CEP: ' + user.cep);
  }

  const addressString = addressParts.join(', ');

  return (
    <Modal isOpen={isOpen} children={
      <SimpleModal isOpen={isOpen} onClick={onClose} >
        <ModalContent>
          <h2>{user.full_name}</h2>
          <p>Email: {user.email}</p>
          <p>Contato: {user.phone}</p>
          <p>Endereço: {addressString}</p>
          {/* Display other user information here */}
        </ModalContent>
      </SimpleModal> }
    >  
    </Modal>
  );
};

export default KanbanUserCardModal;