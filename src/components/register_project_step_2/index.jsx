import { Container, InnerContainer, Column, Label, Input, TextArea, Span, Button, ButtonContainer, StyledSelect } from './styles'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { appStatus } from '../../store/modules/app_status/actions';


const RegisterProjectStep2 = () => {


  // SICAR
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

  // Status Matrícula
  const [selectedMatriculaStatus, setSelectedMatriculaStatus] = useState('')

  const optionsMatriculaStatus = [
    { value: "Vigente", label: "Vigente" },
    { value: "Em atualização", label: "Em atualização" },
    { value: "Cancelada", label: "Cancelada" }
  ];

  const handleMatriculaStatus = (selectedMatriculaStatus) => {
    setSelectedMatriculaStatus(selectedMatriculaStatus);
  };


  // Georreferenciamento
  const [selectedGeorreferenciamentoStatus, setSelectedGeorreferenciamentoStatus] = useState('')

  const optionsGerorreferenciamentoStatus = [
    { value: "Atualizado", label: "Atualizado" },
    { value: "Em atualização", label: "Em atualização" },
    { value: "Pendente", label: "Pendente" },
    { value: "Não aplicável", label: "Não aplicável" }
  ];

  const handleGeorreferenciamentoStatus = (selectedGeorreferenciamentoStatus) => {
    setSelectedGeorreferenciamentoStatus(selectedGeorreferenciamentoStatus);
  };


  // Situação da reserva legal da propriedade

  const [selectedReservaSituation, setSelectedReservaSituation] = useState('')

  const optionsReservaSituation = [
    { value: "Sem vegetação / em vegetação natural", label: "Sem vegetação / em vegetação natural" },
    { value: "Em regeneração a partir de reflorestamento", label: "Em regeneração a partir de reflorestamento" },
    { value: "Completamente florestada", label: "Completamente florestada" },
  ];

  const handleReservaSituation = (selectedReservaSituation) => {
    setSelectedReservaSituation(selectedReservaSituation);
  };

    // Unidade de conservação do imóvel

    const [selectedUnidadeConservacao, setSelectedUnidadeConservacao] = useState('')

    const optionsUnidadeConservacao = [
      { value: "Privada", label: "Privada" },
      { value: "Não possui", label: "Não possui" },
      { value: "Pública", label: "Pública" }
    ];
  
    const handleUnidadeConservacao = (selectedUnidadeConservacao) => {
      setSelectedUnidadeConservacao(selectedUnidadeConservacao);
    };

    // Dívida Federal

    const [selectedPossuiDivida, setSelectedPossuiDivida] = useState('')

    const optionsPossuiDivida = [
      { value: true, label: "Sim" },
      { value: false, label: "Não" }
    ];
  
    const handlePossuiDivida = (selectedPossuiDivida) => {
      setSelectedPossuiDivida(selectedPossuiDivida);
    };
    
    // Possui déficit de reserva legal?
    const [selectedPossuiDeficit, setSelectedPossuiDeficit] = useState('')

    const optionsPossuiDeficit = [
      { value: true, label: "Sim" },
      { value: false, label: "Não" }
    ];
  
    const handlePossuiDeficit = (selectedPossuiDeficit) => {
      setSelectedPossuiDeficit(selectedPossuiDeficit);
    };

  // Rotas
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
          <Label>CNPJ do proprietário (CPF em caso de pessoa física)</Label>
          <Input  type="text" placeholder='CNPJ ou CPF'/>
          <Label>Status da Matrícula</Label>
          <StyledSelect
            value={selectedMatriculaStatus}
            onChange={handleMatriculaStatus}
            options={optionsMatriculaStatus}
            placeholder={'Selecione uma opção'}
          />
          <Label>Código da matrícula</Label>
          <Input  type="text" placeholder='Ex: 30.137' />
          <Label>Possui déficit de reserva legal?</Label>
          <StyledSelect
            value={selectedPossuiDeficit}
            onChange={handlePossuiDeficit}
            options={optionsPossuiDeficit}
            placeholder={'Selecione uma opção'}
          />
          <Label>Possui dívida federal pelo não pagamento de tributos?</Label>
          <StyledSelect
            value={selectedPossuiDivida}
            onChange={handlePossuiDivida}
            options={optionsPossuiDivida}
            placeholder={'Selecione uma opção'}
          />
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
          <StyledSelect
            value={selectedGeorreferenciamentoStatus}
            onChange={handleGeorreferenciamentoStatus}
            options={optionsGerorreferenciamentoStatus}
            placeholder={'Selecione uma opção'}
          />
          <Label>Situação da reserva legal da propriedade:</Label>
          <StyledSelect
            value={selectedReservaSituation}
            onChange={handleReservaSituation}
            options={optionsReservaSituation}
            placeholder={'Selecione uma opção'}
          />
          <Label>Possui unidade de conservação no imóvel?</Label>
          <StyledSelect
            value={selectedUnidadeConservacao}
            onChange={handleUnidadeConservacao}
            options={optionsUnidadeConservacao}
            placeholder={'Selecione uma opção'}
          />
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