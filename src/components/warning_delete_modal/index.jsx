import React, { useState } from 'react';
import { StyledButton, StyledButtonDelete } from './styles';
import Swal from 'sweetalert2';
import axios from 'axios';
import { currentUrl } from '../../constants/global';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { appStatus } from '../../store/modules/app_status/actions';

const WarningDeleteModal = ({ text, path, id, width, height }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = sessionStorage.getItem('Authorization');
  const headers = { Authorization: `Bearer ${token}` };

  // lembrar de inserir a senha do usuário, para fazer deleções

  const onDelete = () =>{
    //enviando novamente
    console.log("entrou para deletar")
    console.log("Path atual:", path);  // Exibe o valor de path no console
    console.log("URL completa:", `${currentUrl}/api/${path}/${id}/delete`);
    axios.delete(`${currentUrl}/api/${path}/${id}/delete/`, {
      headers,
    })
    .then(response => {
      console.log('Response:', response.data);
      Swal.fire({
        title: 'Sucesso!',
        text: 'Seu projeto foi deletado com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      dispatch(appStatus('Projetos'))
      navigate('/welcome')
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
      <StyledButtonDelete onClick={showDeleteWarning} width={width} height={height}>{text}</StyledButtonDelete>
    </>
  );
};

export default WarningDeleteModal;
