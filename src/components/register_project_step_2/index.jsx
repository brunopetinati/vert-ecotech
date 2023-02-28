import { Container, InnerContainer, Column, Label, Input, TextArea, Span, Button, ButtonContainer } from './styles'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { appStatus } from '../../store/modules/app_status/actions';


const RegisterProjectStep2 = () => {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(appStatus(''))
  };

  const handleRegister = () => {};

  return (
    <Container>
      <h3>Informações Cadastrais</h3>
      <InnerContainer>
        <Column> 
          <Label>Tipo de pessoa</Label>         
          <Span>Jurídica</Span>
          <p />
          <Label>Razão social</Label>
          <Input  type="text" placeholder='Nome da empresa LTDA' />
          <Label>Possui documentação regulatória?</Label>
          <Input  type="text" />
          <Label>Status do CAR</Label>
          <Input  type="text" />
          <Label>Código da matrícula</Label>
          <Input  type="text" />
          <Label>Possui georreferenciamento da área?</Label>
          <Input  type="text" />
          <Label>Possui déficit de reserva legal?</Label>
          <Input  type="text" />
        </Column>
        <Column>
          <Label>Cadastro realizado em</Label>         
          <Span>23-09-2022</Span>
          <p />
          <Label>CPF/CNPJ</Label>
          <Input  type="text" />
          <Label>Área possui o CAR?</Label>
          <Input  type="text" />
          <Label>Código SICAR(CAR)</Label>
          <Input  type="text" />
          <Label>Status do georreferenciamento no SIGEF</Label>
          <Input  type="text" />
          <Label>Situação da reserva legal da propriedade?</Label>
          <Input  type="text" />
          <Label>Possui unidade de conservação no imóvel?</Label>
          <Input  type="text" />
        </Column>
      </InnerContainer>
      <Column>
          <Label>Possui dívida federal pelo não pagamento de tributos?</Label>
          <Input  type="text" />
          <Label>Existem ações tomadas pelo proprietário para garantir a preservação das florestas existentes no imóvel?</Label>
          <Span>Descrever abaixo quais são essas ações e a data em que foram realizadas.</Span>
          <Span>Estas ações podem ser in loco, tal como cercamento ou aceiro ou pode ser uma ação legal, tal como averbação da reserva legal na matrícula ou criação de uma RPPN.</Span>
            <p />
          <TextArea  type="text" />
      </Column>
      <ButtonContainer>
        <Button onClick={() => handleClick()}>Voltar</Button>
        <Button onClick={() => handleRegister()}>Confirmar</Button>
      </ButtonContainer>
    </Container>
  )
};

export default RegisterProjectStep2;