import Modal from "../default_modal";
import { Container, InnerContainer, ButtonContainer, Column, Label, Input, Button, Span, ButtonDisplay } from './styles'
import { currentUrl } from "../../constants/global";
import Swal from "sweetalert2";
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";

const ResetPassword = ({ isOpen, onClose, children }) => {


  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const currentUser = useSelector((state) => state.user.currentUser);


  

  const handleSubmitPassword = () => {

    const accessToken = sessionStorage.getItem('Authorization');

    const url = `https://${currentUrl}/api/reset-password/${currentUser.id}/`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const data = {
      current_password: currentPassword,
      new_password: newPassword,
    };

    axios.put(url, data, { headers })
      .then(response => {
        // Handle successful response here
        
        Swal.fire({
          title: 'Concluído',
          text: 'Sua senha foi alterada com sucesso',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch(error => {
        // Handle error here
        console.error('Failed to change password:', error);
        Swal.fire({
          title: 'Erro',
          text: 'Verifique as senhas e tente novamente',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} children={children}>
      <Container>
        <InnerContainer>
          <Column>
            <Label for="current_password">Senha atual:</Label>
            <Input
              type="password"
              id="current_password"
              name="current_password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
            />
          </Column>
          <Column>
            <Label for="new_password">Nova senha:</Label>
            <Input
              type="password"
              id="new_password"
              name="new_password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </Column>
        </InnerContainer>
        <ButtonDisplay>
          <Button onClick={handleSubmitPassword}>Salvar</Button>
        </ButtonDisplay>
      </Container>
    </Modal>
  );
};

export default ResetPassword;
