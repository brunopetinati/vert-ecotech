import React, { useState } from 'react';

const FileUploader = () => {

  // Certidão de matrícula
  const [certidaoMatricula, setCertidaoMatricula] = useState(null);

  const handleFileInput = (e) => {
    setCertidaoMatricula(e.target.files[0]);
  };

  const handleUpload = () => {
    console.log(certidaoMatricula);
    // Add code here to upload the selected file
  };

  // PDF CAR
  const [PDFCAR, setPDFCAR] = useState(null);

  const handlePDFCARInput = (e) => {
    setPDFCAR(e.target.files[0]);
  };

  const handleUploadPDFCAR = () => {
    console.log(PDFCAR);
    // Add code here to upload the selected file
  };

  // Polígono da propriedade
  const [poligono, setPoligono] = useState(null);

  const handlepoligonoInput = (e) => {
    setPoligono(e.target.files[0]);
  };

  const handleUploadPoligono = () => {
    console.log(poligono);
    // Add code here to upload the selected file
  };

  // Cópia do CCIR
  const [CCIR, setCCIR] = useState(null);

  const handleCCIRInput = (e) => {
    setCCIR(e.target.files[0]);
  };

  const handleUploadCCIR = () => {
    console.log(CCIR);
    // Add code here to upload the selected file
  };

  // Certidão de Regularidade da Dívida Federal
  const [certidaoRegularidadeDividaFederal, setCertidaoRegularidadeDividaFederal] = useState(null);

  const handleCertidaoRegularidadeDividaFederalnput = (e) => {
    setCertidaoRegularidadeDividaFederal(e.target.files[0]);
  };

  const handleUploadcertidaoRegularidadeDividaFederal = () => {
    console.log(certidaoRegularidadeDividaFederal);
    // Add code here to upload the selected file
  };
  
  return (
    <>
      <div>
        <label>Anexar Certidão de Matrícula</label>
        <p />
        <input type="file" onChange={handleFileInput} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <p />
      <div>
        <label>Anexar PDF do CAR(SICAR)</label>
        <p />
        <input type="file" onChange={handlePDFCARInput} />
        <button onClick={handleUploadPDFCAR}>Upload</button>
      </div>
      <p />
      <div>
        <label>Anexar o Polígono da propriedade</label>
        <small style={{marginLeft: '8px'}}>(Formatos aceitos: *.KMZ ou *.KML)</small>
        <p />
        <input type="file" onChange={handlepoligonoInput} />
        <button onClick={handleUploadPoligono}>Upload</button>
      </div>
      <p />
      <div>
        <label>Anexar cópia do CCIR</label>
        <p />
        <input type="file" onChange={handleCCIRInput} />
        <button onClick={handleUploadCCIR}>Upload</button>
      </div>
      <p />
      <div>
        <label>Anexar Certidão de Regularidade da Dívida Federal</label>
        <p />
        <input type="file" onChange={handleCertidaoRegularidadeDividaFederalnput} />
        <button onClick={handleUploadcertidaoRegularidadeDividaFederal}>Upload</button>
      </div>
    </>
  );
};

export default FileUploader;