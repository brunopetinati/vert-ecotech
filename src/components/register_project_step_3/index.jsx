import { useDispatch, useSelector } from "react-redux";
import { Container, InnerContainer, ButtonContainer, Column, Label, Input, Button, Span } from './styles'
import { useNavigate } from 'react-router-dom';
import { appStatus } from '../../store/modules/app_status/actions';
import React from 'react';

const RegisterProjectStep3 = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(appStatus('register_land_continue'))
  };

  const handleRegister = () => {
    console.log('concluded')
  };

  return (
    <Container>
      <h3>Informações Cadastrais</h3>
      <InnerContainer>
        <Column>
          <Label>Tipo de pessoa</Label>         
          <Span>Jurídica || Tipo de pessoa</Span>
          <p />          
          <Label>Área total da propriedade (ha)?</Label>
          <Input  type="text" />
          <Label>Endereço da propriedade</Label>
          <Input  type="text" />
          <Label>Número</Label>
          <Input  type="text" />        
        </Column>
        <Column>
          <Label>Cadastro realizado em</Label>         
          <Span>23-09-2022</Span>
          <p />
          <Label>Área total da reserva legal (ha)?</Label>
          <Input  type="text" />
          <Label>Cidade</Label>
          <Input  type="text" />
          <Label>Complemento</Label>
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

export default RegisterProjectStep3;