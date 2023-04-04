import { useState } from 'react'
import { motion } from "framer-motion";
import { LoginContainer, LoginForm, Input, Button, Img } from './styles'

import axios from "axios";
import Logo from '../../assets/logo-vert-white.png'
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { userLogin } from "../../store/modules/login/actions";


const Register = () => {

  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    full_name: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    state: '',
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
    }

    if ( formState.password != passwordConfirmation ) {
      alert('As senhas não conferem.')
      return
    } 

    axios.post('http://3.145.151.125:8000/api/signup/', formState)
      .then(response => {
        // editar código aqui de quando der certo se cadastrar
        //window.localStorage.setItem("authToken", res.data.token);
        /* window.localStorage.setItem(
          "userLogged",
          JSON.stringify(res.data.user)
        ); */
        /* dispatch(setAuthenticate(true));
        history.push("/users");
        setOpen(false); */
        // Store the token in the sessionStorage
        sessionStorage.setItem('Authorization', response.data.access);
        dispatch(userLogin(response.data.access, response.data));
        // Navigate to the welcome page on successful login
        navigate('/welcome');
      })
      .catch(error => {
        alert('Algo de errado aconteceu. Verifique o procedimento e tente novamente.');
        console.error(error);
        return
      });
    setShowLoading(true);
    setTimeout(() => {
      navigate('/');
    }, 6000);
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const RegisterComponent = () => {
    return
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
        <Input placeholder="Nome" type="text" name="full_name" value={formState.full_name} onChange={handleInputChange} />
        <Input placeholder="Email" type="email" name="email" value={formState.email} onChange={handleInputChange} />
        <Input placeholder="Senha" type="password" name="password" value={formState.password} onChange={handleInputChange} />
        <Input placeholder="Confirmar senha" type="password" name="password_confirmation" value={passwordConfirmation} onChange={event => setPasswordConfirmation(event.target.value)} />
        <Input placeholder="Whatsapp" type="tel" name="phone" value={formState.phone} onChange={handleInputChange} 
          mask={"(99) 99999-9999"}
          alwaysShowMask={false}
        />
        <Input placeholder="Cidade" type="text" name="city" value={formState.city} onChange={handleInputChange} />
        <Input placeholder="Estado" type="text" name="state" value={formState.state} onChange={handleInputChange} />
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