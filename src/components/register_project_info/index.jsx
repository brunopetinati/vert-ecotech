import { Container, InnerContainer, Column, Label, Input, TextArea, Span, Button, ButtonContainer, ButtonLink, StyledSelect, StyledSelectForUser } from './styles'
import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { appStatus } from '../../store/modules/app_status/actions';
import { storeProjectId, storeOwnerId } from '../../store/modules/app_data/actions';
import { motion } from 'framer-motion';
import axios from 'axios';
import { currentUrl } from '../../constants/global';

const RegisterProjectStep2 = () => {

  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const [totalArea, setTotalArea] = useState('');
  const [totalReserveArea, setTotalReserveArea] = useState('');
  const [address, setAddress] = useState('');
  const [owner, setOwner] = useState('');

  const handleUserSelect = (event) => {
    setOwner(event.target.value);
    dispatch(storeOwnerId(event.target.value));
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
    setSelectedCar(selectedCar.value);
  };

  // Status Matrícula
  const [selectedMatriculaStatus, setSelectedMatriculaStatus] = useState('')

  const optionsMatriculaStatus = [
    { value: "Vigente", label: "Vigente" },
    { value: "Em atualização", label: "Em atualização" },
    { value: "Cancelada", label: "Cancelada" }
  ];

  const handleMatriculaStatus = (selectedMatriculaStatus) => {
    setSelectedMatriculaStatus(selectedMatriculaStatus.value);
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
    setSelectedGeorreferenciamentoStatus(selectedGeorreferenciamentoStatus.value);
  };


  // Situação da reserva legal da propriedade

  const [selectedReservaSituation, setSelectedReservaSituation] = useState('')

  const optionsReservaSituation = [
    { value: "Sem vegetação / em regeneração natural", label: "Sem vegetação / em regeneração natural" },
    { value: "Em regeneração a partir de reflorestamento", label: "Em regeneração a partir de reflorestamento" },
    { value: "Completamente florestada", label: "Completamente florestada" }
  ];

  const handleReservaSituation = (selectedReservaSituation) => {
    setSelectedReservaSituation(selectedReservaSituation.value);
  };

  // Unidade de conservação do imóvel

  const [selectedUnidadeConservacao, setSelectedUnidadeConservacao] = useState('');

  const optionsUnidadeConservacao = [
    { value: "Privada", label: "Privada" },
    { value: "Pública", label: "Pública" },
    { value: "Não possui", label: "Não possui" }
  ];

  const handleUnidadeConservacao = (selectedUnidadeConservacao) => {
    setSelectedUnidadeConservacao(selectedUnidadeConservacao.value);
  };

  // Dívida Federal

  const [selectedPossuiDivida, setSelectedPossuiDivida] = useState('');

  const optionsPossuiDivida = [
    { value: true, label: "Sim" },
    { value: false, label: "Não" }
  ];

  const handlePossuiDivida = (selectedPossuiDivida) => {
    setSelectedPossuiDivida(selectedPossuiDivida.value);
  };
  
  // Possui déficit de reserva legal?
  const [selectedPossuiDeficit, setSelectedPossuiDeficit] = useState('');

  const optionsPossuiDeficit = [
    { value: true, label: "Sim" },
    { value: false, label: "Não" }
  ];

  const handlePossuiDeficit = (selectedPossuiDeficit) => {
    setSelectedPossuiDeficit(selectedPossuiDeficit.value);
  };

  // A propriedade está sob domínio de uma pessoa física ou jurídica?

  const [selectedPessoaJuridicaOuFisica, setSelectedPessoaJuridicaOuFisica] = useState('');

  const optionsPessoaJuridicaOuFisica = [
    { value : 'Física', label: 'Física' },
    { value : 'Jurídica', label: 'Jurídica' }
  ]

  const handlePessoaFisicaOuJuridica = (selectedPessoaJuridicaOuFisica) => {
    setSelectedPessoaJuridicaOuFisica(selectedPessoaJuridicaOuFisica.value)
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem('Authorization');
        const response = await axios.get(`http://${currentUrl }:8000/api/users/`, {
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


  // REGISTRAR PROJETO
  const handleRegister = () => {

    const token = sessionStorage.getItem('Authorization');
    const headers = { Authorization: `Bearer ${token}`, };
    
    axios.post(`http://${currentUrl}:8000/api/projects/`, preparedObject, { headers })
      .then(response => {
        const projectId = response.data.id;
        dispatch(storeProjectId(projectId));
        dispatch(appStatus('register_land_upload_files'));
      })
      .catch(error => {
        alert('Algo de errado aconteceu. Verifique o procedimento e tente novamente.');
        console.error(error);
        return
      });
  };
  
  
  const [ownerActionsToPreserveForest, setOwnerActionsToPreserveForest] = useState('');

  // preparar objeto para ser enviado para a requisição

  const preparedObject = {
    "owner": owner,
    "total_area":  totalArea,
    "legal_reserve_area": totalReserveArea,
    "address": address,
    "status_car": selectedCar,
    "sicar_code": sicarCode,
    "matricula_status": selectedMatriculaStatus,
    "georeferencing_status": selectedGeorreferenciamentoStatus,
    "reserve_legal_status":  selectedReservaSituation,
    "physical_or_legal_entity": "legal",
    "cnpj": CNPJ,
    "conservation_unit": selectedUnidadeConservacao,
    "owner_actions_to_preserve_forest": ownerActionsToPreserveForest,
    "legal_reserve_deficit": selectedPossuiDeficit,
	  "has_federal_debt": selectedPossuiDivida,
    "physical_or_legal_entity": selectedPessoaJuridicaOuFisica
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

            <StyledSelectForUser value={owner} onChange={handleUserSelect} >
              <option value="">Selecione o proprietário</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.full_name}</option>
              ))}
            </StyledSelectForUser>

            <Label>A propriedade está sob domínio de uma pessoa física ou jurídica?</Label>
            <StyledSelect
              onChange={handlePessoaFisicaOuJuridica}
              options={optionsPessoaJuridicaOuFisica}
              placeholder={'Selecione uma opção'}
            />

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
              onChange={handleMatriculaStatus}
              options={optionsMatriculaStatus}
              placeholder={'Selecione uma opção'}
            />
            
            <Label>Possui déficit de reserva legal?</Label>
            <StyledSelect
              onChange={handlePossuiDeficit}
              options={optionsPossuiDeficit}
              placeholder={'Selecione uma opção'}
            />
            <Label>Possui dívida federal pelo não pagamento de tributos?</Label>
            <StyledSelect
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
                maskPlaceholder={null}
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
              onChange={(e) => setSicarCode(e.target.value)}
            >  
            </Input>
            <Label>Status do georreferenciamento no SIGEF</Label>
            <StyledSelect
              onChange={handleGeorreferenciamentoStatus}
              options={optionsGerorreferenciamentoStatus}
              placeholder={'Selecione uma opção'}
            />
            <Label>Situação da reserva legal da propriedade:</Label>
            <StyledSelect
              onChange={handleReservaSituation}
              options={optionsReservaSituation}
              placeholder={'Selecione uma opção'}
            />
            <Label>Possui unidade de conservação no imóvel?</Label>
            <StyledSelect
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
            <TextArea  type="text" value={ownerActionsToPreserveForest} onChange={(e) => setOwnerActionsToPreserveForest(e.target.value)}/>
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