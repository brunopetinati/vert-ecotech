import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { currentUrl } from '../../constants/global';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { addProjectToProjects } from '../../store/modules/app_data/actions';


const FileUploader = () => {

  // quando é o próprio usuário registrando o próprio projeto
  // const currentID = useSelector((state) => state.user.currentUser.id);

  const projectID = useSelector((state) => state.app_data.project_id);
  const ownerID = useSelector((state) => state.app_data.owner_id);
  const dispatch = useDispatch();

  const [selectedFiles, setSelectedFiles] = useState({
    pdf_matricula_certificate: null,
    pdf_car: null,
    property_polygon: null,
    pdf_federal_debt_certificate: null,
    pdf_ccir: null,
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
    const url = `http://${currentUrl}:8000/api/projects/${projectID}/update/`;
  
    const formData = new FormData();
    formData.append('pdf_matricula_certificate', selectedFiles.pdf_matricula_certificate);
    formData.append('pdf_car', selectedFiles.pdf_car);
    formData.append('property_polygon', selectedFiles.property_polygon);
    formData.append('pdf_federal_debt_certificate', selectedFiles.pdf_federal_debt_certificate);
    formData.append('pdf_ccir', selectedFiles.pdf_ccir);
  
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
      console.log('Success:', response);
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

  return (
    <>
      <div>
        <label>Anexar Certidão de Matrícula</label>
        <small style={{ marginLeft: '8px' }}>(atualizada em até 180 dias)</small>
        <p />
        <input type="file"  onChange={(e) => handleFileInput('pdf_matricula_certificate', e)} />
      </div>
      <p />
      <div>
        <label>Anexar PDF do CAR (SICAR)</label>
        <p />
        <input type="file" onChange={(e) => handleFileInput('pdf_car', e)} />
      </div>
      <p />
      <div>
        <label>Anexar o Polígono da propriedade</label>
        <small style={{ marginLeft: '8px' }}>
          (Formatos aceitos: *.KMZ ou *.KML)
        </small>
        <p />
        <input type="file" onChange={(e) => handleFileInput('property_polygon', e)} />
      </div>
      <p />
      <div>
        <label>Anexar cópia do CCIR</label>
        <p />
        <input type="file" onChange={(e) => handleFileInput('pdf_ccir', e)} />
      </div>
      <p />
      <div>
        <label>Anexar Certidão de Regularidade da Dívida Federal</label>
        <p />
        <input type="file" onChange={(e) => handleFileInput('pdf_federal_debt_certificate', e)} />
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
