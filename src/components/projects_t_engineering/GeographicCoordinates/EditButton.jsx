import React, { useState } from 'react';
import imgEditar from '../../../assets/icons/edit.png';

const EditButton = ({ closeModal }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const buttonStyles = {
    backgroundImage: `url(${imgEditar})`,
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
            e.target.style.border = '2px solid #006400';
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
            handleClick();
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
          closeModal();
        }}
      >
      </button> 
    </div>
  );
};

export default EditButton;
