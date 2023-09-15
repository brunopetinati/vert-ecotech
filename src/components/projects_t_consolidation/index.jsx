import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion } from 'framer-motion';
import { currentUrl } from '../../constants/global';
import Swal from 'sweetalert2';
import { StyledButton } from '../default_button/styles.js';
import {
  Container,
  InnerContainer,
  Column,
  Label,
  Input,
  Span,
  Button,
  ButtonContainer,
  TextArea,
  ButtonLink,
  StyledSelect,
  StyledSelectForUser,
  DownloadButton,
  FileInput,
  TextInput,
  List,
  ListItem
} from './styles';
import PasswordModal from './password_modal';


const ProjectTabConsolidation = ({user, project}) => {
  const [fileStatus, setFileStatus] = useState({});

  const token = sessionStorage.getItem('Authorization');
  const headers = { Authorization: `Bearer ${token}` };
  const currentUser = useSelector((state) => state.user.currentUser);
  const engineering = useSelector((state) => state.app_data.engineering);
  const matchObjectd = engineering.find(item => item.project === project.id);

  const [password, setPassword] = useState(null);

  let matchObjectId = null;
  
  if (matchObjectd) {
    matchObjectId = matchObjectd.id;
  };

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };


  useEffect(() => {
    axios.get(`${currentUrl}/api/engineering/${matchObjectId}/`, { headers })
      .then((response) => {
        setFileStatus(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const getFileStatusIcon = (hasFile) => {
    if (hasFile) {
      return <span style={{ color: 'green' }}>&#10003;</span>; // Green check
    } else {
      return <span style={{ color: 'red' }}>&#x2715;</span>; // Circle with X
    }
  };

  //download engenharia

  const handleEngineeringDownload = (fileField, password) => {

    if (currentUser.user_type === "ADM") {
      axios
      .post(`${currentUrl}/api/environmental-engineering/${project.id}/download/${fileField}/`, { password }, {
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
      .post(`${currentUrl}/api/environmental-engineering/${project.id}/download/${fileField}/`, { password }, {
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

  // download projetos

  const handleDownloadProjectFiles = (fileField, password) => {

    if (currentUser.user_type === "ADM") {
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

  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
    >
      <Container>
      <div style={{ height: "80vh", overflowY: "auto", width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '32px' }}>
      <List>
        <ListItem style={{marginTop: '564px'}}>
          <div>Certificado de Matrícula</div>
          <div>{getFileStatusIcon(project.pdf_matricula_certificate)}</div>
          <div>{project.pdf_matricula_certificate && <StyledButton style={{width: '256px'}} onClick={() => handleDownloadProjectFiles('pdf_matricula_certificate')}>Download</StyledButton>}</div>
        </ListItem>
        <ListItem>
          <div>C.A.R (SICAR)</div>
          <div>{getFileStatusIcon(project.pdf_car)}</div>
          <div>{project.pdf_car && <StyledButton style={{width: '256px'}} onClick={() => handleDownloadProjectFiles('pdf_car')}>Download</StyledButton>}</div>
        </ListItem>
        <ListItem>
          <div>CCIR</div>
          <div>{getFileStatusIcon(project.pdf_ccir)}</div>
          <div>{project.pdf_ccir && <StyledButton style={{width: '256px'}} onClick={() => handleDownloadProjectFiles('pdf_ccir')}>Download</StyledButton>}</div>
        </ListItem>
        <ListItem>
          <div>Polígono da propriedade</div>
          <div>{getFileStatusIcon(project.property_polygon)}</div>
          <div>{project.property_polygon && <StyledButton style={{width: '256px'}} onClick={() => handleDownloadProjectFiles('property_polygon')}>Download</StyledButton>}</div>
        </ListItem>
        <ListItem>
          <div>Regularização com a Dívida Federal</div>
          <div>{getFileStatusIcon(project.pdf_federal_debt_certificate)}</div>
          <div>{project.pdf_federal_debt_certificate && <StyledButton style={{width: '256px'}} onClick={() => handleDownloadProjectFiles('pdf_federal_debt_certificate')}>Download</StyledButton>}</div>
        </ListItem>
        <ListItem>
          <div> PDD PDF</div>
          <div>{getFileStatusIcon(fileStatus.pdd_pdf)}</div>
          <div>{fileStatus.pdd_pdf && <StyledButton style={{width: '256px'}} onClick={() => handleEngineeringDownload('pdd_pdf')}>Download</StyledButton>}</div>
        </ListItem>
        <ListItem>
          <div>PDD Draft</div>
          <div>{getFileStatusIcon(fileStatus.pdd_draft)}</div>
          <div>{fileStatus.pdd_draft && <StyledButton style={{width: '256px'}} onClick={() => handleEngineeringDownload('pdd_draft')}>Download</StyledButton>}</div>
        </ListItem>
        <ListItem>
          <div>Análise de Viabilidade</div>
          <div>{getFileStatusIcon(fileStatus.viability_analysis)}</div>
          <div>{fileStatus.viability_analysis && <StyledButton style={{width: '256px'}} onClick={() => handleEngineeringDownload('viability_analysis')}>Download</StyledButton>}</div>
        </ListItem>
        <ListItem>
          <div>Registration Wilder</div>
          <div>{getFileStatusIcon(fileStatus.registration_wilder)}</div>
          <div>{fileStatus.registration_wilder && <StyledButton style={{width: '256px'}} onClick={() => handleEngineeringDownload('registration_wilder')}>Download</StyledButton>}</div>
        </ListItem>
        <ListItem>
          <div>Due Diligence</div>
          <div>{getFileStatusIcon(fileStatus.due_diligence)}</div>
          <div>{fileStatus.due_diligence && <StyledButton style={{width: '256px'}} onClick={() => handleEngineeringDownload('due_diligence')}>Download</StyledButton>}</div>
        </ListItem>
      </List>
      </div>
      {isPasswordModalOpen && (
        <PasswordModal onConfirm={(password) => {
          setPassword(password);
          closePasswordModal();
        }} />
      )}
      </Container>
    </motion.div>
  );
};

export default ProjectTabConsolidation;




