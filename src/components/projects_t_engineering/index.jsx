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
  const [pddFile, setPddFile] = useState(null);
  const [pddDraftFile, setPddDraftFile] = useState(null);
  const [viabilityFile, setViabilityFile] = useState(null);
  const [registrationWilderFile, setRegistrationWilderFile] = useState(null);
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [fileStatus, setFileStatus] = useState({});
  const engineering = useSelector((state) => state.app_data.engineering);
  const matchObjectd = engineering.find(item => item.project === project.id);

  let matchObjectId = null;
  
  if (matchObjectd) {
    matchObjectId = matchObjectd.id;
    console.log('O ID do objeto desejado é:', matchObjectId);
  } else {
    console.log('Nenhum objeto encontrado com o project_id correspondente.');
  }

  console.log(engineering);

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
      .put(`${currentUrl}/api/engineering/${matchObjectId}/update/`, formData, { headers })
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

  useEffect(() => {
    
    const token = sessionStorage.getItem('Authorization');
    const headers = { Authorization: `Bearer ${token}` };

    axios.get(`${currentUrl}/api/engineering/${matchObjectId}/`, { headers })
      .then((response) => {
        setFileStatus(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const switchField = (fieldName) => {
    setFileStatus(fileStatus[fieldName] === '')
  };

  const renderFileInputOrMessage = (fieldName) => {
    if (fileStatus[fieldName]) {
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
                  {renderFileInputOrMessage('pdd_pdf')}

                  <Label htmlFor="pdd_draft">PDD Rascunho:</Label>
                  {renderFileInputOrMessage('pdd_draft')}

                  <Label htmlFor="viability_analisys">Análise de viabilidade:</Label>
                  {renderFileInputOrMessage('viability_analisys')}
                </Column>
                <Column>
                  <Label htmlFor="registration_wilder">Registration Wilder:</Label>
                  {renderFileInputOrMessage('registration_wilder')}
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
