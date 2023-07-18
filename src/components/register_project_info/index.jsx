import { Container, InnerContainer, Column, Label, Input, TextArea, Span, Button, ButtonContainer, ButtonLink, StyledSelect, StyledSelectForUser } from './styles'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { appStatus } from '../../store/modules/app_status/actions';
import { storeProjectId, storeOwnerId } from '../../store/modules/app_data/actions';
import { motion } from 'framer-motion';
import axios from 'axios';
import { currentUrl } from '../../constants/global';
import Swal from 'sweetalert2';
import { regularMaskforNumbers, extractNumbers } from '../../constants/functions';
import { currentUser } from '../../constants/global';
import { addProjectToProjects } from '../../store/modules/app_data/actions';
import { convertPhone } from '../../constants/functions';

const RegisterProjectInfo = () => {

  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const [totalArea, setTotalArea] = useState('');
  const [totalReserveArea, setTotalReserveArea] = useState('');
  const [address, setAddress] = useState('');
  const [ownerActionsToPreserveForest, setOwnerActionsToPreserveForest] = useState('');
  const currentUser = useSelector((state) => state.user.currentUser);
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState(currentUser.id);

  const handleUserSelect = (event) => {
    setOwner(event.target.value);
  };

  // validações

  const [titleError, setTitleError] = useState('');
  const [totalAreaError, setTotalAreaError] = useState('');
  const [legalReserveAreaError, setLegalReserveAreaError] = useState('');
  const [statusCARError, setStatusCARError] = useState('');
  const [ownerError, setOwnerError] = useState('');
  const [selectedCarError, setSelectedCarError] = useState('');
  const [thereIsNoCar, setThereIsNoCar] = useState(false);
  
  // SICAR
  const [selectedCar, setSelectedCar] = useState('');

  const optionsCar = [
    { value: "Ativo", label: "Ativo" },
    { value: "Pendente", label: "Pendente" },
    { value: "Cancelado", label: "Cancelado" },
    { value: "Não possui CAR", label: "Não possui CAR" },
  ];

  const handleOptionsCar = (event) => {
    const selectedValue = event.target.value;
    
    setSelectedCar(selectedValue);
    if (selectedValue === "Não possui CAR") {
      setThereIsNoCar(true);
      setSicarCode('Não possui');
    } else {
      setThereIsNoCar(false);
    }
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

  // Unidade de Conservação (UC) do imóvel

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
    if (boolean) {
      setMask("99.999.999/9999-99");
    } else {
      setMask("999.999.999-99");
    }
  };

  // Rotas
  const dispatch = useDispatch();

  const handleComeBack = () => {
    dispatch(appStatus('Projetos'));
    navigate('/welcome');
  };

    // preparar objeto para ser enviado para a requisição

    const preparedObject = {
      "title": title,
      "owner": owner,
      "total_area":  extractNumbers(totalArea),
      "legal_reserve_area": extractNumbers(totalReserveArea),
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

  useEffect(() => {
    dispatch(storeOwnerId(owner));
    if (currentUser.user_type === 'ADM') {
      const fetchUsers = async () => {
        try {
          const token = sessionStorage.getItem('Authorization');
          const response = await axios.get(`${currentUrl}/api/users/`, {
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
    } else {
      setOwner(currentUser.id);
    }
  }, [owner, preparedObject]);


  // REGISTRAR PROJETO
  const handleRegister = () => {

    if (totalArea) {
      setTotalAreaError('');
    }

    if (totalReserveArea) {
      setStatusCARError('');
    }

    if (sicarCode) {
      setStatusCARError('');
    }

    if (owner) {
      setOwnerError('');
    }

    if (title) {
      setTitleError('');
    }

    if (totalReserveArea) {
      setLegalReserveAreaError('');
    }

    if (selectedCar) {
      setSelectedCarError('');
    }

    if (!totalArea || !totalReserveArea || !sicarCode || !owner || !title || !selectedCar)  {

      if (!title) {
        setTitleError('Esse campo é necessário');
      }

      if (!totalArea) {
        setTotalAreaError('Esse campo é necessário');
      }
      if (!totalReserveArea) {
        setLegalReserveAreaError('Esse campo é necessário');
      }
      if (!sicarCode) {
        setStatusCARError('Esse campo é necessário');
      }
      if (!owner) {
        setOwnerError('Esse campo é necessário');
      }

      if (!selectedCar) {
        setSelectedCarError('Escolha uma opção para continuar');
      }
      return;
    };

    const token = sessionStorage.getItem('Authorization');
    const headers = { Authorization: `Bearer ${token}`, };
    
    axios.post(`${currentUrl}/api/projects/`, preparedObject, { headers })
      .then(response => {
        const projectId = response.data.id;
        Swal.fire({
          title: 'Sucesso!',
          text: 'Agora continue realizando o upload dos seguintes documentos',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        dispatch(storeProjectId(projectId));
        dispatch(appStatus('register_land_upload_files'));
        //adicionada linha, mas não testada
      })
      .catch(error => {
        console.error('error', error);
        Swal.fire({
          title: 'Erro!',
          text: 'Algo deu errado ao tentar processar sua requisição.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return
      });
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
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Label style={{fontSize : '16px'}} >Qual o nome (fantasia) da sua terra, fazenda ou reserva?</Label>
          <Input
              type="text"
              placeholder="Ex: Fazenda Santa Júlia"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{width: '88%', fontSize: '18px'}}
            />
            {titleError && <div style={{ color: 'red', marginBottom: '16px', marginTop: '-8px', fontStyle: 'italic', fontSize: '12px' }}>{titleError}</div>}

        </div>
        <InnerContainer>
          <Column> 
            <Label>Proprietário da área:</Label>

            <StyledSelect value={owner} onChange={handleUserSelect}>
              {users.length > 0 ? (
                users.map(user => (
                  <option key={user.id} value={user.id}>{user.full_name} - {user.email}, {user.city}, {user.state} - {convertPhone(user.phone)}</option>
                ))
              ) : (
                <option key={currentUser.id} value={currentUser.id}>{currentUser.full_name}</option>
              )}
            </StyledSelect>

            {ownerError && <div style={{ color: 'red', marginBottom: '16px', marginTop: '-8px', fontStyle: 'italic', fontSize: '12px' }}>{ownerError}</div>}
            
            <Label>A propriedade está sob domínio de uma pessoa física ou jurídica?</Label>
            <StyledSelect
              onChange={handlePessoaFisicaOuJuridica}
              options={optionsPessoaJuridicaOuFisica}
              placeholder={'Selecione uma opção'}
              defaultValue={""}
            >
            <option disabled value="">Selecione uma opção</option>
            {optionsPessoaJuridicaOuFisica.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
            </StyledSelect>

            <Label>{boolean ? 'CPF' : 'CNPJ'} do proprietário {<ButtonLink onClick={() => handleInputChange(setBoolean(!boolean))} >{boolean ? 'Alternar para CNPJ' : 'Alternar para CPF'}</ButtonLink>}</Label>
            <Input type="text" 
              placeholder={boolean ? 'Ex: 137.258.369-46' : 'Ex: 12.345.678/0001-28'}
              mask={mask}
              maskplaceholder="CPF/CNPJ"
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
              placeholder={'Selecione uma opção'}
              defaultValue={""}
            >
            <option disabled value="">Selecione uma opção</option>
            {optionsMatriculaStatus.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
            </StyledSelect>            
            <Label>Possui déficit de reserva legal?</Label>
            <StyledSelect
              onChange={handlePossuiDeficit}
              placeholder={'Selecione uma opção'}
              defaultValue={""}
            >
              <option disabled value="">Selecione uma opção</option>
                {optionsPossuiDeficit.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
              ))}    
            </StyledSelect>
            <Label>Possui dívida federal pelo não pagamento de tributos?</Label>
            <StyledSelect
              onChange={handlePossuiDivida}
              placeholder={'Selecione uma opção'}
              defaultValue={""}
              >
              <option disabled value="">Selecione uma opção</option>
                {optionsPossuiDivida.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
              ))}      
              </StyledSelect>
          </Column>
          <Column>
            <Label>Área total da propriedade (ha)?</Label>
            <Input
                type="text"
                placeholder="Em hectares (ha)"
                value={totalArea}
                onChange={(event) => regularMaskforNumbers(event, setTotalArea)}
                maskplaceholder={null}
              />
            {totalAreaError && <div style={{ color: 'red', marginBottom: '16px', marginTop: '-8px', fontStyle: 'italic', fontSize: '12px' }}>{totalAreaError}</div>}
            <Label>Área total da reserva legal (ha)?</Label>
              <Input
                type="text"
                placeholder="Em hectares (ha)"
                value={totalReserveArea}
                onChange={(event) => regularMaskforNumbers(event, setTotalReserveArea)}
              />
            {legalReserveAreaError && <div style={{ color: 'red', marginBottom: '16px', marginTop: '-8px', fontStyle: 'italic', fontSize: '12px' }}>{legalReserveAreaError}</div>}            
            <Label>Status do CAR</Label>
            <StyledSelect
              onChange={handleOptionsCar}
              defaultValue={""}
              placeholder={'Selecione uma opção'}
            >
            <option disabled value="">Selecione uma opção</option>
            {optionsCar.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
            </StyledSelect>
            {selectedCarError && <div style={{ color: 'red', marginBottom: '16px', marginTop: '-8px', fontStyle: 'italic', fontSize: '12px' }}>{selectedCarError}</div>}
            <Label>Código SICAR (CAR)</Label>
            <Input type="text" 
              mask={"**-*******-****.****.****.****.****.****.****.****"}
              maskplaceholder="MS-5003207-785F.26BA.34BA.49FB.8327.7FAB.C58C.E4C2"
              alwaysShowMask={false}
              placeholder="Ex: MS-5003207-785F.26BA.34BA.49FB.8327.7FAB.C58C.E4C2"
              onChange={(e) => setSicarCode(e.target.value)}
              disabled={thereIsNoCar}
            >
            </Input>
            {statusCARError && <div style={{ color: 'red', marginBottom: '16px', marginTop: '-8px', fontStyle: 'italic', fontSize: '12px' }}>{statusCARError}</div>}
            <Label>Status do georreferenciamento no SIGEF</Label>
            <StyledSelect
              onChange={handleGeorreferenciamentoStatus}
              defaultValue={""}
              placeholder={'Selecione uma opção'}
            >
            <option disabled value="">Selecione uma opção</option>
            {optionsGerorreferenciamentoStatus.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
            </StyledSelect>
            <Label>Situação da reserva legal da propriedade:</Label>
            <StyledSelect
              onChange={handleReservaSituation}
              placeholder={'Selecione uma opção'}
              defaultValue={""}
            >
            <option disabled value="">Selecione uma opção</option>
            {optionsReservaSituation.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
            </StyledSelect>
            <Label>Possui Unidade de Conservação (UC) no imóvel?</Label>
            <StyledSelect
              onChange={handleUnidadeConservacao}
              placeholder={'Selecione uma opção'}
              defaultValue={""}
            >
            <option disabled value="">Selecione uma opção</option>
            {optionsUnidadeConservacao.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}  
            </StyledSelect>
          </Column>
        </InnerContainer>
        <Column style={{ marginTop: '36px', fontStyle: 'italic', fontSize: '12px'}}>
            <Label style={{fontSize : '16px'}}>Existem ações tomadas pelo proprietário para garantir a preservação das florestas existentes no imóvel?</Label>
            <Span>Descrever abaixo quais são essas ações e a data em que foram realizadas.</Span>
            <Span>Estas ações podem ser in loco, tal como cercamento ou aceiro, ou pode ser uma ação legal, tal como averbação da reserva legal na matrícula ou criação de uma RPPN.</Span>
              <p />
            <TextArea  type="text" value={ownerActionsToPreserveForest} onChange={(e) => setOwnerActionsToPreserveForest(e.target.value)}/>
            
        </Column>
        <ButtonContainer>
          <Button onClick={() => handleComeBack()}>Voltar</Button>
          <Button onClick={() => handleRegister()}>Confirmar</Button>
        </ButtonContainer>
      </Container>
    </motion.div>
  )
};

export default RegisterProjectInfo;


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