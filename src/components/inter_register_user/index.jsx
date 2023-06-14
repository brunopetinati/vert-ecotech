import React, { useState } from 'react';
import  Banco from '../bank';
import { StyledButton } from '../default_button/styles';
import { MainContainer, ProfileContainerInfo, Row, Label, ShowInput, StyledSelect } from './styles'
import { handleCepChange } from '../../api/requests/cep';
import { motion } from 'framer-motion';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { currentUrl } from '../../constants/global';
import { addUserToUsers } from '../../store/modules/app_data/actions';
import { useDispatch } from 'react-redux';

const InternRegisterUser = () => {

  const [showModalBanco, setShowModalBanco] = useState(false);

  const navigate = useNavigate();

  const handleModalBanco = () => {
    setShowModalBanco(!showModalBanco);
  };

  const dispatch = useDispatch();

  // Código pertinente ao preenchimento automático do CEP
  
  const [userObject, setUserObject] = useState({
    id: '',
    full_name: '',
    rg: '',
    cpf: '',
    phone: '',
    email: '',
    user_type: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    district: '',
    state:  '',
    city:  '',
    user_type: '',
    password: '123mudar',
  });

  const handleCepOnForm = async (cep) => {
    if (cep.length === 9 && !isNaN(cep.charAt(cep.length -1))) {
      const cepObject = await handleCepChange(cep.replace('-',''))
      setUserObject({
        ...userObject,
        cep: cepObject.cep,
        street: cepObject.logradouro,
        district: cepObject.bairro,
        state: cepObject.uf,
        city: cepObject.localidade
      })
    }    
  };

  const handleAccesTypeChange = (e) => {
    setUserObject({...userObject, user_type: e.value})
  };

  const [verifyName, setVerifyName] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [verifyPhone, setVerifyPhone] = useState(false);
  const [verifyCEP, setVerifyCEP] = useState(false);
  const [verifyAccessType, setVerifyAccestype] = useState(false);

  const handleRegister = () => {

    const token = sessionStorage.getItem('Authorization');
    const headers = { Authorization: `Bearer ${token}`, };
  
    if(!userObject.email || !/^\S+@\S+\.\S+$/.test(userObject.email) || !userObject.cep || userObject.cep.length < 9 || !userObject.full_name || !userObject.phone || !userObject.user_type) {
  
      if(!userObject.email) {
        setVerifyEmail(true);
      }
  
      if(!userObject.cep) {
        setVerifyCEP(true);
      }
  
      if(!userObject.full_name) {
        setVerifyName(true);
      }
  
      if(!userObject.phone) {
        setVerifyPhone(true);
      }
  
      if(!userObject.user_type) {
        setVerifyAccestype(true);
      }
  
      Swal.fire({
        title: 'Erro!',
        text: 'Verifique os campos que ainda faltam serem preenchidos.',
        icon: 'error',
        confirmButtonText: 'OK'
      });        
      return;
    };
    
    axios.post(`${currentUrl}/api/signup/`, userObject, { headers })
      .then(response => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Sua requisição foi processada com sucesso.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        dispatch(addUserToUsers(response.data))
        navigate('/welcome');
      })
      .catch(error => {
        Swal.fire({
          title: 'Erro!',
          text: 'Algo deu errado ao tentar processar sua requisição.',
          icon: 'error',
          confirmButtonText: 'OK'
        })        
        console.error(error);
        return
      });
  };


  const handleComeBack = () =>{
    navigate('/welcome');
  }

  const optionsAccess = [
    { value: "Comercial", label: "Comercial" },
    { value: "Engenheiro", label: "Engenheiro" },
    { value: "Regular", label: "Regular" },
  ];


  return (
      <MainContainer>
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        >
        <ProfileContainerInfo>
          <div style={{'overflow-y': 'auto', width: '100%', display: 'flex', flexDirection: 'column', padding: '16px'}}>
            <h3>Cadastrar novo usuário</h3>
            <Row>
              <Label>Nome completo</Label>
              <div>
                <ShowInput type="text" defaultValue={userObject.full_name} onChange={(e) => setUserObject({...userObject, full_name: e.target.value})} />              
                {verifyName && <div style={{ color: 'red', marginBottom: '16px', marginTop: '-8px', fontStyle: 'italic', fontSize: '12px' }}>Esse campo é necessário</div>}
              </div>
            </Row>
            <Row>
              <Label>Email</Label>
              <div>
                <ShowInput type="text" defaultValue={userObject.email} onChange={(e) => setUserObject({...userObject, email: e.target.value})}/>
                {verifyEmail && <div style={{ color: 'red', marginBottom: '16px', marginTop: '-8px', fontStyle: 'italic', fontSize: '12px' }}>Esse campo é necessário</div>}
              </div>
            </Row>
            <Row>
              <Label>Whatsapp</Label>
              <div>
                <ShowInput type="text"
                  onChange={(e) => setUserObject({ ...userObject, phone: e.target.value})}
                  mask={"(99) 99999-9999"}
                  maskPlaceholder={"(21) 98787-5512"}
                  alwaysShowMask={false}
                  defaultValue={userObject.phone}
                />
                {verifyPhone && <div style={{ color: 'red', marginBottom: '16px', marginTop: '-8px', fontStyle: 'italic', fontSize: '12px' }}>Esse campo é necessário</div>}                
              </div>
            </Row>
            <Row>
              <Label for="rg">RG:</Label>
              <ShowInput type="text" id="rg" name="rg" 
              mask={"99.999.999-9"}
              maskPlaceholder="47.857.659.3"
              alwaysShowMask={false}
              defaultValue={userObject.rg}
              onChange={((e) => setUserObject({...userObject, rg: e.target.value}))} />
            </Row>
            <Row>            
              <Label for="cpg">CPF:</Label>
              <ShowInput type="text" id="cpg" name="cpg" 
              mask={"999.999.999-99"}
              maskPlaceholder="359.868.555-19"
              alwaysShowMask={false}
              defaultValue={userObject.cpf}
              onChange={(e) => setUserObject({...userObject, cpf: e.target.value})}
              />          
            </Row>
            <Row>            
              <Label for="cnpj">CNPJ:</Label>
              <ShowInput type="text" id="cnpj" name="cnpj" 
              mask={"99.999.999/9999-99"}
              alwaysShowMask={false}
              defaultValue={userObject.cnpj}
              onChange={(e) => setUserObject({...userObject, cnpj: e.target.value})}
              />
            </Row>
            <Row>
              <Label for="cep">CEP:</Label>
              <div>
                <ShowInput type="text" id="cep" name="cep" value={userObject.cep} onChange={(event) => {
                  setUserObject({...userObject, cep: event.target.value});
                  handleCepOnForm(event.target.value);
                  }} 
                  mask={"99999-999"}
                  maskPlaceholder="13140-989"
                  alwaysShowMask={false}
                />
                {verifyCEP && <div style={{ color: 'red', marginBottom: '16px', marginTop: '-8px', fontStyle: 'italic', fontSize: '12px' }}>Esse campo é necessário</div>}                
              </div>

            </Row>
            <Row>
              <Label for="rua">Rua:</Label>
              <ShowInput type="text" id="rua" name="rua" value={userObject.street} onChange={(e) => setUserObject({...userObject, street: e.target.value})} disabled placeholder="Preencha o CEP para preenchimento automático" />    
            </Row>
            <Row>
              <Label for="numero">Número:</Label>
              <ShowInput type="text" id="numero" name="numero" value={userObject.number} onChange={(e) => setUserObject({...userObject, number: e.target.value})} />
            </Row>
            <Row>
              <Label for="rua">Complemento:</Label>
              <ShowInput type="text" id="complemento" name="complemento" value={userObject.complement} onChange={(e) => setUserObject({...userObject, complement: e.target.value})} />    
            </Row>
            <Row>
              <Label for="bairro">Bairro:</Label>
              <ShowInput type="text" id="bairro" name="bairro" value={userObject.district} disabled placeholder="Preencha o CEP para preenchimento automático" onChange={(e) => setUserObject({...userObject, district: e.target.value})}/>    
            </Row>
            <Row>
              <Label for="cidade">Cidade:</Label>
              <ShowInput type="text" id="cidade" name="cidade" value={userObject.city} disabled placeholder="Preencha o CEP para preenchimento automático" onChange={(e) => setUserObject({...userObject, city: e.target.value})}/>
            </Row>
            <Row>
              <Label for="uf">UF:</Label>
              <ShowInput type="text" id="uf" name="uf" value={userObject.state} disabled placeholder="Preencha o CEP para preenchimento automático" onChange={(e) => setUserObject({...userObject, state: e.target.value})}/>         
            </Row>
            <Row>
              <Label>Tipo de acesso</Label>
              <div>
                <StyledSelect
                  options={optionsAccess}
                  placeholder={'Selecione uma opção'}
                  onChange={handleAccesTypeChange}
                />
                {verifyAccessType && <div style={{ color: 'red', marginBottom: '16px', marginTop: '-8px', fontStyle: 'italic', fontSize: '12px' }}>Esse campo é necessário</div>}
              </div>
            </Row>
            {/* <Row>            
              <Label for="cnpj">Senha:</Label>
              <ShowInput type="text" id="cnpj" name="cnpj" 
              onChange={(e) => setUserObject({...userObject, password: e.target.value})}
              />
            </Row> */}
            <div style={{display:'flex', flexDirection: 'row', width: '100%', justifyContent : 'flex-end', flexWrap: 'wrap'}}>
              <StyledButton onClick={handleModalBanco} style={{display:'flex', alignSelf: 'flex-end', margin: '32px 0'}}>Informações de banco</StyledButton>
              <StyledButton onClick={handleRegister} style={{display:'flex', alignSelf: 'flex-end', margin: '32px 32px'}}>Cadastrar</StyledButton>
              <StyledButton onClick={handleComeBack} style={{display:'flex', alignSelf: 'flex-end', margin: '32px 0px'}}>Voltar</StyledButton>
            </div>     
            {showModalBanco && <Banco isOpen={showModalBanco} onClose={handleModalBanco} />}
          </div>
        </ProfileContainerInfo>
        <p />
        </motion.div >
      </MainContainer>
  )
};

export default InternRegisterUser;