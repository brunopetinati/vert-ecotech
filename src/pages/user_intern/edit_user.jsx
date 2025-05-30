import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import  Banco from '../bank';
import { StyledButton } from '../../components/default_button/styles'
import { ProfileContainerInfo, IndexContainer, Row, Label, ShowInput } from './styles'
import { handleCepChange } from '../../api/requests/cep';
import { currentUrl } from '../../constants/global';
import { motion } from 'framer-motion';
import { userUpdater } from '../../store/modules/login/actions';
import { useLocation } from 'react-router-dom';

const UserIntern = () => {

  const dispatch = useDispatch();

  const location = useLocation();

  const user = location.state.user;

  const [showModalBanco, setShowModalBanco] = useState(false);

  const handleModalBanco = () => {
    setShowModalBanco(!showModalBanco);
  };

  // Código pertinente ao preenchimento automático do CEP
  
  const [userUpdate, setUserUpdate] = useState({
    id: user.id || '',
    full_name: user.full_name || '',
    rg: user.rg || '',
    cpf: user.cpf || '',
    phone: user.phone || '',
    email: user.email || '',
    user_type: user.user_type || '',
    cep: user.cep || '',
    street: user.street || '',
    number: user.number || '',
    complement: user.complement || '',
    district: user.district || '',
    state: user.state || '',
    city: user.city || '',
  });

  const handleCepOnForm = async (cep) => {
    if (cep.length === 9 && !isNaN(cep.charAt(cep.length -1))) {
      const cepObject = await handleCepChange(cep.replace('-',''))
      setUserUpdate({
        ...userUpdate,
        cep: cepObject.cep,
        street: cepObject.logradouro,
        district: cepObject.bairro,
        state: cepObject.uf,
        city: cepObject.localidade
      })
    }    
  };


  const handleRegister = () => {

    const token = sessionStorage.getItem('Authorization');
    const headers = { Authorization: `Bearer ${token}`, };
    
    axios.put(`${currentUrl}/api/users/${user.id}/update/`, userUpdate, { headers })
      .then(response => {
        dispatch(userUpdater(userUpdate));
      })
      .catch(error => {
        alert('Algo de errado aconteceu. Verifique o procedimento e tente novamente.');
        console.error(error);
        return
      });
  };


  return (
      <IndexContainer>
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        >
        <ProfileContainerInfo>
          <div style={{'overflow-y': 'auto', width: '100%', display: 'flex', flexDirection: 'column', padding: '16px'}}>
            <h2>Meu perfil</h2>
            <Row>
              <Label>Nome completo</Label>
              <ShowInput type="text" defaultValue={userUpdate.full_name} onChange={(e) => setUserUpdate({...userUpdate, full_name: e.target.value})} />
            </Row>
            <Row>
              <Label>Email</Label>
              <ShowInput type="text" defaultValue={userUpdate.email} onChange={(e) => setUserUpdate({...userUpdate, email: e.target.value})}/>
            </Row>
            <Row>
              <Label>Whatsapp</Label>
              <ShowInput type="text"
                onChange={(e) => setUserUpdate({ ...userUpdate, phone: e.target.value})}
                mask={"(99) 99999-9999"}
                maskPlaceholder={"(21) 98787-5512"}
                alwaysShowMask={false}
                defaultValue={userUpdate.phone}
              />
            </Row>
            <Row>
              <Label for="rg">RG:</Label>
              <ShowInput type="text" id="rg" name="rg" 
              mask={"99.999.999-9"}
              maskPlaceholder="47.857.659.3"
              alwaysShowMask={false}
              defaultValue={userUpdate.rg}
              onChange={((e) => setUserUpdate({...userUpdate, rg: e.target.value}))} />
            </Row>
            <Row>            
              <Label for="cpg">CPF:</Label>
              <ShowInput type="text" id="cpg" name="cpg" 
              mask={"999.999.999-99"}
              maskPlaceholder="359.868.555-19"
              alwaysShowMask={false}
              defaultValue={userUpdate.cpf}
              onChange={(e) => setUserUpdate({...userUpdate, cpf: e.target.value})}
              />          
            </Row>
            <Row>            
              <Label for="cnpj">CNPJ:</Label>
              <ShowInput type="text" id="cnpj" name="cnpj" 
              mask={"99.999.999/9999-99"}
              maskPlaceholder="12.345.678/0001-00"
              alwaysShowMask={false}
              onChange={(e) => setUserUpdate({...userUpdate, cnpj: e.target.value})}
              />
            </Row> 
            <Row>
              <Label for="cep">CEP:</Label>
              <ShowInput type="text" id="cep" name="cep" value={userUpdate.cep} onChange={(event) => {
                setUserUpdate({...userUpdate, cep: event.target.value});
                handleCepOnForm(event.target.value);
              }} 
              mask={"99999-999"}
              maskPlaceholder="13140-989"
              alwaysShowMask={false}
              
              />
            </Row>
            <Row>
              <Label for="rua">Rua:</Label>
              <ShowInput type="text" id="rua" name="rua" value={userUpdate.street} onChange={(e) => setUserUpdate({...userUpdate, street: e.target.value})} disabled placeholder="Preencha o CEP para preenchimento automático" />    
            </Row>
            <Row>
              <Label for="numero">Número:</Label>
              <ShowInput type="text" id="numero" name="numero" value={userUpdate.number} onChange={(e) => setUserUpdate({...userUpdate, number: e.target.value})} />
            </Row>
            <Row>
              <Label for="rua">Complemento:</Label>
              <ShowInput type="text" id="complemento" name="complemento" value={userUpdate.complement} onChange={(e) => setUserUpdate({...userUpdate, complement: e.target.value})} />    
            </Row>
            <Row>
              <Label for="bairro">Bairro:</Label>
              <ShowInput type="text" id="bairro" name="bairro" value={userUpdate.district} disabled placeholder="Preencha o CEP para preenchimento automático" onChange={(e) => setUserUpdate({...userUpdate, district: e.target.value})}/>    
            </Row>
            <Row>
              <Label for="cidade">Cidade:</Label>
              <ShowInput type="text" id="cidade" name="cidade" value={userUpdate.city} disabled placeholder="Preencha o CEP para preenchimento automático" onChange={(e) => setUserUpdate({...userUpdate, city: e.target.value})}/>
            </Row>
            <Row>
              <Label for="uf">UF:</Label>
              <ShowInput type="text" id="uf" name="uf" value={userUpdate.state} disabled placeholder="Preencha o CEP para preenchimento automático" onChange={(e) => setUserUpdate({...userUpdate, state: e.target.value})}/>         
            </Row>
            {/* <Row>            
              <Label for="cnpj">Senha:</Label>
              <ShowInput type="text" id="cnpj" name="cnpj" 
              onChange={(e) => setUserUpdate({...userUpdate, password: e.target.value})}
              />
            </Row> */}
            <div style={{display:'flex', flexDirection: 'row', width: '100%', justifyContent : 'flex-end', flexWrap: 'wrap'}}>
              {/* <StyledButton onClick={handleModalBanco} style={{display:'flex', alignSelf: 'flex-end', margin: '32px 0'}}>Informações de banco</StyledButton> */}
              <StyledButton onClick={handleRegister} style={{display:'flex', alignSelf: 'flex-end', margin: '32px 32px'}}>Salvar</StyledButton>
            </div>     
            {showModalBanco && <Banco isOpen={showModalBanco} onClose={handleModalBanco} />}
          </div>
        </ProfileContainerInfo>
        <p />
        </motion.div >
      </IndexContainer>
  )
};

export default UserIntern;