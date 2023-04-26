import { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { LoginContainer, LoginForm, Input, Button, Img } from './styles'
import { appStatus } from '../../store/modules/app_status/actions'
import { userLogin } from '../../store/modules/login/actions';
import axios from 'axios';
import { currentUrl } from '../../constants/global';
import Loading from '../../assets/gifs/animation_500_lgnrtga8.gif'
import Logo from '../../assets/logo-vert-white.png'
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
      axios.post(`http://${currentUrl}:8000/api/login/`, {
        email,
        password,
      }).then(response => {
        // Store the token in the sessionStorage
        sessionStorage.setItem('Authorization', response.data.access);
        // Navigate to the welcome page on successful login
        setShowLoading(true);
        setTimeout(() => {
          handleLoginClick(response); 
          dispatch(userLogin(response.data.access, response.data));
        }, 4000);
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

  const handleRememberPassword = (e) => {
    e.preventDefault();
    dispatch(appStatus(''));
  }


  const handleSendPasswordBack = (e) => {
    e.preventDefault();
    axios.post(`http://${currentUrl}:8000/api/recover-password/`) // send GET request to get CSRF token
      .then(response => {
        const csrfToken = response.data.csrfToken;
        axios.defaults.headers.post['X-CSRF-Token'] = csrfToken; // set CSRF token as a header in all subsequent POST requests
        return axios.post(`http://${currentUrl}:8000/api/recover-password/`, { email })
      })
      .then(response => {
        console.log(response.data); // handle success response
        Swal.fire({
          title: 'Sucesso!',
          text: 'Seu email foi enviado com sucesso! Cheque sua caixa de entrada ou spam.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch(error => {
        console.error(error); // handle error response
        Swal.fire({
          title: 'Erro!',
          text: 'Algo deu errado ao processar a requisição. Caso o erro persista, contate nosso suporte.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }
  
  
  return (
     <LoginContainer>
        {showLoading ? <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}> <h1 style={{color: 'white'}}>Bem Vindo!</h1>
            </motion.div> : 
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            >
          <Img src={Logo} />
          {app_status == 'forgot_password' ? 
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              >
              <LoginForm>
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={event => setUsername(event.target.value)}
                />
                <div>
                  <Button onClick={handleSendPasswordBack}>Enviar Email</Button>
                  <Button onClick={handleRememberPassword}>Voltar</Button>
                </div>
              </LoginForm>
            </motion.div> :
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
            </LoginForm>}</motion.div>}
        {app_status != 'forgot_password' && !showLoading && <a href="" style={{color: 'white'}} onClick={(e) => forgotPassword(e)} >Esqueceu a senha?</a>}
      </LoginContainer>
  );
};

export default Login;