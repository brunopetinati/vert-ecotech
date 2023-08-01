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


const ProjectTabConsolidation = ({user, project}) => {
  const [fileStatus, setFileStatus] = useState({});

  const token = sessionStorage.getItem('Authorization');
  const headers = { Authorization: `Bearer ${token}` };


  const engineering = useSelector((state) => state.app_data.engineering);
  const matchObjectd = engineering.find(item => item.project === project.id);

  let matchObjectId = null;
  
  if (matchObjectd) {
    matchObjectId = matchObjectd.id;
    console.log('O ID do objeto desejado é:', matchObjectId);
  } else {
    console.log('Nenhum objeto encontrado com o project_id correspondente.');
  }


  useEffect(() => {
    axios.get(`${currentUrl}/api/engineering/${matchObjectId}/`, { headers })
      .then((response) => {
        // Assuming the response is an object containing field names as keys and file presence as values
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

  const handleEngineeringDownload = (fileField) => {
    axios
      .get(`${currentUrl}/api/engineering/${project.id}/download/${fileField}/`, {
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
  };

  const downloadPDF = (fieldName) => {

    //const token = sessionStorage.getItem('Authorization');
    const downloadUrl = `${currentUrl}/api/project/${project.id}/download/${fieldName}/`;
    window.open(downloadUrl, '_blank');
  };

  console.log('fileStatus.registration_wilder', fileStatus.registration_wilder);

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
          <div>{project.pdf_matricula_certificate && <StyledButton onClick={() => downloadPDF('pdf_matricula_certificate')}>Certificado de Matrícula</StyledButton>}</div>
        </ListItem>
        <ListItem>
          <div>CAR (SICAR)</div>
          <div>{getFileStatusIcon(project.pdf_car)}</div>
          <div>{project.pdf_car && <StyledButton onClick={() => downloadPDF('pdf_car')}>PDF CAR</StyledButton>}</div>
        </ListItem>
        <ListItem>
          <div>CCIR</div>
          <div>{getFileStatusIcon(project.pdf_ccir)}</div>
          <div>{project.pdf_ccir && <StyledButton onClick={() => downloadPDF('pdf_ccir')}>PDF CCIR</StyledButton>}</div>
        </ListItem>
        <ListItem>
          <div>Polígono da propriedade</div>
          <div>{getFileStatusIcon(project.property_polygon)}</div>
          <div>{project.property_polygon && <StyledButton onClick={() => downloadPDF('property_polygon')}>Polígono da Propridade</StyledButton>}</div>
        </ListItem>
        <ListItem>
          <div>Regularização com a Dívida Federal</div>
          <div>{getFileStatusIcon(project.pdf_federal_debt_certificate)}</div>
          <div>{project.pdf_federal_debt_certificate && <StyledButton onClick={() => downloadPDF('pdf_federal_debt_certificate')}>Certificado Dívida Federal</StyledButton>}</div>
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
          <div>Viability Analysis</div>
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
      </Container>
    </motion.div>
  );
};

export default ProjectTabConsolidation;




