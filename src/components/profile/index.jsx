import React, { useState } from 'react';
import  Info from './info';
import  Endereco from './endereco';
import  Banco from './banco';
import { StyledButton } from '../default_button/styles';
import { InnerContainer, ButtonContainerIndex, IndexContainer } from './styles'


const Profile = () => {

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
    <IndexContainer>
      <ButtonContainerIndex>
      </ButtonContainerIndex>
      <ButtonContainerIndex style={{marginTop: '100px'}}>
        <StyledButton onClick={handleModalInfo}>Adicionar Informações</StyledButton>
        {showModalInfo && <Info isOpen={showModalInfo} onClose={handleModalInfo}/>}
        <StyledButton onClick={handleModalBanco}>Adicionar Banco</StyledButton>
        {showModalBanco && <Banco isOpen={showModalBanco} onClose={handleModalBanco} />}
        <StyledButton onClick={handleModalEndereco}>Adicionar Endereço</StyledButton>
        {showModalEndereco && <Endereco isOpen={showModalEndereco} onClose={handleModalEndereco} />}
      </ButtonContainerIndex>
      <p />
    </IndexContainer>
  )
};

export default Profile;