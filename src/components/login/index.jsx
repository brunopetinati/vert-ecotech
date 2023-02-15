import { useState } from 'react'
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import { LoginContainer, LoginForm, Input, Button, Img } from './styles'

import Logo from '../../assets/logo-vert-white.png'
//import Logo from '../../assets/marca-vert.png'


const Login = () => {

  const navigate = useNavigate();
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    console.log('username:', email);
    console.log('password:', password);
  };

  const handleClick = () => {
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
              <Button type="submit">Login</Button>
              <Button onClick={() => handleClick()}>Cadastre-se aqui</Button>
            </div>
          </LoginForm>
        </motion.div>
      </LoginContainer>
  );
};

export default Login;