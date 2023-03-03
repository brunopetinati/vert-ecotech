import { useState } from 'react'
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import { LoginContainer, LoginForm, Input, Button, Img } from './styles'
import axios from 'axios';

import Logo from '../../assets/logo-vert-white.png'
//import Logo from '../../assets/marca-vert.png'


const Login = () => {

  const navigate = useNavigate();
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /* const handleSubmit = async event => {
    //event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      // Navigate to the welcome page on successful login
      handleLoginClick();
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  }; */

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      console.log('sending login request...');
      const response = await axios.post('http://localhost:8000/api/login/', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      // Navigate to the welcome page on successful login
      handleLoginClick();
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const handleLoginClick = () => {
    navigate('/welcome');
  };


  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
      <LoginContainer>
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
              >
          <Img src={Logo} ></Img>
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
              {/* <Button onClick={() => handleLoginClick()} type="submit">Login</Button> */}
              <Button type="submit">Login</Button>

              <Button onClick={() => handleRegisterClick()}>Cadastre-se aqui</Button>
            </div>
          </LoginForm>
        </motion.div>
      </LoginContainer>
  );
};

export default Login;