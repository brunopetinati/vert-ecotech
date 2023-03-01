import { Container, InnerContainer, Column, Label, Input, TextArea, Span, Button, ButtonContainer, StyledSelect } from './styles'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { appStatus } from '../../store/modules/app_status/actions';


const RegisterProjectStep2 = () => {


  const [selectedCar, setSelectedCar] = useState(null);

  const optionsCar = [
    { value: "Ativo", label: "Ativo" },
    { value: "Pendente", label: "Pendente" },
    { value: "Cancelado", label: "Cancelado" },
    { value: null, label: "Não possui CAR" },
  ];

  const handleOptionsCar = (selectedCar) => {
    setSelectedCar(selectedCar);
  };

  const [selectedStatusMatricula, setSelectedStatusMatricula] = useState('')

  const optionsStatusMatricula = [
    { value: "Vigente", label: "Vigente" },
    { value: "Em atualização", label: "Em atualização" },
    { value: "Cancelada", label: "Cancelada" }
  ];

  const handleStatusMatricula = (selectedStatusMatricula) => {
    setSelectedStatusMatricula(selectedStatusMatricula);
  };

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(appStatus(''))
  };

  const handleRegister = () => {
    dispatch(appStatus('register_land_upload_files'))
  };
  

  return (
    <Container>
      <h3>Informações Cadastrais</h3>
      <InnerContainer>
        <Column> 
          <Label>Tipo de pessoa</Label>         
          <Span>Jurídica</Span>
          <p />
          <Label>CPF/CNPJ</Label>
          <Input  type="text" />
          <Label>Status da Matrícula</Label>
          <StyledSelect
            value={selectedStatusMatricula}
            onChange={handleStatusMatricula}
            options={optionsStatusMatricula}
            placeholder={'Selecione uma opção'}
          />
          
          <Label>Código da matrícula</Label>
          <Input  type="text" />
          <Label>Possui déficit de reserva legal?</Label>
          <Input  type="text" />
          <Label>Possui dívida federal pelo não pagamento de tributos?</Label>
          <Input  type="text" />
        </Column>
        <Column>
          <Label>Cadastro realizado em</Label>         
          <Span>23-09-2022</Span>
          <p />

          <Label>Status do CAR</Label>
          <StyledSelect
            value={selectedCar}
            onChange={handleOptionsCar}
            options={optionsCar}
            placeholder={'Selecione uma opção'}
          />
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