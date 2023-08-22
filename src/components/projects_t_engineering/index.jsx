import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
  const [fileStates, setFileStates] = useState({
    pddFile: null,
    pddDraftFile: null,
    viabilityFile: null,
    registrationWilderFile: null,
    additionalInformation: '',
  });

  const engineering = useSelector((state) => state.app_data.engineering);
  const matchObject = engineering.find(item => item.project === project.id);
  let matchObjectId = null;
  
  if (matchObject) {
    matchObjectId = matchObject.id;
  } else {
    console.error('Nenhum objeto encontrado com o project_id correspondente.');
  }

  const handleFileChange = (event, fieldName) => {
    const selectedFile = event.target.files[0];
    setFileStates(prevState => ({
      ...prevState,
      [fieldName]: selectedFile,
    }));
  };

  const handleAdditionalInformationChange = (event) => {
    setFileStates(prevState => ({
      ...prevState,
      additionalInformation: event.target.value,
    }));
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('project', project.id);

    if (fileStates.pddFile) {
      formData.append('pdd_pdf', fileStates.pddFile);
    }
    if (fileStates.pddDraftFile) {
      formData.append('pdd_draft', fileStates.pddDraftFile);
    }
    if (fileStates.viabilityFile) {
      formData.append('viability_analysis', fileStates.viabilityFile);
    }
    if (fileStates.registrationWilderFile) {
      formData.append('registration_wilder', fileStates.registrationWilderFile);
    }
    if (fileStates.additionalInformation) {
      formData.append('additional_information', fileStates.additionalInformation);
    }

    const token = sessionStorage.getItem('Authorization');
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .put(`${currentUrl}/api/engineering/${matchObjectId}/update/`, formData, { headers })
      .then((response) => {
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

  useEffect(() => {
    const token = sessionStorage.getItem('Authorization');
    const headers = { Authorization: `Bearer ${token}` };

    axios.get(`${currentUrl}/api/engineering/${matchObjectId}/`, { headers })
      .then((response) => {
        setFileStates(prevState => ({
          ...prevState,
          ...response.data,
        }));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const switchField = (fieldName) => {
    setFileStates(prevState => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };

  const renderFileInputOrMessage = (fieldName) => {
    if (fileStates[fieldName]) {
      return <small style={{ color: 'green' }} onClick={() => switchField(fieldName)}>Arquivo consolidado</small>;
    } else {
      return <FileInput id={fieldName} name={fieldName} onChange={(e) => handleFileChange(e, fieldName)} />;
    }
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
                  {renderFileInputOrMessage('pddFile')}

                  <Label htmlFor="pdd_draft">PDD Rascunho:</Label>
                  {renderFileInputOrMessage('pddDraftFile')}

                  <Label htmlFor="viability_analisys">Análise de viabilidade:</Label>
                  {renderFileInputOrMessage('viabilityFile')}
                </Column>
                <Column>
                  <Label htmlFor="registration_wilder">Registration Wilder:</Label>
                  {renderFileInputOrMessage('registrationWilderFile')}
                </Column>
                <Column>
                  <Label htmlFor="additional_information">Informações adicionais:</Label>
                  <textarea
                    id="additional_information"
                    name="additional_information"
                    value={fileStates.additionalInformation}
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
