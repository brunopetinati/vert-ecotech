import React, { useState } from 'react';
import { StyledButton, StyledButtonDelete } from './styles';
import Swal from 'sweetalert2';
import axios from 'axios';
import { currentUrl } from '../../constants/global';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { appStatus } from '../../store/modules/app_status/actions';

const WarningDeleteModal = ({ text, path, id, width, height, context }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = sessionStorage.getItem('Authorization');
  const headers = { Authorization: `Bearer ${token}` };

  //users
  // projects
  const onDelete = () =>{
    console.log('Deletando item do caminho:', path);
    axios.delete(`${currentUrl}/api/${path}/${id}/delete/`, {
      headers,
    })
    .then(response => {
      Swal.fire({
        title: 'Sucesso!',
        text: 'Deletado com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
        if (path === 'projects') {
          dispatch(appStatus('Projetos'));
          navigate('/welcome');
        } else if (path === 'users' && context === 'self') {
          dispatch(appStatus('Usuários'));
          navigate('/welcome');
        } else if (path === 'users' && context === 'admin') {
          sessionStorage.clear(); 
          navigate('/');
        } else {
          navigate('/welcome');
        }
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
      text: 'Tem certeza que deseja deletar?',
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
      <StyledButtonDelete onClick={showDeleteWarning} width={width} height={height}>{text}</StyledButtonDelete>
    </>
  );
};

export default WarningDeleteModal;
