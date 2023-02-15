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

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    email: yup.string().min(6).required(),

    password: yup.string().min(6).required(),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });


  const navigate = useNavigate();


  const handleClick = () => {
    navigate('/');
  };

/*   const handleForm = (result) => {
    axios
      .post("https://kenziehub.me/sessions", result)
      .then((res) => {
        window.localStorage.setItem("authToken", res.data.token);
        window.localStorage.setItem(
          "userLogged",
          JSON.stringify(res.data.user)
        );
        dispatch(setAuthenticate(true));
        history.push("/users");
        setOpen(false);
      })
      .catch(() => {
        dispatch(setAuthenticate(false));
        setOpen(true);
      });
  }; */

  return (
    <LoginContainer>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
            >
        <LoginForm onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Nome completo"
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <Input
            type="text"
            placeholder="Whatsapp"
            value={phone}
            onChange={event => setPhone(event.target.value)}
          />
          <Input
            type="text"
            placeholder="Cidade"
            value={city}
            onChange={event => setCity(event.target.value)}
          />
          <Input
            type="text"
            placeholder="Estado"
            value={state}
            onChange={event => setState(event.target.value)}
          />
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <Input
            type="text"
            placeholder="Senha"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <Input
            type="text"
            placeholder="Confirmar senha"
            value={passwordConfirmation}
            onChange={event => setPasswordConfirmation(event.target.value)}
          />
          <div>
            <Button onClick={() => handleClick()}>Login</Button>
            <Button type="submit">Cadastre-se aqui</Button>
          </div>
        </LoginForm>
      </motion.div>
    </LoginContainer>
  );
};

export default Register;