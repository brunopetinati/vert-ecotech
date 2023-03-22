import { Container, InnerContainer, Column, Label, Input, TextArea, Span, Button, ButtonContainer, ButtonLink, StyledSelect, StyledSelectForUser } from './styles'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { appStatus } from '../../store/modules/app_status/actions';
import { motion } from 'framer-motion';
import axios from 'axios';

const RegisterProjectStep2 = () => {


  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem('Authorization');
        const response = await axios.get('http://localhost:8000/api/users/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const navigate = useNavigate();

  const [totalArea, setTotalArea] = useState('');
  const [totalReserveArea, setTotalReserveArea] = useState('');
  const [address, setAddress] = useState('');
  const [owner, setOwner] = useState('');

  const handleUserSelect = (event) => {
    setOwner(event.target.value);
  };
  
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

  // Código SICAR
  const [sicarCode, setSicarCode] = useState(''); 

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
    { value: "Sem vegetação / em regeneração natural", label: "Sem vegetação / em regeneração natural" },
    { value: "Em regeneração a partir de reflorestamento", label: "Em regeneração a partir de reflorestamento" },
    { value: "Completamente florestada", label: "Completamente florestada" }
  ];

  const handleReservaSituation = (selectedReservaSituation) => {
    setSelectedReservaSituation(selectedReservaSituation);
  };

  // Unidade de conservação do imóvel

  const [selectedUnidadeConservacao, setSelectedUnidadeConservacao] = useState('');

  const optionsUnidadeConservacao = [
    { value: "Privada", label: "Privada" },
    { value: "Pública", label: "Pública" },
    { value: "Não possui", label: "Não possui" }
  ];

  const handleUnidadeConservacao = (selectedUnidadeConservacao) => {
    setSelectedUnidadeConservacao(selectedUnidadeConservacao);
  };

  // Dívida Federal

  const [selectedPossuiDivida, setSelectedPossuiDivida] = useState('');

  const optionsPossuiDivida = [
    { value: true, label: "Sim" },
    { value: false, label: "Não" }
  ];

  const handlePossuiDivida = (selectedPossuiDivida) => {
    setSelectedPossuiDivida(selectedPossuiDivida);
  };
  
  // Possui déficit de reserva legal?
  const [selectedPossuiDeficit, setSelectedPossuiDeficit] = useState('');

  const optionsPossuiDeficit = [
    { value: true, label: "Sim" },
    { value: false, label: "Não" }
  ];

  const handlePossuiDeficit = (selectedPossuiDeficit) => {
    setSelectedPossuiDeficit(selectedPossuiDeficit);
  };

  // Máscara CPF ou CNPJ
  const [CNPJ, setCNPJ] = useState('');
  const [mask, setMask] = useState("99.999.999/9999-99");
  const [boolean, setBoolean] = useState(false);

  const handleInputChange = () => {
    if (!boolean) {
      setMask("99.999.999/9999-99");
    } else {
      setMask("999.999.999-99");
    }
  };

  // Rotas
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(appStatus('Projetos'));
    navigate('/welcome');
  };

  const handleRegister = () => {
    dispatch(appStatus('register_land_upload_files'))
  };
  
  const [ownerActionsToPreserveForest, setOwnerActionsToPreserveForest] = useState('');

  // preparar objeto para ser enviado para a requisição

  const preparedObject = {
    "owner": owner,
    "total_area":  totalArea,
    "legal_reserve_area": totalReserveArea,
    "address": address,
    "documentation_up_to_date": true,
    "status_car": selectedCar,
    "sicar_code": sicarCode,
    "matricula_status": selectedMatriculaStatus,
    "georeferencing_status": selectedGeorreferenciamentoStatus,
    "reserve_legal_status":  selectedReservaSituation,
    "physical_or_legal_entity": "legal",
    "cnpj": CNPJ,
    "conservation_unit": selectedUnidadeConservacao,
    "owner_actions_to_preserve_forest": ownerActionsToPreserveForest
  };

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
          >
      <Container>
        <h2>Informações Cadastrais</h2>
        <InnerContainer>
          <Column> 
            <Label>Proprietário da área:</Label>
            {/* <Input  type="text"  value={owner} onChange={setOwner}/> */}

            <StyledSelectForUser value={owner} onChange={handleUserSelect} >
              <option value="">Selecione o proprietário</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.full_name}</option>
              ))}
            </StyledSelectForUser>

            <Label>{boolean ? 'CPF' : 'CNPJ'} do proprietário {<ButtonLink onClick={() => handleInputChange(setBoolean(!boolean))} >{boolean ? 'Alternar para CNPJ' : 'Alternar para CPF'}</ButtonLink>}</Label>
            <Input type="text" 
              placeholder={boolean ? 'Ex: 137.258.369-46' : 'Ex: 12.345.678/0001-28'}
              mask={mask}
              maskPlaceholder="CPF/CNPJ"
              alwaysShowMask={false}
              value={CNPJ}
              onChange={(e) => setCNPJ(e.target.value)}
            />
            <Label>Qual o endereço da propriedade?</Label>
            <Input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            />        
            <Label>Status da Matrícula</Label>
            <StyledSelect
              value={selectedMatriculaStatus}
              onChange={handleMatriculaStatus}
              options={optionsMatriculaStatus}
              placeholder={'Selecione uma opção'}
            />
            
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
            <Label>Área total da propriedade (ha)?</Label>
            <Input
                type="text"
                placeholder="Em hectares(ha)"
                value={totalArea}
                onChange={(event) => setTotalArea(event.target.value)}
              />
            <Label>Área total da reserva legal (ha)?</Label>
              <Input
                type="text"
                placeholder="Em hectares(ha)"
                value={totalReserveArea}
                onChange={(event) => setTotalReserveArea(event.target.value)}
              />
            <Label>Status do CAR</Label>
            <StyledSelect
              value={selectedCar}
              onChange={handleOptionsCar}
              options={optionsCar}
              placeholder={'Selecione uma opção'}
            />
            <Label>Código SICAR(CAR)</Label>
            <Input type="text" 
              mask={"**-*******-****.****.****.****.****.****.****.****"}
              maskPlaceholder="MS-5003207-785F.26BA.34BA.49FB.8327.7FAB.C58C.E4C2"
              alwaysShowMask={false}
              placeholder="Ex: MS-5003207-785F.26BA.34BA.49FB.8327.7FAB.C58C.E4C2"
            >  
            </Input>
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
        <Column style={{ marginTop: '36px'}}>
            <Label>Existem ações tomadas pelo proprietário para garantir a preservação das florestas existentes no imóvel?</Label>
            <Span>Descrever abaixo quais são essas ações e a data em que foram realizadas.</Span>
            <Span>Estas ações podem ser in loco, tal como cercamento ou aceiro, ou pode ser uma ação legal, tal como averbação da reserva legal na matrícula ou criação de uma RPPN.</Span>
              <p />
            <TextArea  type="text" value={ownerActionsToPreserveForest} onChange={setOwnerActionsToPreserveForest}/>
        </Column>
        <ButtonContainer>
          <Button onClick={() => handleClick()}>Voltar</Button>
          <Button onClick={() => handleRegister()}>Confirmar</Button>
        </ButtonContainer>
      </Container>
    </motion.div>
  )
};

export default RegisterProjectStep2;


/* 
 owner
 totalArea
 totalReserveArea
 CNPJ
 address
 selectedCar
 selectedMatriculaStatus
 codeSicar
 selectedGeorreferenciamentoStatus
 selectedReservaSituation
 selectedUnidadeConservacao
 selectedPossuiDivida
 selectedPossuiDeficit
 ownerActionsToPreserveForest 
 */