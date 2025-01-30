import React, { useRef } from 'react';
import {FileInput, StyledButton} from './styles'


const FileUploadComponent = ({ item, handleFileChange }) => {
  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    handleFileChange(event, item.fileName);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <StyledButton onClick={handleButtonClick} style={{ cursor: 'pointer' }}>
        Upload
      </StyledButton>
      <FileInput
        id={item.fileName}
        name={item.fileName}
        onChange={handleChange}
        ref={fileInputRef}
      />
    </div>
  );
};

export default FileUploadComponent;
