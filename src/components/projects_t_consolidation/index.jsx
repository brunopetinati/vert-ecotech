import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
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
} from './styles';


const ProjectTabConsolidation = ({user, project}) => {
  const [fileStatus, setFileStatus] = useState({});

  useEffect(() => {
    const currentUrl = window.location.origin; // Assuming the API is on the same origin as the frontend

    // Make the API request
    axios.get(`${currentUrl}/api/engineering/${project.id}/update`)
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

  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
    >
      <Container>
      <h2>File Status:</h2>
      <ul>
        <li>
          PDD PDF: {getFileStatusIcon(fileStatus.pdd_pdf)}
        </li>
        <li>
          PDD Draft: {getFileStatusIcon(fileStatus.pdd_draft)}
        </li>
        <li>
          Viability Analysis: {getFileStatusIcon(fileStatus.viability_analysis)}
        </li>
        <li>
          Registration Wilder: {getFileStatusIcon(fileStatus.registration_wilder)}
        </li>
        <li>
          Due Diligence: {getFileStatusIcon(fileStatus.due_diligence)}
        </li>
        <li>
          Additional Information: {getFileStatusIcon(!!fileStatus.additional_information)}
        </li>
      </ul>
      </Container>
    </motion.div>
  );
};

export default ProjectTabConsolidation;
