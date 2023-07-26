import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    axios.get(`${currentUrl}/api/engineering/${project.id}/`, { headers })
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

  const handleDownload = (fileField) => {
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

  console.log('fileStatus.registration_wilder', fileStatus.registration_wilder);

  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
    >
      <Container>
      <List>
        <ListItem>
          <div> PDD PDF: </div>
          <div>{getFileStatusIcon(fileStatus.pdd_pdf)}</div>
          <div>{fileStatus.pdd_pdf && <StyledButton style={{width: '256px'}} onClick={() => handleDownload('pdd_pdf')}>Download</StyledButton>}</div>
        </ListItem>
        <ListItem>
          <div>PDD Draft: </div>
          <div>{getFileStatusIcon(fileStatus.pdd_draft)}</div>
          <div>{fileStatus.pdd_draft && <StyledButton style={{width: '256px'}} onClick={() => handleDownload('pdd_draft')}>Download</StyledButton>}</div>
        </ListItem>
        <ListItem>
          <div>Viability Analysis: </div>
          <div>{getFileStatusIcon(fileStatus.viability_analysis)}</div>
          <div>{fileStatus.viability_analysis && <StyledButton style={{width: '256px'}} onClick={() => handleDownload('viability_analysis')}>Download</StyledButton>}</div>
        </ListItem>
        <ListItem>
          <div>Registration Wilder: </div>
          <div>{getFileStatusIcon(fileStatus.registration_wilder)}</div>
          <div>{fileStatus.registration_wilder && <StyledButton style={{width: '256px'}} onClick={() => handleDownload('registration_wilder')}>Download</StyledButton>}</div>
        </ListItem>
        <ListItem>
          <div>Due Diligence: </div>
          <div>{getFileStatusIcon(fileStatus.due_diligence)}</div>
          <div>{fileStatus.due_diligence && <StyledButton style={{width: '256px'}} onClick={() => handleDownload('due_diligence')}>Download</StyledButton>}</div>
        </ListItem>
        <ListItem>
          <div>Additional Information: </div>
          <div>{getFileStatusIcon(!!fileStatus.additional_information)}</div>
          <div>{fileStatus.additional_information && <StyledButton style={{width: '256px'}} onClick={() => handleDownload('pdd_pdf')}>Download</StyledButton>}</div>
        </ListItem>
      </List>
      </Container>
    </motion.div>
  );
};

export default ProjectTabConsolidation;
