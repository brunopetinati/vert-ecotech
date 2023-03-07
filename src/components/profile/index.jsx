import React, { useState } from 'react';
import  Info from './info';
import  Endereco from './endereco';
import  Banco from './banco';


const RegisterProjectStep1 = () => {

  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalBanco, setShowModalBanco] = useState(false);
  const [showModalEndereco, setShowModalEndereco] = useState(false);

  const handleModalInfo = () => {
    setShowModalInfo(!showModalInfo);
  };

  const handleModalBanco = () => {
    setShowModalBanco(!showModalBanco);
  };

  const handleModalEndereco = () => {
    setShowModalEndereco(!showModalEndereco);
  };

  console.log('here are the three conscutive modals', showModalInfo, showModalBanco, showModalEndereco)

  return (
    <>
      <button onClick={handleModalInfo}>Open Info</button>
      {showModalInfo && <Info isOpen={showModalInfo} onClose={handleModalInfo}/>}
      <button onClick={handleModalBanco}>Open Banco</button>
      {showModalBanco && <Banco isOpen={showModalBanco} onClose={handleModalBanco} />}
      <button onClick={handleModalEndereco}>Open Endereço</button>
      {showModalEndereco && <Endereco isOpen={showModalEndereco} onClose={handleModalEndereco} />}
    </>
  )
};

export default RegisterProjectStep1;