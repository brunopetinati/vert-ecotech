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


const ProjectTabEngineering = ({ user, project }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('project', project.id);
      formData.append('file', file);

      const token = sessionStorage.getItem('Authorization');
      const headers = { Authorization: `Bearer ${token}` };

      axios
        .put(`${currentUrl}/api/engineering/${project.id}/update`, formData, { headers })
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
    } else {
      console.warn('No file selected.');
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
                  <FileInput id="pdd_pdf" name="pdd_pdf" onChange={handleFileChange} />

                  <Label htmlFor="pdd_draft">PDD Rascunho:</Label>
                  <FileInput id="pdd_draft" name="pdd_draft" onChange={handleFileChange} />

                  <Label htmlFor="viability_analisys">Análise de viabilidade:</Label>
                  <FileInput
                    id="viability_analisys"
                    name="viability_analisys"
                    onChange={handleFileChange}
                  />
                </Column>
                <Column>
                  <Label htmlFor="registration_wilder">Registration Wilder:</Label>
                  <FileInput
                    id="registration_wilder"
                    name="registration_wilder"
                    onChange={handleFileChange}
                  />

                  <Label htmlFor="aditional_info">Informações adicionais: </Label>
                  <TextInput id="aditional_info" name="aditional_info" />
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
