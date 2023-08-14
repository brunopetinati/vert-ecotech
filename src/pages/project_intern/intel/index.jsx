import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import {  useSelector } from "react-redux";
import { motion } from 'framer-motion';
import { Container, InnerContainer, Column, Label, Button, ButtonContainer, Span, DownloadButton } from '../styles';
import { returnYesorNoforBoolean, returnUserName, formatSICARCode } from "../../../constants/functions";
import { currentUrl } from '../../../constants/global';
import { convertPhone, transformNumbersToHectares, formatCPF, formatCEP } from "../../../constants/functions";
import PasswordModal from "../../../components/projects_t_consolidation/password_modal";

const Intel = ({user, project}) => {

  console.log('começando os calculos');

  const users = useSelector((state) => state.app_data.users);
  const projectOwner = users.find(user => user.id === project.owner);
  const [password, setPassword] = useState('');
  const currentUser = useSelector((state) => state.user.currentUser);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const downloadPDF = (fileField) => {

    const token = sessionStorage.getItem('Authorization');
    const headers = { Authorization: `Bearer ${token}` };

    if (currentUser.user_type === "ADM") {
      console.log('entrou aqui!')
      axios
      .post(`${currentUrl}/api/project/${project.id}/download/${fileField}/`, { password }, {
        headers,
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileField}.pdf`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Erro ao fazer download do arquivo. Estamos trabalhando para resolver o problema o mais breve possível.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
    } else {

    if (!password) {
      openPasswordModal();
      return;
    }

    axios
      .post(`${currentUrl}/api/project/${project.id}/download/${fileField}/`, { password }, {
        headers,
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileField}.pdf`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to download the file. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
    }
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
  addressParts.push('CEP: ' + formatCEP(projectOwner.cep));
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
            <h2 style={{marginTop: '-64px'}}>{projectOwner.full_name}</h2>

            <InnerContainer>
              <Column> 
                <Label>Contato</Label>
                <Span>Telefone: {convertPhone(projectOwner.phone)}</Span>
                <Span>Email: {projectOwner.email || '-'}</Span>
                <Label>Endereço</Label>
                <Span>{addressString}</Span>
                <Label>Informações de Banco</Label>
                <Span>Não possui</Span>
              </Column>
            </InnerContainer>
          </>
        }          
        <h2>{project.title === 'default' ? 'Sem Título' : project.title}</h2>
        <InnerContainer>
          <Column> 
            <Label>Proprietário da área:</Label>
            <Span>{returnUserName(project.owner, users) || '-'}</Span>
            <Label>A propriedade está sob domínio de uma pessoa física ou jurídica?</Label>
            <Span>{project.physical_or_legal_entity || '-'}</Span>        
            <Label>CNPJ ou CPF do proprietário</Label>
            <Span>{formatCPF(project.cnpj) || '-'}</Span>
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
            <Span>{transformNumbersToHectares(project.total_area) || '-'}</Span>
            <Label>Área total da reserva legal (ha)?</Label>
            <Span>{transformNumbersToHectares(project.legal_reserve_area) || '-'}</Span>  
            <Label>Status do CAR</Label>
            <Span>{project.status_car || '-'}</Span>
            <Label>Código SICAR (CAR)</Label>
            <Span>{formatSICARCode(project.sicar_code) || '-'}</Span>
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
        {isPasswordModalOpen && (
        <PasswordModal onConfirm={(password) => {
          setPassword(password);
          closePasswordModal();
        }} />
      )}
      </Container>
    </motion.div>
  )
};

export default Intel;