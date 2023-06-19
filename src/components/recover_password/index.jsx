import React, { useState } from 'react';
import axios from 'axios';
import { Container, Input } from './styles';
import DefaultButton from '../default_button';

const RecoverPassword = ({ }) => {


    console.log('entrou dentro do componente!!!');

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    let match = {};
    
    //const { params: { uidb64, token }} = match;

    let token = 'token';
    let uidb64 = 'uidb64';

    const handleSubmit = async e => {
      e.preventDefault();

      if (password !== password2) {
        setPasswordError('Senhas não conferem');
        return;
      }

      try {
          const response = await axios.post(`http://localhost:8000/password-reset-confirm/${uidb64}/${token}/`, {
              password,
              password2
          });
          console.log(response.data);
      } catch (err) {
          console.error(err);
      }
    };

  return (
    <Container onSubmit={handleSubmit}>
      <Input
          type="password"
          placeholder="Nova senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
      />
      <Input
          type="password"
          placeholder="Confirme a senha"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
      />
      {passwordError && <p style={{ color: 'red', fontStyle: 'italic', fontSize: '12px' }}>{passwordError}</p>}
      <DefaultButton type="submit" text={'Resetar Senha'} ></DefaultButton>
    </Container>
  );
};

export default RecoverPassword;

