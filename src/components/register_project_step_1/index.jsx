import { useDispatch, useSelector } from "react-redux";
import { Container, InnerContainer, ButtonContainer, Column, Label, Input, Button, Span } from './styles'
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
      <h3>Informações Cadastrais</h3>
      <InnerContainer>
        <Column>
          <Label>Tipo de pessoa</Label>         
          <Span>Jurídica || Tipo de pessoa</Span>
          <p />          
          <Label>Nome do proprietário da área:</Label>
          <Input  type="text" />
          <Label>Telefone Whatsapp do proprietário:</Label>
          <Input  type="text" />
          <Label>E-mail do proprietário:</Label>
          <Input  type="text" />        
        </Column>
        <Column>
          <Label>Cadastro realizado em</Label>         
          <Span>23-09-2022</Span>
          <p />
          <Label>Área total da propriedade (ha)?</Label>
          <Input  type="text" />
          <Label>Área total da reserva legal (ha)?</Label>
          <Input  type="text" />
          <Label>Qual o endereço da propriedade?</Label>
          <Input  type="text" />          
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