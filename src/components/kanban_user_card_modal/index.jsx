import { useNavigate } from "react-router-dom";
import DefaultModal from "../default_modal";
import { StyledButton } from '../default_button/styles';
import { SimpleDefaultModal, ModalContent} from './styles'
import React, { useState } from 'react';

const KanbanUserCardModal = ({ user, isOpen, onClose, children }) => {

  const navigate = useNavigate();

  if (!isOpen) return null;

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

  const handleRegisterNewProject = (newOwner) => {
    navigate('/project_register', { state: {newOwner}})
  };

  return (
    <DefaultModal isOpen={isOpen} children={
      <SimpleDefaultModal isOpen={isOpen} onClick={onClose} >
        <ModalContent style={{display: 'grid', flexDirection: 'column'}}>
          <h2>{user.full_name}</h2>
          <p>Email: {user.email}</p>
          <p>Contato: {user.phone}</p>
          <p>Endereço: {addressString}</p>
          <small style={{color: 'red', justifySelf: 'center', fontStyle: 'italic'}}>usuário atualmente sem projeto cadastrado</small>
          <small style={{color: 'green', justifySelf: 'center', fontStyle: 'italic', marginTop: '16px'}}>Deseja cadastrar um projeto para esse usuário?</small>
          <StyledButton style={{ marginTop: '32px'}} onClick={() => handleRegisterNewProject(user)}>Cadastrar novo projeto</StyledButton>
        </ModalContent>
      </SimpleDefaultModal> }
    >  
    </DefaultModal>
  );
};

export default KanbanUserCardModal;