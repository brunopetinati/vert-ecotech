import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FileInput, Container, Button, ButtonContainer, ListItem, List } from '../projects_t_engineering/styles';
import { currentUrl } from '../../constants/global';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import FileUploadComponent from './FileUploadComponent';


const ProjectTabLegal = ({ user, project }) => {
  const [fileStates, setFileStates] = useState({ 
    duediligence_File: null, 
    contrato_File: null
  });
  
  const engineering = useSelector((state) => state.app_data.engineering);
  const matchObject = engineering.find(item => item.project === project.id);
  let matchObjectId = null;
  
  if (matchObject) {
    matchObjectId = matchObject.id;
  } else {
    console.error('Nenhum objeto encontrado com o project_id correspondente.');
  }

  const switchField = (fieldName) => {
    setFileStates(prevState => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };
  
  const handleFileChange = (event, fieldName) => {
    const selectedFile = event.target.files[0];
    setFileStates(prevState => ({
      ...prevState,
      [fieldName]: selectedFile,
    }));
  };  

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('project', project.id);

    if (fileStates.duediligence_File) {
      formData.append('duediligence', fileStates.duediligence_File);
    }
    if (fileStates.contrato_File) {
      formData.append('contrato', fileStates.contrato_File);
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

  const labelStyle = {
    maxWidth: '400px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: 'rgb(54,54,54)', 
    marginLeft: '50px',
    width: '400px',
  };  

  const data = [
    { label: 'Due Diligence / Proprietário', fileName: 'duediligence_File' },
    { label: 'Contrato', fileName: 'contrato_File' }
  ];  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Container>
        <div style={{ height: "80vh", overflowY: "auto", width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
          <List>
            <ListItem style={{ backgroundColor: 'lightgrey' }}>
              <div style={{ marginLeft: '50px', marginTop: '-10px' }}><h4>Descrição</h4></div>
              <div style={{ marginLeft: '260px', marginTop: '-10px' }}><h4>Arquivo</h4></div>
            </ListItem>
            {data.map((item, index) => (
              <ListItem key={item.label} className={index % 2 === 0 ? 'green-row' : 'white-row'}>
                <div style={labelStyle}>{item.label}:</div>
                <div style={{ marginLeft: '90px', width: '250px' }}>
                  {fileStates[item.fileName] ? (
                    <small style={{ color: 'green' }} onClick={() => switchField(item.fileName)}>Arquivo consolidado</small>
                  ) : (
                    <FileUploadComponent item={item} handleFileChange={(e) => handleFileChange(e, item.fileName)}/>
                  )}
                </div>
              </ListItem>
            ))}
          </List>
          <ButtonContainer>
            <Button onClick={handleUpload}>Enviar Arquivo</Button>
          </ButtonContainer>        
        </div>
      </Container>
    </motion.div>
  );
};

export default ProjectTabLegal;
