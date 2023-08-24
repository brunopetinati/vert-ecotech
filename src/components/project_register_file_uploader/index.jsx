import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { currentUrl } from '../../constants/global';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProjectToProjects } from '../../store/modules/app_data/actions';
import { Container, Column, FileContainer, InputLabel, Input, SmallText } from './styles';
import { Button } from '../project_register_upload_files/styles';
import { ButtonContainer } from '../project_register_info/styles';

const FileUploader = () => {

  // quando é o próprio usuário registrando o próprio projeto
  // const currentID = useSelector((state) => state.user.currentUser.id);

  const projectID = useSelector((state) => state.app_data.project_id);
  const ownerID = useSelector((state) => state.app_data.owner_id);
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.app_data.projects);

  const [selectedFiles, setSelectedFiles] = useState({
    pdf_matricula_certificate: null,
    pdf_car: null,
    property_polygon: null,
    pdf_federal_debt_certificate: null,
    pdf_ccir: null,
    project_image: null,
    owner: ownerID // alterar essa linha
  });


  const handleFileInput = (fieldName, e) => {
    setSelectedFiles((prevSelectedFiles) => ({
      ...prevSelectedFiles,
      [fieldName]: e.target.files[0],
    }));
  };

  const handleUpload = async () => {
    const token = sessionStorage.getItem('Authorization');
    const url = `${currentUrl}/api/projects/${projectID}/update/`;
  
    const formData = new FormData();
    formData.append('pdf_matricula_certificate', selectedFiles.pdf_matricula_certificate);
    formData.append('pdf_car', selectedFiles.pdf_car);
    formData.append('property_polygon', selectedFiles.property_polygon);
    formData.append('pdf_federal_debt_certificate', selectedFiles.pdf_federal_debt_certificate);
    formData.append('pdf_ccir', selectedFiles.pdf_ccir);
    formData.append('project_image', selectedFiles.project_image);
  
    try {
      const response = await axios.put(url, selectedFiles, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire({
        title: 'Sucesso!',
        text: 'Os documentos escolhidos foram enviados com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      });      
        // se existe projeto com mesmo id no array, não adicionar, tratar isso
      dispatch(addProjectToProjects(response.data));
    } catch (error) {
      Swal.fire({
        title: 'Erro!',
        text: 'Algo deu errado ao tentar processar sua requisição.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error('Error:', error);
      // Add code to handle the error
    }
  };

  const navigate = useNavigate();
  const handleComeBack = () => {
    navigate('/welcome');
  };

  return (
  <Container>
    <Column>
      <FileContainer>
        <InputLabel>Certidão de Matrícula</InputLabel><br />
        <SmallText>(atualizada em até 180 dias)</SmallText>
        <Input type="file" onChange={(e) => handleFileInput('pdf_matricula_certificate', e)} />
      </FileContainer>
      <FileContainer>
        <InputLabel>PDF do C.A.R (SICAR)</InputLabel>
        <Input type="file" onChange={(e) => handleFileInput('pdf_car', e)} />
      </FileContainer>
      <FileContainer>
        <InputLabel>Polígono da propriedade</InputLabel><br />
        <SmallText>(Formatos aceitos: *.KMZ ou *.KML)</SmallText>
        <Input type="file" onChange={(e) => handleFileInput('property_polygon', e)} />
      </FileContainer>
    </Column>
    <Column>
      <FileContainer>
        <InputLabel>Cópia do CCIR</InputLabel>
        <Input type="file" onChange={(e) => handleFileInput('pdf_ccir', e)} />
      </FileContainer>
      <FileContainer>
        <InputLabel>Certidão de Regularidade da Dívida Federal</InputLabel>
        <Input type="file" onChange={(e) => handleFileInput('pdf_federal_debt_certificate', e)} />
      </FileContainer>
      <FileContainer>
        <InputLabel>Imagem Representativa do Projeto</InputLabel><br />
        <SmallText>Adicione uma foto para identificar a sua área verde.</SmallText><br />
        <Input type="file" onChange={(e) => handleFileInput('project_image', e)} />
      </FileContainer>     
      <ButtonContainer>
        <Button onClick={handleUpload}>Registrar arquivos</Button>
        <Button onClick={handleComeBack}>Voltar ao Painel</Button>
      </ButtonContainer>
    </Column>
  </Container>
  );
};

export default FileUploader;
