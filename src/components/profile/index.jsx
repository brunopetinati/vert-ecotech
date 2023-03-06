import { useDispatch, useSelector } from "react-redux";
import { Centralizer, Container, InnerContainer, ButtonContainer, Column, Label, Input, Button, Span } from './styles'
import { useNavigate } from 'react-router-dom';
import { appStatus } from '../../store/modules/app_status/actions';
import React from 'react';

const RegisterProjectStep1 = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/welcome')
  };

  const handleRegister = () => {
    dispatch(appStatus('register_land_continue'))
  };

  return (
      <Container>
        <h3>Meu Perfil</h3>
        <InnerContainer>
          <Column>
      
            <Label for="rg">RG:</Label>
            <Input type="text" id="rg" name="rg" />
            <Label for="cpg">CPG:</Label>
            <Input type="text" id="cpg" name="cpg" />
            <Label for="cnpj">CNPJ:</Label>
            <Input type="text" id="cnpj" name="cnpj" />
            <Label for="cep">CEP:</Label>
            <Input type="text" id="cep" name="cep" />
            <Label for="rua">Rua:</Label>
            <Input type="text" id="rua" name="rua" />
            <Label for="numero">Número:</Label>
            <Input type="text" id="numero" name="numero" />
            <Label for="bairro">Bairro:</Label>
            <Input type="text" id="bairro" name="bairro" />    
          </Column>
          <Column>            
            <Label for="cidade">Cidade:</Label>
            <Input type="text" id="cidade" name="cidade"/>

            <Label for="uf">UF:</Label>
            <Input type="text" id="uf" name="uf"/>

            <Label for="tipo_conta">Tipo de conta:</Label>
            <Input type="text" id="tipo_conta" name="tipo_conta"/>

            <Label for="banco">Banco:</Label>
            <Input type="text" id="banco" name="banco"/>

            <Label for="conta">Conta:</Label>
            <Input type="text" id="conta" name="conta"/>

            <Label for="agencia">Agência:</Label>
            <Input type="text" id="agencia" name="agencia"/>

            <Label for="chave_pix">Chave PIX:</Label>
            <Input type="text" id="chave_pix" name="chave_pix"/>
          </Column>
        </InnerContainer>
        <ButtonContainer>
          <Button onClick={() => handleClick()}>Voltar</Button>
          <Button onClick={() => handleRegister()}>Confirmar</Button>
        </ButtonContainer>
      </Container>
  )
};

export default RegisterProjectStep1;