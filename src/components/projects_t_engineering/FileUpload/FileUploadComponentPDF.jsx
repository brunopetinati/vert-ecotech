import React, { useRef } from 'react';
import styled from 'styled-components';

// Estilo para o input de arquivo
const FileInput = styled.input.attrs({ type: 'file', accept: '.pdf' })`
  display: none;
  cursor: pointer;
`;

// Estilo para o botão de upload
export const StyledButtonUpload = styled.button`
  background-color: #87CEFA;
  border-radius: 100px;
  box-shadow: rgba(255, 20, 147, .2) 0 -25px 18px -14px inset, rgba(255, 20, 147, .15) 0 1px 2px, rgba(255, 20, 147, .15) 0 2px 4px, rgba(255, 20, 147, .15) 0 4px 8px, rgba(255, 20, 147, .15) 0 8px 16px, rgba(255, 20, 147, .15) 0 16px 32px;
  color: #363636;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif;
  padding: 3px 5px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left: 0px;
  width: 55px;
  height: 20px;

  :hover {
    box-shadow: rgba(255, 20, 147, .35) 0 -25px 18px -14px inset, rgba(255, 20, 147, .35) 0 1px 2px, rgba(255, 20, 147, .35) 0 2px 4px, rgba(255, 20, 147, .35) 0 4px 8px, rgba(255, 20, 147, .35) 0 8px 16px, rgba(255, 20, 147, .35) 0 16px 32px;
    transform: scale(1.02);
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const FileUploadComponent = ({ item, handleFileChange }) => {
  const fileInputRef = useRef(null);

  // Função para validar o arquivo
  const validateFile = (file) => {
    // Verifica se o arquivo é um PDF
    if (file.type !== 'application/pdf') {
      alert('Por favor, envie apenas arquivos PDF.');
      return false;
    }

    // Verifica se o tamanho do arquivo é menor que 200MB
    //const maxSizeInBytes = 200 * 1024 * 1024; // 200MB em bytes
    const maxSizeInBytes = 100 * 1024 * 1024; // 100MB em bytes
    if (file.size > maxSizeInBytes) {
      alert(`O tamanho do arquivo ${file.name}: ${file.size/1000000} deve ser menor que 100 MB.`);
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file && validateFile(file)) {
      handleFileChange(event, item.fileName); // Chama a função de mudança original se o arquivo for válido
    } else {
      // Limpa o input se o arquivo não for válido
      event.target.value = '';
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <StyledButtonUpload onClick={handleButtonClick} style={{ cursor: 'pointer' }}>
        Up PDF
      </StyledButtonUpload>
      <FileInput
        id={item.fileName}
        name={item.fileName}
        onChange={handleChange} // Usar a função de mudança com validação
        ref={fileInputRef}
      />
    </div>
  );
};

export default FileUploadComponent;
