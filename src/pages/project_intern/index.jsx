import { useDispatch, useSelector } from "react-redux";
import { Container, InnerContainer, Column, Label, Input, TextArea, Span, Button, ButtonContainer, ButtonLink, StyledSelect, StyledSelectForUser, DownloadButton } from './styles'
import { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { SideContainer } from './styles'
import Profile from '../../components/profile'
import Projects from "../../components/projects";
import Users from "../../components/users"
import Settings from "../../components/settings";
import StockChart from "../../components/dashboard";
import Sidebar from "../../components/sidebar";
import { motion } from 'framer-motion';
import { returnYesorNoforBoolean, returnUserName } from "../../constants/functions";
import axios from "axios";
import { currentUrl } from '../../constants/global';


const ProjectIntern = () => {

  const app_status = useSelector((state) => state.app_status.status);
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const project = location.state.project;
  const users = useSelector((state) => state.app_data.users);

  const [boolean, setBoolean] = useState(false);

  const handleInputChange = () => {
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/welcome')
  };

  const handleRegister = () => {
    navigate('/edit_intern_project', { state: { project }});
  };

  const downloadPDF = (fieldName) => {

      //const token = sessionStorage.getItem('Authorization');
      const downloadUrl = `http://${currentUrl}:8000/api/project/${project.id}/download/${fieldName}/`;
      window.open(downloadUrl, '_blank');
    };

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
          >
      <Container>
        <h2>{project.title || '-'}</h2>
        <InnerContainer>
          <Column> 
            <Label>Proprietário da área:</Label>
            <Span>{returnUserName(project.owner, users)}</Span>
            <Label>A propriedade está sob domínio de uma pessoa física ou jurídica?</Label>
            <Span>{project.physical_or_legal_entity}</Span>        
            <Label>CNPJ ou CPF do proprietário</Label>
            <Span>{project.cnpj}</Span>
            <Label>Qual o endereço da propriedade?</Label>
            <Span>{project.address}</Span>            
            <Label>Status da Matrícula</Label>
            <Span>{project.matricula_status}</Span>                        
            <Label>Possui déficit de reserva legal?</Label>
            <Span>{returnYesorNoforBoolean(project.legal_reserve_deficit)}</Span>
            <Label>Possui dívida federal pelo não pagamento de tributos?</Label>
            <Span>{returnYesorNoforBoolean(project.has_federal_debt)}</Span>
          </Column>
          <Column>
            <Label>Área total da propriedade (ha)?</Label>
            <Span>{project.total_area}</Span>
            <Label>Área total da reserva legal (ha)?</Label>
            <Span>{project.legal_reserve_area}</Span>  
            <Label>Status do CAR</Label>
            <Span>{project.status_car}</Span>
            <Label>Código SICAR (CAR)</Label>
            <Span>{project.sicar_code}</Span>
            <Label>Status do georreferenciamento no SIGEF</Label>
            <Span>{project.georeferencing_status}</Span>
            <Label>Situação da reserva legal da propriedade:</Label>
            <Span>{project.reserve_legal_status}</Span>
            <Label>Possui unidade de conservação no imóvel?</Label>
            <Span>{project.conservation_unit}</Span>
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
          <Button onClick={() => handleClick()}>Voltar</Button>
          <Button onClick={() => handleRegister()}>Editar Informações</Button>
        </ButtonContainer>
      </Container>
    </motion.div>
  )
};

export default ProjectIntern;