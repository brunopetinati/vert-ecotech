import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import imgExcluir from '../../../../src/assets/icons/delete.png';
import { currentUrl } from '../../../../src/constants/global';

const DeleteButton = ({ closeModal, id }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleDelete = async ( id ) => {
    try {
      const formData = new FormData();
      formData.append('id', id);

      const token = sessionStorage.getItem('Authorization');
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.delete(`${currentUrl}/api/geographic_coordinates/${id}/delete/`, formData, { headers });
      console.log('Atualizado com sucesso! Resposta da API:', response.data);

      Swal.fire({
        title: 'Sucesso!',
        text: 'Item excluído com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      setIsClicked(!isClicked);
      closeModal();

    } catch (error) {
      console.log('error', error);
      Swal.fire({
        title: 'Erro!',
        text: 'Falha ao executar a operação de exclusão. Por favor, tente novamente mais tarde.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const confirmDelete = ( id ) => {
    Swal.fire({
      title: 'Confirmação',
      text: 'Tem certeza que deseja excluir?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const buttonStyles = {
    backgroundImage: `url(${imgExcluir})`,
    backgroundSize: 'contain',
    width: '25px',
    height: '25px',
    backgroundColor: isClicked ? 'blue' : 'lightgray',
    color: isClicked ? 'white' : 'black',
    border: '2px solid',
    borderRadius: '20px',
    padding: '15px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, box-shadow 0.3s, transform 0.3s',
    boxShadow: isClicked ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.2)',
    transform: isClicked ? 'translate(2px, 2px)' : 'translate(0, 0)',
  };

  // Defina o estilo de cor do texto inicialmente como branco quando a tela é aberta
  if (!isClicked) {
    buttonStyles.color = 'white';
  }

  return (
    <div style={{ width: '100%', padding: '5px' }}>
      <button
        style={buttonStyles}
        onMouseEnter={(e) => {
          if (!isClicked) {
            e.target.style.transform = 'translate(-2px, -2px)';
            e.target.style.boxShadow = '3px 3px 7px rgba(0, 0, 0, 0.3)';
            e.target.style.backgroundColor = 'yellow';
            e.target.style.border = '2px solid red';
            e.target.style.color = 'black';
          }
        }}
        onMouseDown={(e) => {
          if (!isClicked) {
            e.target.style.backgroundColor = 'lightblue';
            e.target.style.boxShadow = 'none';
            e.target.style.transform = 'translate(1px, 1px)';
          }
        }}
        onMouseUp={(e) => {
          if (!isClicked) {
            e.target.style.backgroundColor = 'lightblue';
            e.target.style.boxShadow = 'none';
            e.target.style.transform = 'translate(0, 0)';
            confirmDelete(id);
          }
        }}
        onMouseLeave={(e) => {
          if (!isClicked) {
            e.target.style.transform = 'translate(0, 0)';
            e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
            e.target.style.backgroundColor = 'lightgray';
            e.target.style.border = '2px solid white';
            e.target.style.color = 'white';
          }
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
      </button>
    </div>
  );
};

export default DeleteButton;
