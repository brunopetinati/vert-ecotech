import React, { useState } from 'react';
import Swal from 'sweetalert2';
import imgExcluir from '../../../../src/assets/icons/delete.png';

const FUDeleteButton = ({ switchField, nome_arquivo }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleDelete = async ( ) => {
    try {

      switchField();

      //Swal.fire({
      //  title: 'Sucesso!',
      //  text: 'Item excluído com sucesso!',
      //  icon: 'success',
      //  confirmButtonText: 'OK',
      //});

      setIsClicked(!isClicked);
      

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

  const confirmDelete = ( nome_arquivo ) => {
    Swal.fire({
      title: 'Confirmação',
      text: 'Tem certeza que deseja excluir o arquivo ' + nome_arquivo +'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(nome_arquivo);
      }
    });
  };

  const buttonStyles = {
    backgroundImage: `url(${imgExcluir})`,
    backgroundSize: 'contain',
    width: '20px',
    height: '20px',
    backgroundColor: isClicked ? 'blue' : 'lightgray',
    color: isClicked ? 'white' : 'black',
    border: '2px solid',
    borderRadius: '20px',
    //padding: '15px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, box-shadow 0.3s, transform 0.3s',
    boxShadow: isClicked ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.2)',
    transform: isClicked ? 'translate(2px, 2px)' : 'translate(0, 0)',
  };

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
            confirmDelete(nome_arquivo);
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

export default FUDeleteButton;
