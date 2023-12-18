import { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { LoginContainer, LoginForm, Input, Button, Img, StyledButtonLogin, StyledButtonCadastro, StyledButtonEnviarEmail, StyledButtonVoltar } from './styles'
import { appStatus } from '../../store/modules/app_status/actions'
import { userLogin } from '../../store/modules/login/actions';
import { getOwners, getProjects, getEngineeringTable } from '../../store/modules/app_data/thunk';
import axios from 'axios';
import { currentUrl } from '../../constants/global';
import Logo from '../../assets/logo-vert-white.png';
import Swal from 'sweetalert2';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const app_status = useSelector((state) => state.app_status.status);
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  const handleSubmit = async event => {

    event.preventDefault();
    try {
      axios.post(`${currentUrl}/api/login/`, {
        email,
        password,
      }).then(response => {
        sessionStorage.setItem('Authorization', response.data.access);
        const token = response.data.access;
        const usuario_id = response.data.id;
        sessionStorage.setItem('Email', email);
        sessionStorage.setItem('Password', password);
        sessionStorage.setItem('usuario_id', usuario_id);
        setShowLoading(true);
        setTimeout(() => {
          handleLoginClick(response); 
          dispatch(userLogin(token, response.data));
          dispatch(getOwners(token));
          dispatch(getProjects(token));
          dispatch(getEngineeringTable(token));
        }, 500);
        dispatch(appStatus('Dashboard'));
      }).catch(error => {
        console.error('Login failed:', error.message);
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível logar, verifique as informações e tente novamente.',
          icon: 'error',
          confirmButtonText: 'OK'
        });        
      });
    } catch (error) {
      console.error('Login failed:', error.message);
      Swal.fire({
        title: 'Erro!',
        text: 'Não foi possível logar, verifique as informações e tente novamente.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };
  

  const handleLoginClick = () => {
    navigate('/welcome');
  };


  const handleRegisterClick = () => {
    navigate('/register');
  };

  const forgotPassword = (e) => {
    e.preventDefault();
    dispatch(appStatus('forgot_password'));
  };

  const handleComeBack = (e) => {
    e.preventDefault();
    dispatch(appStatus(''));
  }

  const handleSendPasswordBack = (e) => {
    e.preventDefault();
    axios.post(`${currentUrl}/api/password-reset/`, { email: email })
      .then(response => {
        Swal.fire({
          title: 'Success!',
          text: 'Seu email foi enviado com sucesso! Cheque sua caixa de entrada, spam ou lixo eletrônico.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch(error => {
        console.error(error); 
        Swal.fire({
          title: 'Error!',
          text:  'Algo deu errado ao tentar processar essa atividade. Por favor, contate nosso suporte. suporte@vertecotech.com',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }
    
  return (
    <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
    <LoginContainer>
    {showLoading ? (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
        <h1 style={{ color: 'white', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: '700', fontSize: '48px', letterSpacing: '0' }}>Bem Vindo!</h1>
      </motion.div>
    ) : (
      <>
        <Img src={Logo} />
        {app_status === 'forgot_password' ? (
          <LoginForm>
            <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={event => setUsername(event.target.value)}
            />
            <div style={{ marginTop: '20px' }}>
              <StyledButtonEnviarEmail onClick={handleSendPasswordBack} style={{ margin: '0 15px' }}>Enviar e-mail</StyledButtonEnviarEmail>
              <StyledButtonVoltar onClick={handleComeBack} style={{ margin: '0px 15px 0px 0px' }}>Voltar</StyledButtonVoltar>
            </div>
          </LoginForm>
        ) : (

          <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.5 }}
        transition={{ duration: 0.1 }}
      >
          <LoginForm onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={event => setUsername(event.target.value)}
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            <div style={{ marginTop: '20px' }}>
              <StyledButtonLogin type="submit" style={{ margin: '0 15px' }}>Login</StyledButtonLogin>
              <StyledButtonCadastro onClick={() => handleRegisterClick()} style={{ margin: '0px 15px 0px 0px' }}>Cadastre-se aqui</StyledButtonCadastro>
            </div>
          </LoginForm></motion.div>
        )}
        {!showLoading && app_status !== 'forgot_password' && (
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 5 }}
                  >
          <a href="" style={{ color: 'white', fontFamily: 'Arial', textDecoration: 'none', fontStyle: 'italic' }} onClick={(e) => forgotPassword(e)}>
            Esqueceu a senha?
          </a>
        </motion.div>
        )}
      </>
    )}
  </LoginContainer>  
  </motion.div>
  );
};

export default Login;