import { useDispatch, useSelector } from "react-redux";
import { Container, InnerContainer, Column, Label, Button, ButtonContainer, Span, DownloadButton } from './styles'
import { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";

import { motion } from 'framer-motion';
import { returnYesorNoforBoolean, returnUserName } from "../../constants/functions";
import axios from "axios";
import { currentUrl } from '../../constants/global';
import Swal from "sweetalert2";


const ProjectIntern = () => {

  const user = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const project = location.state.project;
  const users = useSelector((state) => state.app_data.users);
  const projectOwner = users.find(user => user.id === project.owner);

  const navigate = useNavigate();

  const handleComeBack = () => {
    navigate('/welcome')
  };

  const handleRegister = () => {
    navigate('/edit_intern_project', { state: { project }});
  };

  const downloadPDF = (fieldName) => {

      //const token = sessionStorage.getItem('Authorization');
      const downloadUrl = `${currentUrl}/api/project/${project.id}/download/${fieldName}/`;
      window.open(downloadUrl, '_blank');
    };

  const startProject = () => {
    const token = sessionStorage.getItem('Authorization');
    const headers = { Authorization: `Bearer ${token}`, };
    
    axios
    .put(`${currentUrl}/api/projects/${project.id}/update/`, { status: 'started', owner: project.owner }, { headers } )
    .then((response) => {
      Swal.fire({
        title: 'Sucesso!',
        text: 'O projeto foi inicializado com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/analysis_and_development');
    })
    .catch((error) => {
      // Handle the error if any
    });
  };

  const addressParts = [];

if (projectOwner.street) {
  addressParts.push('Rua ' + projectOwner.street);
}

if (projectOwner.number) {
  addressParts.push(projectOwner.number);
}

if (projectOwner.complement) {
  addressParts.push('Complemento ' + projectOwner.complement);
}

if (projectOwner.district) {
  addressParts.push(projectOwner.district);
}

if (projectOwner.city) {
  addressParts.push(projectOwner.city);
}

if (projectOwner.state) {
  addressParts.push(projectOwner.state);
}

if (projectOwner.cep) {
  addressParts.push('CEP: ' + projectOwner.cep);
}

const addressString = addressParts.join(', ');

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
          >
      <Container>
      {user.user_type === "ADM" && 
          <>
            <h2>{projectOwner.full_name}</h2>

            <InnerContainer>
              <Column> 
                <Label>Contato</Label>
                <Span>Telefone: {projectOwner.phone}</Span>
                <Span>Email: {projectOwner.email || '-'}</Span>
                <Label>Endereço</Label>
                <Span>{addressString}</Span>
                <Label>Informações de Banco</Label>
                <Span>Não possui</Span>
              </Column>
            </InnerContainer>
          </>
        }          
        <h2>{project.title || '-'}</h2>
        <InnerContainer>
          <Column> 
            <Label>Proprietário da área:</Label>
            <Span>{returnUserName(project.owner, users) || '-'}</Span>
            <Label>A propriedade está sob domínio de uma pessoa física ou jurídica?</Label>
            <Span>{project.physical_or_legal_entity || '-'}</Span>        
            <Label>CNPJ ou CPF do proprietário</Label>
            <Span>{project.cnpj || '-'}</Span>
            <Label>Qual o endereço da propriedade?</Label>
            <Span>{project.address || '-'}</Span>            
            <Label>Status da Matrícula</Label>
            <Span>{project.matricula_status || '-'}</Span>                        
            <Label>Possui déficit de reserva legal?</Label>
            <Span>{returnYesorNoforBoolean(project.legal_reserve_deficit) || '-'}</Span>
            <Label>Possui dívida federal pelo não pagamento de tributos?</Label>
            <Span>{returnYesorNoforBoolean(project.has_federal_debt) || '-'}</Span>
          </Column>
          <Column>
            <Label>Área total da propriedade (ha)?</Label>
            <Span>{project.total_area || '-'}</Span>
            <Label>Área total da reserva legal (ha)?</Label>
            <Span>{project.legal_reserve_area || '-'}</Span>  
            <Label>Status do CAR</Label>
            <Span>{project.status_car || '-'}</Span>
            <Label>Código SICAR (CAR)</Label>
            <Span>{project.sicar_code || '-'}</Span>
            <Label>Status do georreferenciamento no SIGEF</Label>
            <Span>{project.georeferencing_status || '-'}</Span>
            <Label>Situação da reserva legal da propriedade:</Label>
            <Span>{project.reserve_legal_status || '-'}</Span>
            <Label>Possui Unidade de Conservação (UC) no imóvel?</Label>
            <Span>{project.conservation_unit || '-'}</Span>
          </Column>
        </InnerContainer>
        <Column style={{ marginTop: '36px'}}>
            <Label>Existem ações tomadas pelo proprietário para garantir a preservação das florestas existentes no imóvel?</Label>
            <Span>{project.owner_actions_to_preserve_forest}</Span>
            <p />

        <ButtonContainer>
          {project.pdf_matricula_certificate && <DownloadButton onClick={() => downloadPDF('pdf_matricula_certificate')}>Certificado de Matrícula</DownloadButton>}
          {project.pdf_car && <DownloadButton onClick={() => downloadPDF('pdf_car')}>PDF CAR</DownloadButton>}
          {project.pdf_ccir && <DownloadButton onClick={() => downloadPDF('pdf_ccir')}>PDF CCIR</DownloadButton>}
          {project.property_polygon && <DownloadButton onClick={() => downloadPDF('property_polygon')}>Polígono da Propridade</DownloadButton>}
          {project.pdf_federal_debt_certificate && <DownloadButton onClick={() => downloadPDF('pdf_federal_debt_certificate')}>Certificado Dívida Federal</DownloadButton>}
        </ButtonContainer>          
        
        </Column>
        <ButtonContainer>
          <Button onClick={() => handleComeBack()}>Voltar</Button>
          <Button onClick={() => handleRegister()}>Editar Informações</Button>
        </ButtonContainer>
        {user.user_type === "ADM" && 
          <>
            <h2>Engenharia Ambiental</h2>

            <ButtonContainer>
              <Button onClick={() => startProject()}>Inicializar Processo</Button>
            </ButtonContainer>
            <InnerContainer>

            </InnerContainer>
          </>
        }          
      </Container>
    </motion.div>
  )
};

export default ProjectIntern;