import { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { LoginContainer, LoginForm, Input, Button, Img } from './styles'
import Logo from '../../assets/logo-vert-white.png'
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { handleCepChange } from '../../api/requests/cep';
import { storeCEP } from '../../store/modules/app_data/actions';
import { removeNonDigits } from '../../constants/functions';
import { storeUserFirstAccess } from '../../store/modules/app_data/actions';

const Register = () => {

  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validPasswordConfirmation, setValidPasswordConfirmation] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [validCEP, setValidCEP] = useState(false);

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
    user_type: 'Regular', 
    accept_terms_of_use: true,
    accept_privacy_politics: true
  });

  const handleClick = () => {
    navigate('/');
  };

  const handleSubmition = (event) => {
    event.preventDefault();

    if (formState.full_name.length < 3) {
      setValidName(true);
      return
    }

    if (formState.email.length < 6) {
      setValidEmail(true);
      return
    };

    if (formState.password.length < 6) { 
      setValidPassword(true);
      return
    };


    if (formState.password != passwordConfirmation ) {
      setValidPasswordConfirmation(true);
      return
    };

    const treatPhone = removeNonDigits(formState.phone);
    if (treatPhone.length < 10) {
      setValidPhone(true);
      return
    }

    if (!formState.cep) {
      Swal.fire({
        title: 'Erro!',
        text: 'Verifique o CEP e tente novamente. Caso o erro persista, contate nosso suporte.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return
    }

    if (formState.cep.includes('_')) {
     setValidCEP(true);
     return
    }
    // o user não está sendo salvo. Está sendo guardado no estado global para aceitar termos mais tarde
    dispatch(storeUserFirstAccess(formState));
    setShowLoading(true);
    setTimeout(() => {
      navigate('/privacy_policy');
    }, 4000);
  };

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));

    if (name === 'cep') {
      const cep = event.target.value;
      checkCEP(cep);
      setFormState({...formState, cep: cep});
    };
  };

  const checkCEP = async (cep) => {
    setFormState({...formState, cep: cep})
    if (cep.length === 9 && !isNaN(cep.charAt(cep.length -1))) {
      const cepObject = await handleCepChange(cep.replace('-',''));
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

  useEffect(()=>{

  }, [formState]);

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
        ><h1 style={{color: 'white'}}>Dados inseridos com sucesso! Continue para o registro</h1>
         </motion.div> : <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}><Img src={Logo} /><LoginForm onSubmit={handleSubmition}>
        <Input placeholder="Nome Completo" type="text" name="full_name" value={formState.full_name} onChange={handleInputChange} />
        {validName && <div style={{ color: 'yellow', marginBottom: '16px', marginTop: '-8px', fontStyle: 'italic', fontSize: '12px' }}>Por favor, insira o nome completo.</div>}            
        <Input placeholder="Email" type="email" name="email" value={formState.email} onChange={handleInputChange} />
        {validEmail && <div style={{ color: 'yellow', marginBottom: '16px', marginTop: '-8px', fontStyle: 'italic', fontSize: '12px' }}>Por favor, insira um email válido.</div>}            
        <Input placeholder="Senha" type="password" name="password" value={formState.password} onChange={handleInputChange} />
        {validPassword && <div style={{ color: 'yellow', marginBottom: '16px', marginTop: '-8px', fontStyle: 'italic', fontSize: '12px' }}>A senha precisa ter no mínimo 6 dígitos.</div>}            
        <Input placeholder="Confirmar senha" type="password" name="password_confirmation" value={passwordConfirmation} onChange={event => setPasswordConfirmation(event.target.value)} />
        {validPasswordConfirmation && <div style={{ color: 'yellow', marginBottom: '16px', marginTop: '-8px', fontStyle: 'italic', fontSize: '12px' }}>As senhas não conferem.</div>}            
        <Input placeholder="Whatsapp" type="tel" name="phone" value={formState.phone} onChange={handleInputChange} 
          mask={"(99) 99999-9999"}
          alwaysShowMask={false}
        />
        {validPhone && <div style={{ color: 'yellow', marginBottom: '16px', marginTop: '-8px', fontStyle: 'italic', fontSize: '12px' }}>Por favor, insira um número de telefone válido.</div>}            
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
        {validCEP && <div style={{ color: 'yellow', marginBottom: '16px', marginTop: '-8px', fontStyle: 'italic', fontSize: '12px' }}>Por favor, insira um CEP válido.</div>}            
        <div>
          <Button onClick={() => handleClick()}>Voltar</Button>
          <Button type="submit">Cadastrar</Button>
        </div>
      </LoginForm></div>}
    </motion.div>
  </LoginContainer>
  );
};

export default Register;