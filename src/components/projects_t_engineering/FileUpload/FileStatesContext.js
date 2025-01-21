import React, { createContext, useState, useContext } from 'react';

// Crie o contexto
const FileStatesContext = createContext();

// Provedor do contexto
export const FileStatesProvider = ({ children }) => {
  const [fileStates, setFileStates] = useState({});

  return (
    <FileStatesContext.Provider value={{ fileStates, setFileStates }}>
      {children}
    </FileStatesContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useFileStates = () => useContext(FileStatesContext);
