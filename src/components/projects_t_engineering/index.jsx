import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { currentUrl } from '../../constants/global';
import {
  Container,
  InnerContainer,
  Column,
  Label,
  Button,
  ButtonContainer,
  FileInput,
} from './styles';

const ProjectTabEngineering = ({ user, project }) => {
  const [pddFile, setPddFile] = useState(null);
  const [pddDraftFile, setPddDraftFile] = useState(null);
  const [viabilityFile, setViabilityFile] = useState(null);
  const [registrationWilderFile, setRegistrationWilderFile] = useState(null);
  const [additionalInformation, setAdditionalInformation] = useState('');

  const handleFileChange = (event, setFileFunc) => {
    const selectedFile = event.target.files[0];
    setFileFunc(selectedFile);
  };

  const handleAdditionalInformationChange = (event) => {
    setAdditionalInformation(event.target.value);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('project', project.id);

    if (pddFile) {
      formData.append('pdd_pdf', pddFile);
    }
    if (pddDraftFile) {
      formData.append('pdd_draft', pddDraftFile);
    }
    if (viabilityFile) {
      formData.append('viability_analysis', viabilityFile);
    }
    if (registrationWilderFile) {
      formData.append('registration_wilder', registrationWilderFile);
    }
    if (additionalInformation) {
      formData.append('additional_information', additionalInformation);
    }

    const token = sessionStorage.getItem('Authorization');
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .put(`${currentUrl}/api/engineering/${project.id}/update/`, formData, { headers })
      .then((response) => {
        console.log('Upload successful!', response);
        Swal.fire({
          title: 'Sucesso!',
          text: 'Seus arquivos foram enviados com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch((error) => {
        console.error('Upload failed!', error);
        Swal.fire({
          title: 'Erro!',
          text: 'Algo deu errado. Por favor, contate nosso suporte! suporte@vertecotech.com',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {user.user_type === 'ADM' ? (
        <Container>
          {user.user_type === 'ADM' && project.status !== null ? (
            <>
              <ButtonContainer>
                <Button onClick={handleUpload}>Enviar Arquivos</Button>
              </ButtonContainer>
              <InnerContainer>
                <h2>{project.title === 'default' ? 'Sem Título' : project.title}</h2>
                <small>Status: {project.status}</small>
                <Column>
                  <Label htmlFor="pdd_pdf">PDD:</Label>
                  <FileInput id="pdd_pdf" name="pdd_pdf" onChange={(e) => handleFileChange(e, setPddFile)} />

                  <Label htmlFor="pdd_draft">PDD Rascunho:</Label>
                  <FileInput id="pdd_draft" name="pdd_draft" onChange={(e) => handleFileChange(e, setPddDraftFile)} />

                  <Label htmlFor="viability_analisys">Análise de viabilidade:</Label>
                  <FileInput id="viability_analisys" name="viability_analisys" onChange={(e) => handleFileChange(e, setViabilityFile)} />
                </Column>
                <Column>
                  <Label htmlFor="registration_wilder">Registration Wilder:</Label>
                  <FileInput id="registration_wilder" name="registration_wilder" onChange={(e) => handleFileChange(e, setRegistrationWilderFile)} />
                </Column>
                <Column>
                  <Label htmlFor="additional_information">Informações adicionais:</Label>
                  <textarea
                    id="additional_information"
                    name="additional_information"
                    value={additionalInformation}
                    onChange={handleAdditionalInformationChange}
                  />
              </Column>
              </InnerContainer>
            </>
          ) : (
            <h1></h1>
          )}
        </Container>
      ) : (
        <h1></h1>
      )}
    </motion.div>
  );
};

export default ProjectTabEngineering;
