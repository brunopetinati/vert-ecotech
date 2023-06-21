import { Container, InnerContainer, ImageContainer, StyledFileInput, Column, Button, ButtonSecondary } from './styles'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { currentUrl } from '../../constants/global';
import addFile from '../../assets/icons/add_file.png'
import uploadedFile from '../../assets/icons/secondary_file.png'
import LoadingComponent from '../../components/loading_component';

const RegisterProjectFileUploadWebOpen = () => {
  function separateInfo(data) {
    const [constant1, constant2, constant3] = data.split("-vert-");
    return [constant1, constant2, constant3];
  }

  let projectId, credentials, owner = null;

  if (window.location.pathname) {
    const info = (window.location.pathname.split('/')[2]);
    [owner, credentials, projectId] = separateInfo(info);
  }

  const [selectedFiles, setSelectedFiles] = useState({
    pdf_matricula_certificate: null,
    pdf_car: null,
    property_polygon: null,
    pdf_federal_debt_certificate: null,
    pdf_ccir: null,
    owner: owner
  });

  const [existingFiles, setExistingFiles] = useState({
    pdf_matricula_certificate: false,
    pdf_car: false,
    property_polygon: false,
    pdf_federal_debt_certificate: false,
    pdf_ccir: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkExistingFiles = async () => {
      const url = `${currentUrl}/api/projects/${projectId}/`;
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${credentials}`,
          },
        });
        const { data } = response;
        const {
          pdf_matricula_certificate,
          pdf_car,
          property_polygon,
          pdf_federal_debt_certificate,
          pdf_ccir,
        } = data;

        setExistingFiles({
          pdf_matricula_certificate: pdf_matricula_certificate !== null,
          pdf_car: pdf_car !== null,
          property_polygon: property_polygon !== null,
          pdf_federal_debt_certificate: pdf_federal_debt_certificate !== null,
          pdf_ccir: pdf_ccir !== null,
        });
      } catch (error) {
        console.error('Error:', error);
        // Add code to handle the error
      }
    };

    checkExistingFiles();
  }, [projectId, credentials]);

  const handleFileInput = (fieldName, e) => {
    setSelectedFiles((prevSelectedFiles) => ({
      ...prevSelectedFiles,
      [fieldName]: e.target.files[0],
    }));
    setExistingFiles((prevSelectedFiles) => ({
      ...prevSelectedFiles,
      [fieldName]: e.target.files[0],
    }));
  };

  const handleUpload = async (redirectPath) => {
    const url = `${currentUrl}/api/projects/${projectId}/update/`;

    const formData = new FormData();
    formData.append('pdf_matricula_certificate', selectedFiles.pdf_matricula_certificate);
    formData.append('pdf_car', selectedFiles.pdf_car);
    formData.append('property_polygon', selectedFiles.property_polygon);
    formData.append('pdf_federal_debt_certificate', selectedFiles.pdf_federal_debt_certificate);
    formData.append('pdf_ccir', selectedFiles.pdf_ccir);


    try {
      await axios.put(url, selectedFiles, {
        headers: {
          Authorization: `Bearer ${credentials}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(true);
    } catch (error) {
      setLoading(false);
      alert('Algo deu errado. Por favor, contate nosso suporte: suporte@vertecotech.com');
      console.error('Error:', error);
      // Error handling logic here
      // ...
    }
  };

  const resetFileState = (fieldName) => {
    setExistingFiles(prevState => ({
      ...prevState,
      [fieldName]: false
    }));
  };

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Container>
          <h3>Informações Cadastrais</h3>
          <InnerContainer>
            <Column>
              <>
                <ImageContainer>
                  {existingFiles.pdf_matricula_certificate ? (
                    <>
                      <img
                        src={uploadedFile}
                        style={{ width: '60px', marginBottom: '16px' }}
                        alt="uploaded file"
                      />
                      <label>Certidão de Matrícula</label>
                      <button
                        style={{ margin: '16px' }}
                        onClick={() => resetFileState('pdf_matricula_certificate')}
                      >
                        Escolher outro arquivo
                      </button>
                    </>
                  ) : (
                    <>
                      <img
                        src={addFile}
                        alt="emptyFile"
                        style={{ width: '50px', marginBottom: '16px' }}
                      />
                      <label>Anexar Certidão de Matrícula</label>
                      <small style={{ marginLeft: '8px' }}>(atualizada em até 180 dias)</small>
                    </>
                  )}
                  <p />
                  {!existingFiles.pdf_matricula_certificate && (
                    <StyledFileInput
                      type="file"
                      onChange={(e) => handleFileInput('pdf_matricula_certificate', e)}
                    />
                  )}
                </ImageContainer>
                <p />
                <ImageContainer>
                  {existingFiles.pdf_car ? (
                    <>
                      <img
                        src={uploadedFile}
                        style={{ width: '60px', marginBottom: '16px' }}
                        alt="uploaded file"
                      />
                      <label>PDF do CAR (SICAR)</label>
                      <button
                        style={{ margin: '16px' }}
                        onClick={() => resetFileState('pdf_car')}
                      >
                        Escolher outro arquivo
                      </button>
                    </>
                  ) : (
                    <>
                      <img
                        src={addFile}
                        alt="emptyFile"
                        style={{ width: '50px', marginBottom: '16px' }}
                      />
                      <label>Anexar PDF do CAR (SICAR)</label>
                    </>
                  )}
                  <p />
                  {!existingFiles.pdf_car && (
                    <StyledFileInput type="file" onChange={(e) => handleFileInput('pdf_car', e)} />
                  )}
                </ImageContainer>
                <p />
                <ImageContainer>
                  {existingFiles.property_polygon ? (
                    <>
                      <img
                        src={uploadedFile}
                        style={{ width: '60px', marginBottom: '16px' }}
                        alt="uploaded file"
                      />
                      <label>Polígono da propriedade</label>
                      <button
                        style={{ margin: '16px' }}
                        onClick={() => resetFileState('property_polygon')}
                      >
                        Escolher outro arquivo
                      </button>
                    </>
                  ) : (
                    <>
                      <img
                        src={addFile}
                        alt="emptyFile"
                        style={{ width: '50px', marginBottom: '16px' }}
                      />
                      <label>Anexar o Polígono da propriedade</label>
                      <small style={{ marginLeft: '8px' }}>
                        (Formatos aceitos: *.KMZ ou *.KML)
                      </small>
                    </>
                  )}
                  <p />
                  {!existingFiles.property_polygon && (
                    <StyledFileInput
                      type="file"
                      onChange={(e) => handleFileInput('property_polygon', e)}
                    />
                  )}
                </ImageContainer>
                <p />
                <ImageContainer>
                  {existingFiles.pdf_ccir ? (
                    <>
                      <img
                        src={uploadedFile}
                        style={{ width: '60px', marginBottom: '16px' }}
                        alt="uploaded file"
                      />
                      <label>Cópia do CCIR</label>
                      <button
                        style={{ margin: '16px' }}
                        onClick={() => resetFileState('pdf_ccir')}
                      >
                        Escolher outro arquivo
                      </button>
                    </>
                  ) : (
                    <>
                      <img
                        src={addFile}
                        alt="emptyFile"
                        style={{ width: '50px', marginBottom: '16px' }}
                      />
                      <label>Anexar cópia do CCIR</label>
                    </>
                  )}
                  <p />
                  {!existingFiles.pdf_ccir && (
                    <StyledFileInput type="file" onChange={(e) => handleFileInput('pdf_ccir', e)} />
                  )}
                </ImageContainer>
                <p />
                <ImageContainer>
                  {existingFiles.pdf_federal_debt_certificate ? (
                    <>
                      <img
                        src={uploadedFile}
                        style={{ width: '60px', marginBottom: '16px' }}
                        alt="uploaded file"
                      />
                      <label>Certidão de Regularidade da Dívida Federal</label>
                      <button
                        style={{ margin: '16px' }}
                        onClick={() => resetFileState('pdf_federal_debt_certificate')}
                      >
                        Escolher outro arquivo
                      </button>
                    </>
                  ) : (
                    <>
                      <img
                        src={addFile}
                        alt="emptyFile"
                        style={{ width: '50px', marginBottom: '16px' }}
                      />
                      <label>Anexar Certidão de Regularidade da Dívida Federal</label>
                    </>
                  )}
                  <p />
                  {!existingFiles.pdf_federal_debt_certificate && (
                    <StyledFileInput
                      type="file"
                      onChange={(e) => handleFileInput('pdf_federal_debt_certificate', e)}
                    />
                  )}
                </ImageContainer>
                <p />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                ></div>
              </>
            </Column>
          </InnerContainer>
          <InnerContainer style={{ marginTop: '16px' }}>
            <Button onClick={() => handleUpload('/upload_success')}>Finalizar</Button>
            <ButtonSecondary onClick={() => handleUpload('/upload_canceled')}>Salvar e continuar mais tarde</ButtonSecondary>
          </InnerContainer>
        </Container>
      )}
    </>
  );
  
};

export default RegisterProjectFileUploadWebOpen;

