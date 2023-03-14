import { useState } from 'react'
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { LoginContainer, LoginForm, Input, Button, Img } from './styles'
import { appStatus } from '../../store/modules/app_status/actions'
import { userLogin } from '../../store/modules/login/actions';
import axios from 'axios';

import Logo from '../../assets/logo-vert-white.png'
//import Logo from '../../assets/marca-vert.png'

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const app_status = useSelector((state) => state.app_status.status);
  const login = useSelector((state) => state.app_status.status);
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  console.log(app_status)
  console.log('essas são as informações do login', login)

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      console.log('sending login request...');
      axios.post('http://localhost:8000/api/login/', {
        email,
        password,
      }).then(response => {
        console.log('Login successful:', response.data);
        // Store the token in the sessionStorage
        sessionStorage.setItem('Authorization', response.data.token);
        dispatch(userLogin(response.data.accessToken));
        // Navigate to the welcome page on successful login
        handleLoginClick();
      });
    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Algo de errado aconteceu. Verifique o procedimento e tente novamente.');
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
  
  return (
      <LoginContainer>
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
              <LoginForm onSubmit={handleSubmit}>
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={event => setUsername(event.target.value)}
                />
                <div>
                  <Button>Enviar Email</Button>
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
            </LoginForm>}
        </motion.div>
        {app_status != 'forgot_password' && <a href="" style={{color: 'white'}} onClick={(e) => forgotPassword(e)} >Esqueceu a senha?</a>}
      </LoginContainer>
  );
};

export default Login;