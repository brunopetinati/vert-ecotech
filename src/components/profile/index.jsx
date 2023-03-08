import React, { useState } from 'react';
import  Banco from './banco';
import { StyledButton } from '../default_button/styles';
import { ProfileContainerInfo, IndexContainer, Row, ShowShowInput, Label, ShowInput } from './styles'
import { handleCepChange } from '../../api/requests/cep';
import { motion } from 'framer-motion';

const Profile = () => {

  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalBanco, setShowModalBanco] = useState(false);
  const [showModalEndereco, setShowModalEndereco] = useState(false);

  /* const handleModalInfo = () => {
    setShowModalInfo(!showModalInfo);
  }; */

  const handleModalBanco = () => {
    setShowModalBanco(!showModalBanco);
  };

  /* const handleModalEndereco = () => {
    setShowModalEndereco(!showModalEndereco);
  }; */

  // Código pertinente ao preenchimento automático do CEP
  
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState({
    street: '',
    district: '',
    number: '',
    complemento: '',
    state: '',
    city: ''
    // add more fields as needed
  });

  const handleCepOnForm = async (cep) => {
    if (cep.length === 8) {
      const cepObject = await handleCepChange(cep)
      console.log(cepObject)
      setAddress({
        street: cepObject.logradouro,
        district: cepObject.bairro,
        state: cepObject.uf,
        city: cepObject.localidade
      })
    }    
  };

  const [phone, setPhone] = useState('');
  

  return (
    <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
              >
      <IndexContainer>
        <ProfileContainerInfo>
          <div style={{'overflow-y': 'auto', width: '100%', display: 'flex', flexDirection: 'column', padding: '16px'}}>
            <h3>Informações</h3>
            <Row>
              <Label>Nome</Label>
              <ShowInput type="text" value={'Fernando Gonçalves Aguilar'} />
            </Row>
            <Row>
              <Label>Email</Label>
              <ShowInput type="text" value={'fernando@email.com'} />
            </Row>
            <Row>
              <Label>Whatsapp</Label>
              <ShowInput type="text" value={phone} 
              mask={"(99) 99999-9999"}
              maskPlaceholder="+55 21 98787-5512"
              alwaysShowMask={false}
              />
            </Row>
            <Row>
              <Label for="rg">RG:</Label>
              <ShowInput type="text" id="rg" name="rg" 
              mask={"99.999.999-9"}
              maskPlaceholder="47.857.659.3"
              alwaysShowMask={false} />
            </Row>
            <Row>            
              <Label for="cpg">CPF:</Label>
              <ShowInput type="text" id="cpg" name="cpg" 
              mask={"999.999.999-99"}
              maskPlaceholder="359.868.555-19"
              alwaysShowMask={false}
              />          
            </Row>
            <Row>            
              <Label for="cnpj">CNPJ:</Label>
              <ShowInput type="text" id="cnpj" name="cnpj" 
              mask={"99.999.999/9999-99"}
              maskPlaceholder="12.345.678/0001-00"
              alwaysShowMask={false}
              />
            </Row>
            <Row>
              <Label for="cep">CEP:</Label>
              <ShowInput type="text" id="cep" name="cep" value={cep} onChange={(event) => {
                handleCepOnForm(event.target.value)
                setCep(event.target.value)
              }} 
              mask={"99999-999"}
              maskPlaceholder="13140-989"
              alwaysShowMask={false}
              />
            </Row>
            <Row>
              <Label for="rua">Rua:</Label>
              <ShowInput type="text" id="rua" name="rua" value={address.street} disabled placeholder="Preencha o CEP para auto preenchimento" />    
            </Row>
            <Row>
              <Label for="numero">Número:</Label>
              <ShowInput type="text" id="numero" name="numero" value={address.number} />
            </Row>
            <Row>
              <Label for="rua">Complemento:</Label>
              <ShowInput type="text" id="complemento" name="complemento" value={address.complemento} disabled placeholder="Preencha o CEP para auto preenchimento" />    
            </Row>
            <Row>
              <Label for="bairro">Bairro:</Label>
              <ShowInput type="text" id="bairro" name="bairro" value={address.district} disabled placeholder="Preencha o CEP para preenchimento automático"/>    
            </Row>
            <Row>
              <Label for="cidade">Cidade:</Label>
              <ShowInput type="text" id="cidade" name="cidade" value={address.city} disabled placeholder="Preencha o CEP para preenchimento automático"/>
            </Row>
            <Row>
              <Label for="uf">UF:</Label>
              <ShowInput type="text" id="uf" name="uf" value={address.state} disabled placeholder="Preencha o CEP para preenchimento automático"/>         
            </Row>          
            <StyledButton onClick={handleModalBanco} style={{display:'flex', alignSelf: 'flex-end', margin: '32px 0'}}>Adicionar Banco</StyledButton>
            {showModalBanco && <Banco isOpen={showModalBanco} onClose={handleModalBanco} />}
          </div>
        </ProfileContainerInfo>

        {/* <ButtonContainerIndex style={{marginTop: '16px'}}>
          <StyledButton onClick={handleModalInfo}>Adicionar Informações</StyledButton>
          {showModalInfo && <Info isOpen={showModalInfo} onClose={handleModalInfo}/>}
          <StyledButton onClick={handleModalEndereco}>Adicionar Endereço</StyledButton>
          {showModalEndereco && <Endereco isOpen={showModalEndereco} onClose={handleModalEndereco} />}
        </ButtonContainerIndex> */}
        <p />
      </IndexContainer>
    </motion.div>
  )
};

export default Profile;