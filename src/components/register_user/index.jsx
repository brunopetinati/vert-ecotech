import { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { LoginContainer, LoginForm, Input, Button, Img } from './styles'

import axios from "axios";
import Logo from '../../assets/logo-vert-white.png'
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { userLogin } from "../../store/modules/login/actions";
import { currentUrl } from '../../constants/global';
import Swal from 'sweetalert2';
import { handleCepChange } from '../../api/requests/cep';
import { storeCEP } from '../../store/modules/app_data/actions';

const Register = () => {

  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    full_name: '',
    email: '',
    password: '',
    phone: '',
    cep: '',
    city:'',
    state:'',
    street:'',
    district:'',
    user_type: 'Regular'
  });

  const handleClick = () => {
    navigate('/');
  };

  const handleSubmition = () => {
  };

  const CreateUserForm = (event) => {
    event.preventDefault();

    if (formState.password.length < 6) { 
      alert('A senha precisa ter no mínimo 6 caracteres.'); 
      return
    };

    if ( formState.password != passwordConfirmation ) {
      alert('As senhas não conferem.')
      return
    };


    axios.post(`http://${currentUrl}:8000/api/signup/`, formState)
      .then(response => {

        sessionStorage.setItem('Authorization', response.data.access);
        dispatch(userLogin(response.data.access, response.data));
        // Navigate to the welcome page on successful login
        navigate('/welcome');
        setShowLoading(true);
        setTimeout(() => {
          navigate('/');
        }, 6000);
      })
      .catch(error => {
        Swal.fire({
          title: 'Erro!',
          text: 'Algo deu errado ao tentar processar sua requisição. Verifique e tente novamente',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('tracking the following error would be important',error);
        return
      });
    
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));

    if (name === 'cep') {
      const cep = event.target.value;
      checkCEP(cep);
      setFormState({...formState, cep: cep})
    };
  };

  const checkCEP = async (cep) => {
    console.log(cep)
    setFormState({...formState, cep: cep})
    if (cep.length === 9 && !isNaN(cep.charAt(cep.length -1))) {
      const cepObject = await handleCepChange(cep.replace('-',''));
      console.log('cepObject',cepObject);
      setFormState({
        ...formState,
        cep: cepObject.cep,
        street: cepObject.logradouro,
        district: cepObject.bairro,
        state: cepObject.uf,
        city: cepObject.localidade
      });
    };
    dispatch(storeCEP(cep));
  };


  return (
    <LoginContainer>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
        >
      {showLoading ? <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
        ><h1 style={{color: 'white'}}>Registrado com sucesso!</h1></motion.div> : <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}><Img src={Logo} /><LoginForm onSubmit={CreateUserForm}>
        <Input placeholder="Nome Completo" type="text" name="full_name" value={formState.full_name} onChange={handleInputChange} />
        <Input placeholder="Email" type="email" name="email" value={formState.email} onChange={handleInputChange} />
        {validEmail && <div style={{ color: 'red', marginBottom: '16px', marginTop: '-8px', fontStyle: 'italic', fontSize: '12px' }}>Por favor, insira um email válido.</div>}            
        <Input placeholder="Senha" type="password" name="password" value={formState.password} onChange={handleInputChange} />
        <Input placeholder="Confirmar senha" type="password" name="password_confirmation" value={passwordConfirmation} onChange={event => setPasswordConfirmation(event.target.value)} />
        <Input placeholder="Whatsapp" type="tel" name="phone" value={formState.phone} onChange={handleInputChange} 
          mask={"(99) 99999-9999"}
          alwaysShowMask={false}
        />
        <Input
          placeholder="CEP"
          type="text"
          name="cep"
          value={formState.cep}
          onChange={(event) => {
            handleInputChange(event); // Call the original onChange handler to update the state
          }}
          mask={"99999-999"}
        />
        <div>
          <Button onClick={() => handleClick()}>Login</Button>
          <Button onClick={() => handleSubmition()} type="submit">Cadastre-se aqui</Button>
        </div>
      </LoginForm></div>}
    </motion.div>
  </LoginContainer>
  );
};

export default Register;