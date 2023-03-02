import React, { useState } from 'react';

const FileUploader = () => {

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileInput = (e) => {
    setSelectedFiles([...selectedFiles, e.target.files[0]]);
  };

  const handleUpload = () => {
    console.log(selectedFiles);
    // Add code here to upload the selected files
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
        <small style={{marginLeft: '8px'}}>(Formatos aceitos: *.KMZ ou *.KML)</small>
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
      <div style={{display:'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <button style={{width: '170px'}} onClick={handleUpload}>Registrar arquivos</button>
      </div>
    </>
  );
};

export default FileUploader;