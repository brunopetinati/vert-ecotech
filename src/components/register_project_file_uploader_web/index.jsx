import React, { useState } from 'react';
import axios from 'axios';
import { currentUrl } from '../../constants/global';
import Swal from 'sweetalert2';
import { Button } from '../../pages/outsider/styles';


const FileUploader = ({ ownerID, credentials, projectId}) => {

  // quando é o próprio usuário registrando o próprio projeto
  // const currentID = useSelector((state) => state.user.currentUser.id);


  
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
        <Button style={{ width: '170px' }} onClick={handleUpload}>
          Registrar arquivos
        </Button>
      </div>
    </>
  );
};

export default FileUploader;
