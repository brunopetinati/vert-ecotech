import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Label, FileInput, Container, InnerContainer, Column, Button, ButtonContainer } from '../projects_t_engineering/styles';
import { currentUrl } from '../../constants/global';

const ProjectTabLegal = ({ user, project }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('project', project.id);
      formData.append('duediligence', file);

      axios.post(`${currentUrl}/api/engineering/`, formData)
        .then((response) => {
          console.log('Upload successful!', response);
          // Do something with the response if needed
        })
        .catch((error) => {
          console.error('Upload failed!', error);
          // Handle errors if necessary
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
      <Container>
      <ButtonContainer>
          <Button onClick={handleUpload}>Enviar Arquivo</Button>
        </ButtonContainer>
        <InnerContainer>
          <Column>
            <Label htmlFor="duediligence">Duediligence:</Label>
            <FileInput id="duediligence" name="duediligence" onChange={handleFileChange}></FileInput>
          </Column>
        </InnerContainer>

      </Container>
    </motion.div>
  );
};

export default ProjectTabLegal;
