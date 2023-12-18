import React, { useRef } from 'react';
import styled from 'styled-components';

const FileInput = styled.input.attrs({ type: 'file' })`
  display: none;
  cursor: pointer;
`;

export const StyledButtonUpload = styled.button`
  background-color: #87CEFA;
  border-radius: 100px;
  box-shadow: rgba(0,255,255, .2) 0 -25px 18px -14px inset,rgba(0,255,255, .15) 0 1px 2px,rgba(0,255,255, .15) 0 2px 4px,rgba(0,255,255, .15) 0 4px 8px,rgba(0,255,255, .15) 0 8px 16px,rgba(0,255,255, .15) 0 16px 32px;
  color: #363636;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
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
  width: 60px;
  height: 20px;
  float: left;

  :hover {
    box-shadow: rgba(0,255,255,.35) 0 -25px 18px -14px inset,rgba(0,255,255,.35) 0 1px 2px,rgba(0,255,255,.35) 0 2px 4px,rgba(0,255,255,.35) 0 4px 8px,rgba(0,255,255,.35) 0 8px 16px,rgba(0,255,255,.35) 0 16px 32px;
    transform: scale(1.02) ;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

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
      <StyledButtonUpload onClick={handleButtonClick} style={{ cursor: 'pointer' }}>
        Upload
      </StyledButtonUpload>
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
