import React, { createContext, useState, useContext } from 'react';

// Crie o contexto
const MyContext = createContext();

// Provedor do contexto
export const MyContextProvider = ({ children }) => {
  const [value, setValue] = useState('defaultValue');

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useMyContext = () => useContext(MyContext);
