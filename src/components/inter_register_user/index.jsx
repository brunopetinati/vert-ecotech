import React, { useState } from 'react';
import  Banco from './banco';
import { StyledButton } from '../default_button/styles';
import { MainContainer, ProfileContainerInfo, IndexContainer, Row, Label, ShowInput, StyledSelect } from './styles'
import { handleCepChange } from '../../api/requests/cep';
import { motion } from 'framer-motion';

const InternRegisterUser = () => {

  const [showModalBanco, setShowModalBanco] = useState(false);
  const [userType, setUserType] = useState('');

  const handleModalBanco = () => {
    setShowModalBanco(!showModalBanco);
  };

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
    if (cep.length === 9 && !isNaN(cep.charAt(cep.length -1))) {
      const cepObject = await handleCepChange(cep.replace('-',''))
      setAddress({
        street: cepObject.logradouro,
        district: cepObject.bairro,
        state: cepObject.uf,
        city: cepObject.localidade
      })
    }    
  };

  const handleSelectUserType = (event) => {
    setUserType(event);
  };

  const [phone, setPhone] = useState('');

  // Informações refetentes ao tipo de usuário, engenheiro ou comercial
  const optionsForAccess = [
    { value: "Engenheiro", label: "Engenheiro" },
    { value: "Comercial", label: "Comercial" },
    { value: "", label: "Sem acesso" }
  ];

  return (
    <MainContainer>
      <IndexContainer>
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        >
        <ProfileContainerInfo>
          <div style={{'overflow-y': 'auto', width: '100%', display: 'flex', flexDirection: 'column', padding: '16px'}}>
            <h3>Cadastro Interno de Usuário</h3>
            <Row>
              <Label>Nome</Label>
              <ShowInput type="text" />
            </Row>
            <Row>
              <Label>Email</Label>
              <ShowInput type="text" />
            </Row>
            <Row>
              <Label>Whatsapp</Label>
              <ShowInput type="text" value={phone}
              onChange={(e) => setPhone(e.target.value)}
              mask={"(99) 99999-9999"}
              maskPlaceholder="(21) 98787-5512"
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
              <ShowInput type="text" id="rua" name="rua" value={address.street} disabled placeholder="Preencha o CEP para preenchimento automático" />    
            </Row>
            <Row>
              <Label for="numero">Número:</Label>
              <ShowInput type="text" id="numero" name="numero" value={address.number} />
            </Row>
            <Row>
              <Label for="rua">Complemento:</Label>
              <ShowInput type="text" id="complemento" name="complemento" value={address.complemento} />    
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
            <Row>
              <Label for="uf">Acesso</Label>
              <StyledSelect
                value={userType}
                onChange={handleSelectUserType}
                options={optionsForAccess}
                placeholder={'Selecione uma opção'}
              />
            </Row>         
            <div style={{display:'flex', flexDirection: 'row', width: '100%', justifyContent : 'flex-end', flexWrap: 'wrap'}}>
              <StyledButton onClick={handleModalBanco} style={{display:'flex', alignSelf: 'flex-end', margin: '32px 0'}}>Adicionar Informações de Banco</StyledButton>
              <StyledButton onClick={handleModalBanco} style={{display:'flex', alignSelf: 'flex-end', margin: '32px 32px'}}>Salvar</StyledButton>
            </div>     
            {showModalBanco && <Banco isOpen={showModalBanco} onClose={handleModalBanco} />}
          </div>
        </ProfileContainerInfo>
        <p />
        </motion.div >
      </IndexContainer>
    </MainContainer>
  )
};

export default InternRegisterUser;