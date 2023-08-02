import { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { LoginContainer, LoginForm, Input, Button, Img } from './styles'
import { appStatus } from '../../store/modules/app_status/actions'
import { userLogin } from '../../store/modules/login/actions';
import { getOwners, getEngineeringTable } from '../../store/modules/app_data/thunk';
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
        setShowLoading(true);
        setTimeout(() => {
          handleLoginClick(response); 
          dispatch(userLogin(response.data.access, response.data));
        }, 4000);
        dispatch(appStatus('Dashboard'));
        dispatch(getOwners());
        dispatch(getEngineeringTable());
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
        console.log(response);
        Swal.fire({
          title: 'Success!',
          text: 'Seu email foi enviado com sucesso! Cheque sua caixa de entrada, spam ou lixo eletrônico.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch(error => {
        console.error(error); // handle error response
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
      >
    <LoginContainer>
    {showLoading ? (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
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
            <div>
              <Button onClick={handleSendPasswordBack}>Enviar Email</Button>
              <Button onClick={handleComeBack}>Voltar</Button>
            </div>
          </LoginForm>
        ) : (
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
            <div>
              <Button type="submit">Login</Button>
              <Button onClick={() => handleRegisterClick()}>Cadastre-se aqui</Button>
            </div>
          </LoginForm>
        )}
        {!showLoading && app_status !== 'forgot_password' && (
          <a href="" style={{ color: 'white', fontFamily: 'Arial' }} onClick={(e) => forgotPassword(e)}>
            Esqueceu a senha?
          </a>
        )}
      </>
    )}
  </LoginContainer>  
  </motion.div>
  );
};

export default Login;