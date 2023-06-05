import { Container, InnerContainer, ImageContainer, ButtonContainer, Column, Button, ButtonSecondary } from './styles'
import React, { useState } from 'react';
import axios from 'axios';
import { currentUrl } from '../../constants/global';
import Swal from 'sweetalert2';
import addFile from '../../assets/icons/add_file.png'
import uploadedFile from '../../assets/icons/secondary_file.png'


const RegisterProjectFileUploadWebOpen = () => {


  function separateInfo(data) {
    const [constant1, constant2, constant3] = data.split("-vert-");
    return [constant1, constant2, constant3];
  }

  let projectId, credentials, owner = null;
  
  if (window.location.pathname) {
    const info = (window.location.pathname.split('/')[2]);
    [owner, credentials, projectId] = separateInfo(info);
    console.log('dentro do if', projectId, credentials, owner)
  }

  console.log('fora do if', projectId, credentials, owner)

  // colocando o FileUploaderWeb aqui

  const [selectedFiles, setSelectedFiles] = useState({
    pdf_matricula_certificate: null,
    pdf_car: null,
    property_polygon: null,
    pdf_federal_debt_certificate: null,
    pdf_ccir: null,
    owner: owner // alterar essa linha
  });


  const handleFileInput = (fieldName, e) => {
    setSelectedFiles((prevSelectedFiles) => ({
      ...prevSelectedFiles,
      [fieldName]: e.target.files[0],
    }));
  };

  

  const handleUpload = async () => {
    const url = `${currentUrl}/api/projects/${projectId}/update/`;
  
    const formData = new FormData();
    formData.append('pdf_matricula_certificate', selectedFiles.pdf_matricula_certificate);
    formData.append('pdf_car', selectedFiles.pdf_car);
    formData.append('property_polygon', selectedFiles.property_polygon);
    formData.append('pdf_federal_debt_certificate', selectedFiles.pdf_federal_debt_certificate);
    formData.append('pdf_ccir', selectedFiles.pdf_ccir);
  
    try {
      const response = await axios.put(url, selectedFiles, {
        headers: {
          Authorization: `Bearer ${credentials}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire({
        title: 'Sucesso!',
        text: 'Os documentos escolhidos foram enviados com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      });      
      window.location = '/upload_success'
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

  const handleCancelUpload = () => {
    window.location = '/upload_canceled'
  }


  return (
    <Container>
      <h3>Informações Cadastrais</h3>
      <InnerContainer>
        <Column>
        <>

      <ImageContainer>
        {selectedFiles.pdf_matricula_certificate ? <img src={uploadedFile} style={{width: '60px', marginBottom: '16px' }} alt="uploaded file" /> : <img src={addFile} alt="emptyFile" style={{width: '50px', marginBottom: '16px'}}/>}
        <label>Anexar Certidão de Matrícula</label>
        <small style={{ marginLeft: '8px' }}>(atualizada em até 180 dias)</small>
        <p />
        <input type="file"  onChange={(e) => handleFileInput('pdf_matricula_certificate', e)} />
      </ImageContainer>
      <p />
      <ImageContainer>
        {selectedFiles.pdf_car ? <img src={uploadedFile} style={{width: '60px', marginBottom: '16px' }} alt="uploaded file" /> : <img src={addFile} alt="emptyFile" style={{width: '50px', marginBottom: '16px'}}/>}
        <label>Anexar PDF do CAR (SICAR)</label>
        <p />
        <input type="file" onChange={(e) => handleFileInput('pdf_car', e)} />
      </ImageContainer>
      <p />
      <ImageContainer>
        {selectedFiles.property_polygon ? <img src={uploadedFile} style={{width: '60px', marginBottom: '16px' }} alt="uploaded file" /> : <img src={addFile} alt="emptyFile" style={{width: '50px', marginBottom: '16px'}}/>}
        <label>Anexar o Polígono da propriedade</label>
        <small style={{ marginLeft: '8px' }}>
          (Formatos aceitos: *.KMZ ou *.KML)
        </small>
        <p />
        <input type="file" onChange={(e) => handleFileInput('property_polygon', e)} />
      </ImageContainer>
      <p />
      <ImageContainer>
        {selectedFiles.pdf_ccir ? <img src={uploadedFile} style={{width: '60px', marginBottom: '16px' }} alt="uploaded file" /> : <img src={addFile} alt="emptyFile" style={{width: '50px', marginBottom: '16px'}}/>}
        <label>Anexar cópia do CCIR</label>
        <p />
        <input type="file" onChange={(e) => handleFileInput('pdf_ccir', e)} />
      </ImageContainer>
      <p />
      <ImageContainer>
        {selectedFiles.pdf_federal_debt_certificate ? <img src={uploadedFile} style={{width: '60px', marginBottom: '16px' }} alt="uploaded file" /> : <img src={addFile} alt="emptyFile" style={{width: '50px', marginBottom: '16px'}}/>}
        <label>Anexar Certidão de Regularidade da Dívida Federal</label>
        <p />
        <input type="file" onChange={(e) => handleFileInput('pdf_federal_debt_certificate', e)} />
      </ImageContainer>
      <p />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
      </div>
    </>
        </Column>
      </InnerContainer>
      <InnerContainer style={{marginTop: '16px'}}>
        <Button onClick={handleUpload}>Finalizar</Button>
        <ButtonSecondary onClick={handleCancelUpload} >Salvar e continuar mais tarde</ButtonSecondary>      
      </InnerContainer>
    </Container>
  )
};

export default RegisterProjectFileUploadWebOpen;