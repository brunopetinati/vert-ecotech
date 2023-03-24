import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const FileUploader = ( ) => {

  const currentID = useSelector((state) => state.current_id.id);

  const [selectedFiles, setSelectedFiles] = useState([]);

  const FileUploader = ( ) => {
    const [selectedFiles, setSelectedFiles] = useState({
      pdf_matricula_certificate: null,
      pdf_car: null,
      property_polygon: null,
      pdf_federal_debt_certificate: null,
      pdf_ccir: null
    });
  
    // ...
  };


  const handleFileInput = (fieldName, e) => {
    setSelectedFiles(prevSelectedFiles => ({
      ...prevSelectedFiles,
      [fieldName]: e.target.files[0]
    }));
  };
  

  const handleUpload = async () => {
    const token = sessionStorage.getItem('Authorization');
    const url = `http://localhost:8000/api/projects/${currentID}/update/`;
  
    const formData = new FormData();
    formData.append('pdf_matricula_certificate', selectedFiles.pdf_matricula_certificate);
    formData.append('pdf_car', selectedFiles.pdf_car);
    formData.append('property_polygon', selectedFiles.property_polygon);
    formData.append('pdf_federal_debt_certificate', selectedFiles.pdf_federal_debt_certificate);
    formData.append('pdf_ccir', selectedFiles.pdf_ccir);
  
    try {
      const response = await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Response:', response.data);
      // Add code to handle the response from the server
    } catch (error) {
      console.error('Error:', error);
      // Add code to handle the error
    }
  };
  

  return (
    <>
      <div>
        <label>Anexar Certidão de Matrícula</label>
        <p />
        <input type="file" onChange={handleFileInput} />
      </div>
      <p />
      <div>
        <label>Anexar PDF do CAR(SICAR)</label>
        <p />
        <input type="file" onChange={handleFileInput} />
      </div>
      <p />
      <div>
        <label>Anexar o Polígono da propriedade</label>
        <small style={{ marginLeft: '8px' }}>
          (Formatos aceitos: *.KMZ ou *.KML)
        </small>
        <p />
        <input type="file" onChange={handleFileInput} />
      </div>
      <p />
      <div>
        <label>Anexar cópia do CCIR</label>
        <p />
        <input type="file" onChange={handleFileInput} />
      </div>
      <p />
      <div>
        <label>Anexar Certidão de Regularidade da Dívida Federal</label>
        <p />
        <input type="file" onChange={handleFileInput} />
      </div>
      <p />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <button style={{ width: '170px' }} onClick={handleUpload}>
          Registrar arquivos
        </button>
      </div>
    </>
  );
};

export default FileUploader;
