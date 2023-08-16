import React, { useState } from 'react';
import { StyledButton } from './styles';
import Swal from 'sweetalert2';
import axios from 'axios';
import { currentUrl } from '../../constants/global';

const WarningButton = ({ text, path, id }) => {

  const token = sessionStorage.getItem('Authorization');
  const headers = { Authorization: `Bearer ${token}` };

  // lembrar de inserir a senha do usuário, para fazer deleções

  const onDelete = () =>{
    axios.delete(`${currentUrl}/api/${path}/${id}/delete`, {
      headers,
    })
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.log('error', error);
      Swal.fire({
        title: 'Error!',
        text: 'Falha ao executar a operação de exclusão. Por favor, tente novamente mais tarde.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    });
  }

  const showDeleteWarning = () => {
    Swal.fire({
      title: 'Confirmação',
      text: 'Tem certeza que deseja deletar a sua conta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Não, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(); 
      }
    });
  };

  return (
    <>
      <StyledButton onClick={showDeleteWarning}>{text}</StyledButton>
    </>
  );
};

export default WarningButton;
