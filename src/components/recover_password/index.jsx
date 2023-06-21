import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Input } from './styles';
import DefaultButton from '../default_button';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { currentUrl } from '../../constants/global';

const RecoverPassword = () => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { code, hash } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setPasswordError('Senhas não conferem');
      return;
    }

    try {
      const response = await axios.post(`${currentUrl}/api/password-reset-confirm/${code}/${hash}/`, {
        password,
        password2,
      });
      console.log(response.data);
      Swal.fire({
        title: 'Sucesso!',
        text: 'Parabéns pelo seu cadastro! Tudo ocorreu como o esperado! Insira os dados para logar.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Erro!',
        text: 'Algo deu errado. Por favor, contate nosso suporte! suporte@vertecotech.com',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Input
        type="password"
        placeholder="Nova senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Confirme a nova senha"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />
      {passwordError && (
        <p style={{ color: 'red', fontStyle: 'italic', fontSize: '12px' }}>
          {passwordError}
        </p>
      )}
      <DefaultButton type="submit" text={'Resetar Senha'}></DefaultButton>
    </Container>
  );
};

export default RecoverPassword;
