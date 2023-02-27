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

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

/*   const handleSubmit = event => {
    event.preventDefault();
    console.log('username:', name);
    console.log('password:', password);
  }; */
  
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    full_name: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    state: ''
  });

  /* const schema = yup.object().shape({
    email: yup.string().min(6).required(),

    password: yup.string().min(6).required(),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  }); */




  const handleClick = () => {
    navigate('/');
  };

  const handleSubmition = () => {
    console.log(formState)
  };

  const CreateUserForm = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8000/api/users/', formState)
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
        console.error(error);
      });
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <LoginContainer>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
            >
        <LoginForm onSubmit={CreateUserForm}>
          <Input placeholder="Nome" type="text" name="full_name" value={formState.full_name} onChange={handleInputChange} />
          <Input placeholder="Email" type="email" name="email" value={formState.email} onChange={handleInputChange} />
          <Input placeholder="Senha" type="password" name="password" value={formState.password} onChange={handleInputChange} />
          <Input placeholder="Whatsapp" type="tel" name="phone" value={formState.phone} onChange={handleInputChange} />
          <Input placeholder="Cidade" type="text" name="city" value={formState.city} onChange={handleInputChange} />
          <Input placeholder="Estado" type="text" name="state" value={formState.state} onChange={handleInputChange} />
          <div>
            <Button onClick={() => handleClick()}>Login</Button>
            <Button onClick={() => handleSubmition()} type="submit">Cadastre-se aqui</Button>
          </div>
        </LoginForm>
      </motion.div>
    </LoginContainer>
  );
};

export default Register;