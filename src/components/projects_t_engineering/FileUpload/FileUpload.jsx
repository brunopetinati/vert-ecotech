import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { currentUrl } from '../../../../src/constants/global';
import { FileInput, ListItem, List2, Button } from '../../projects_t_engineering/styles';
import FileUploadComponent from './FileUploadComponent';


const styles = {
  formContainer: {
    position: 'absolute', 
    width: '722px', 
    top: '65px', 
    left: '350px'
  },
  label: {
    display: 'block',
    marginTop: '10px',
  },
  input: {
    width: '450px',
    padding: '5px',
  },
  fileInput: {
    marginTop: '10px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 15px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

const labelStyle = {
  maxWidth: '100px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

const FileUpload = ({ project_id, matchObjectId }) => {
  const [fileStates, setFileStates] = useState({ 
    pdd_pdf_File: null, 
    pdd_draft_File: null, 
    pre_analise_viabilidade_File: null, 
    viability_analysis_File: null, 
    registration_wilder_File: null, 
    due_diligence_File: null, 
    imagens_de_satelite_File: null, 
    licenciamento_ambiental_File: null, 
    autorizacoes_File: null, 
    debitos_ambientais_File: null, 
    projetos_amb_soc_eco_File: null, 
    relacionamento_stakeholders_File: null, 
    relatorio_de_monitoramento_File: null, 
    arquivo_do_drone_File: null, 
    relatorio_de_validacao_File: null, 
    relatorio_de_verificacao_File: null, 
    relatorio_conjunto_File: null, 
    representacao_de_registro_File: null, 
    rep_varios_registros_File: null, 
    representacao_conversao_File: null, 
    representacao_de_emissao_File: null, 
    rep_varias_emissoes_File: null, 
    representacao_de_validacao_File: null, 
    representacao_de_verificacao_File: null, 
    relatorio_de_risco_afoluv: null, 
    representacao_de_eventos_afolu_File: null, 
    relatorio_de_evento_de_perda_File: null, 
    representacao_de_acesso_File: null
  });

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
  
  const renderFileInputOrMessage = (fieldName) => {
    if (fileStates[fieldName]) {
      return <small style={{ color: 'green' }} onClick={() => switchField(fieldName)}>Arquivo consolidado</small>;
    } else {
      return <FileInput id={fieldName} name={fieldName} onChange={(e) => handleFileChange(e, fieldName)} />;
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('Authorization');
    const headers = { Authorization: `Bearer ${token}` };
  
    axios.get(`${currentUrl}/api/engineering/${matchObjectId}/`, { headers })
      .then((response) => {
        setFileStates(prevState => ({
          ...prevState,
          ...response.data,
        }));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [matchObjectId]);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('project', project_id);

    if (fileStates.pdd_pdf_File) {
      formData.append('pdd_pdf', fileStates.pdd_pdf_File);
    }
    if (fileStates.pdd_draft_File) {
      formData.append('pdd_draft', fileStates.pdd_draft_File);
    }
    if (fileStates.pre_analise_viabilidade_File) {
      formData.append('pre_analise_viabilidade', fileStates.pre_analise_viabilidade_File);
    }    
    if (fileStates.viability_analysis_File) {
      formData.append('viability_analysis', fileStates.viability_analysis_File);
    }
    if (fileStates.registration_wilder_File) {
      formData.append('registration_wilder', fileStates.registration_wilder_File);
    }
    if (fileStates.due_diligence_File) {
      formData.append('due_diligence', fileStates.due_diligence_File);
    }
    if (fileStates.imagens_de_satelite_File) {
      formData.append('imagens_de_satelite', fileStates.imagens_de_satelite_File);
    }  
    if (fileStates.licenciamento_ambiental_File) {
      formData.append('licenciamento_ambiental', fileStates.licenciamento_ambiental_File);
    }    
    if (fileStates.autorizacoes_File) {
      formData.append('autorizacoes', fileStates.autorizacoes_File);
    }       
    if (fileStates.debitos_ambientais_File) {
      formData.append('debitos_ambientais', fileStates.debitos_ambientais_File);
    }     
    if (fileStates.projetos_amb_soc_eco_File) {
      formData.append('projetos_amb_soc_eco', fileStates.projetos_amb_soc_eco_File);
    }  
    if (fileStates.relacionamento_stakeholders_File) {
      formData.append('relacionamento_stakeholders', fileStates.relacionamento_stakeholders_File);
    }     
    if (fileStates.relatorio_de_monitoramento_File) {
      formData.append('relatorio_de_monitoramento', fileStates.relatorio_de_monitoramento_File);
    } 
    if (fileStates.arquivo_do_drone_File) {
      formData.append('arquivo_do_drone', fileStates.arquivo_do_drone_File);
    }
    if (fileStates.relatorio_de_validacao_File) {
      formData.append('relatorio_de_validacao', fileStates.relatorio_de_validacao_File);
    }
    if (fileStates.relatorio_de_verificacao_File) {
      formData.append('relatorio_de_verificacao', fileStates.relatorio_de_verificacao_File);
    }
    if (fileStates.relatorio_conjunto_File) {
      formData.append('relatorio_conjunto', fileStates.relatorio_conjunto_File);
    }
    if (fileStates.representacao_de_registro_File) {
      formData.append('representacao_de_registro', fileStates.representacao_de_registro_File);
    }
    if (fileStates.rep_varios_registros_File) {
      formData.append('rep_varios_registros', fileStates.rep_varios_registros_File);
    }
    if (fileStates.representacao_conversao_File) {
      formData.append('representacao_conversao', fileStates.representacao_conversao_File);
    }
    if (fileStates.representacao_de_emissao_File) {
      formData.append('representacao_de_emissao', fileStates.representacao_de_emissao_File);
    }
    if (fileStates.rep_varias_emissoes_File) {
      formData.append('rep_varias_emissoes', fileStates.rep_varias_emissoes_File);
    }
    if (fileStates.representacao_de_validacao_File) {
      formData.append('representacao_de_validacao', fileStates.representacao_de_validacao_File);
    }
    if (fileStates.representacao_de_verificacao_File) {
      formData.append('representacao_de_verificacao', fileStates.representacao_de_verificacao_File);
    }
    if (fileStates.relatorio_de_risco_afolu_File) {
      formData.append('relatorio_de_risco_afolu', fileStates.relatorio_de_risco_afolu_File);
    }
    if (fileStates.representacao_de_eventos_afolu_File) {
      formData.append('representacao_de_eventos_afolu', fileStates.representacao_de_eventos_afolu_File);
    }
    if (fileStates.relatorio_de_evento_de_perda_File) {
      formData.append('relatorio_de_evento_de_perda', fileStates.relatorio_de_evento_de_perda_File);
    }
    if (fileStates.representacao_de_acesso_File) {
      formData.append('representacao_de_acesso', fileStates.representacao_de_acesso_File);
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

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };  

  const data = [
    { label: 'PDD', fileName: 'pdd_pdf_File' },
    { label: 'PDD Draft', fileName: 'pdd_draft_File' },
    { label: 'Pre-Análise de viabilidade', fileName: 'pre_analise_viabilidade_File' },
    { label: 'Análise de viabilidade / PIN', fileName: 'viability_analysis_File' },
    { label: 'Registration Wilder', fileName: 'registration_wilder_File' },
    { label: 'Due Diligence / PIN', fileName: 'due_diligence_File' },
    { label: 'Imagens de Satélite', fileName: 'imagens_de_satelite_File' },
    { label: 'Licenciamento Ambiental', fileName: 'licenciamento_ambiental_File' },
    { label: 'Autorizações', fileName: 'autorizacoes_File' },
    { label: 'Débitos Ambientais', fileName: 'debitos_ambientais_File' },
    { label: 'Projetos ambientais, sociais e econômicos', fileName: 'projetos_amb_soc_eco_File' },
    { label: 'Relacionamento com Stakeholders', fileName: 'relacionamento_stakeholders_File' },
    { label: 'Relatório de Monitoramento', fileName: 'relatorio_de_monitoramento_File' },
    { label: 'Arquivo do Drone', fileName: 'arquivo_do_drone_File' },
    { label: 'Relatório de Validação', fileName: 'relatorio_de_validacao_File' },
    { label: 'Relatório de Verificação', fileName: 'relatorio_de_verificacao_File' },
    { label: 'Relatório Conjunto (Validação/Verificação)', fileName: 'relatorio_conjunto_File' },
    { label: 'Representação de Registro (PP Único)', fileName: 'representacao_de_registro_File' },
    { label: 'Representação de Registro (Vários PPs)', fileName: 'rep_varios_registros_File' },
    { label: 'Representação de conversão da SCU', fileName: 'representacao_conversao_File' },
    { label: 'Representação de emissão (PP único)', fileName: 'representacao_de_emissao_File' },
    { label: 'Representação de emissão (múltiplos PPs)', fileName: 'rep_varias_emissoes_File' },
    { label: 'Representação de validação', fileName: 'representacao_de_validacao_File' },
    { label: 'Representação de verificação', fileName: 'representacao_de_verificacao_File' },
    { label: 'Tabela de cálculo de risco de não permanência (AFOLU)', fileName: 'relatorio_de_risco_afolu_File' },
    { label: 'Representação de eventos de perda (AFOLU)', fileName: 'representacao_de_eventos_afolu_File' },
    { label: 'Relatório de evento de perda', fileName: 'relatorio_de_evento_de_perda_File' },
    { label: 'Representação de acesso', fileName: 'representacao_de_acesso_File' },
  ];

  return (
    <div className="uploads-save">
      <div style={styles.formContainer}>

        <h2>Uploads de Arquivos</h2>

        <List2>
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
        </List2>


        {/*}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={{ width: '290px' }}></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.label} className={index % 2 === 0 ? 'green-row' : 'white-row'}>
                <td style={labelStyle}>{item.label}:</td>
                <td>{renderFileInputOrMessage(item.fileName)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {*/}

        <div style={{ paddingBottom: '50px' }}>
          <Button style={{ marginLeft: '50px' }} type="button" onClick={handleUpload}>
            Salvar
          </Button>
        </div>

      </div>
    </div>
  );
};

export default FileUpload;
