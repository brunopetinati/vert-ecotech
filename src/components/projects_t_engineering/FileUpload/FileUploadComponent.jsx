import React, { useState } from 'react';
import styled from 'styled-components';

const FileInput = styled.input.attrs({ type: 'file' })`
  display: none;
  cursor: pointer;
`;

const FileUploadComponent = ({ item, handleFileChange }) => {

  const handleChange = (event) => {
    handleFileChange(event, item.fileName);
  };

  return (
    <div>
      <label htmlFor={item.fileName} style={{ cursor: 'pointer' }}>
        Escolher Arquivo
      </label>
      <FileInput
        id={item.fileName}
        name={item.fileName}
        onChange={handleChange}
      />
    </div>
  );
};

export default FileUploadComponent;
