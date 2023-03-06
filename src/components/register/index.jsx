import { useState } from 'react'
import { motion } from "framer-motion";
import { LoginContainer, LoginForm, Input, Button } from './styles'

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { setAuthenticate } from '../../store/modules/authentication/actions';


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
    state: ''
  });

  const handleClick = () => {
    navigate('/');
  };

  const handleSubmition = () => {
    //console.log(formState)
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

    axios.post('http://localhost:8000/api/signup/', formState)
      .then(response => {
        console.log(response);
        //window.localStorage.setItem("authToken", res.data.token);
        /* window.localStorage.setItem(
          "userLogged",
          JSON.stringify(res.data.user)
        ); */
        /* dispatch(setAuthenticate(true));
        history.push("/users");
        setOpen(false); */
      })
      .catch(error => {
        alert('Algo de errado aconteceu. Verifique o procedimento e tente novamente.');
        console.error(error);
      });
    setShowLoading(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
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
        > <h3 style={{color: 'white'}}>Registrado com sucesso!</h3></motion.div> : <LoginForm onSubmit={CreateUserForm}>
        <Input placeholder="Nome" type="text" name="full_name" value={formState.full_name} onChange={handleInputChange} />
        <Input placeholder="Email" type="email" name="email" value={formState.email} onChange={handleInputChange} />
        <Input placeholder="Senha" type="password" name="password" value={formState.password} onChange={handleInputChange} />
        <Input placeholder="Confirmar senha" type="password" name="password_confirmation" value={passwordConfirmation} onChange={event => setPasswordConfirmation(event.target.value)} />
        <Input placeholder="Whatsapp" type="tel" name="phone" value={formState.phone} onChange={handleInputChange} 
          mask={"(99) 99999-9999"}
          maskPlaceholder="+55 21 98787-5512"
          alwaysShowMask={false}
        />
        <Input placeholder="Cidade" type="text" name="city" value={formState.city} onChange={handleInputChange} />
        <Input placeholder="Estado" type="text" name="state" value={formState.state} onChange={handleInputChange} />
        <div>
          <Button onClick={() => handleClick()}>Login</Button>
          <Button onClick={() => handleSubmition()} type="submit">Cadastre-se aqui</Button>
        </div>
      </LoginForm>}
    </motion.div>
  </LoginContainer>
  );
};

export default Register;