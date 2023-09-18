import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { currentUrl } from '../../constants/global';
import {
  Container,
  InnerContainer,
  Column,
  Label,
  Button,
  ButtonContainer,
  FileInput,
} from './styles';

const ProjectTabEngineering = ({ user, project }) => {
  const [fileStates, setFileStates] = useState({
    pddFile: null,
    pddDraftFile: null,
    viabilityFile: null,
    registrationWilderFile: null,
    additionalInformation: '',
    pre_analise_viabilidade_File: null,
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
    relatorio_de_risco_afolu_File: null,
    representacao_de_eventos_afolu_File: null,
    relatorio_de_evento_de_perda_File: null,
    representacao_de_acesso_File: null,
  });

  const engineering = useSelector((state) => state.app_data.engineering);
  const matchObject = engineering.find(item => item.project === project.id);
  let matchObjectId = null;
  
  if (matchObject) {
    matchObjectId = matchObject.id;
  } else {
    console.error('Nenhum objeto encontrado com o project_id correspondente.');
  }

  const handleFileChange = (event, fieldName) => {
    const selectedFile = event.target.files[0];
    setFileStates(prevState => ({
      ...prevState,
      [fieldName]: selectedFile,
    }));
  };

  const handleAdditionalInformationChange = (event) => {
    setFileStates(prevState => ({
      ...prevState,
      additionalInformation: event.target.value,
    }));
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('project', project.id);

    if (fileStates.pddFile) {
      formData.append('pdd_pdf', fileStates.pddFile);
    }
    if (fileStates.pddDraftFile) {
      formData.append('pdd_draft', fileStates.pddDraftFile);
    }
    if (fileStates.pre_analise_viabilidade_File) {
      formData.append('pre_analise_viabilidade', fileStates.pre_analise_viabilidade_File);
    }    
    if (fileStates.viabilityFile) {
      formData.append('viability_analysis', fileStates.viabilityFile);
    }
    if (fileStates.registrationWilderFile) {
      formData.append('registration_wilder', fileStates.registrationWilderFile);
    }
    if (fileStates.additionalInformation) {
      formData.append('additional_information', fileStates.additionalInformation);
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
  }, []);

  const switchField = (fieldName) => {
    setFileStates(prevState => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };

  const renderFileInputOrMessage = (fieldName) => {
    if (fileStates[fieldName]) {
      return <small style={{ color: 'green' }} onClick={() => switchField(fieldName)}>Arquivo consolidado</small>;
    } else {
      return <FileInput id={fieldName} name={fieldName} onChange={(e) => handleFileChange(e, fieldName)} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {user.user_type === 'ADM' ? (
        <Container>
          {user.user_type === 'ADM' && project.status !== null ? (
            <>
              <ButtonContainer>
                <Button onClick={handleUpload}>Enviar Arquivos</Button>
              </ButtonContainer>
              <InnerContainer>
                <h2>{project.title === 'default' ? 'Sem Título' : project.title}</h2>
                <small>Status: {project.status}</small>
                <Column>
                  <Label htmlFor="pdd_pdf">PDD:</Label>
                  {renderFileInputOrMessage('pddFile')}
                </Column>
                <Column>
                  <Label htmlFor="pdd_draft">PDD Rascunho:</Label>
                  {renderFileInputOrMessage('pddDraftFile')}
                </Column>
                <Column>
                  <Label htmlFor="pre_analise_viabilidade">Pre-Análise de viabilidade:</Label>
                  {renderFileInputOrMessage('pre_analise_viabilidade_File')}                  
                </Column>
                <Column>
                  <Label htmlFor="viability_analisys">Análise de viabilidade / PIN:</Label>
                  {renderFileInputOrMessage('viabilityFile')}
                </Column>
                <Column>
                  <Label htmlFor="registration_wilder">Registration Wilder:</Label>
                  {renderFileInputOrMessage('registrationWilderFile')}
                </Column>             
                <Column>
                  <Label htmlFor="additional_information">Informações adicionais:</Label>
                  <textarea
                    id="additional_information"
                    name="additional_information"
                    value={fileStates.additionalInformation}
                    onChange={handleAdditionalInformationChange}
                  />
                </Column>
                <Column>
                  <Label htmlFor="due_diligence">Due Diligence:</Label>
                  {renderFileInputOrMessage('due_diligence_File')}
                </Column>                   
                <Column>
                  <Label htmlFor="imagens_de_satelite">Imagens de Satélite:</Label>
                  {renderFileInputOrMessage('imagens_de_satelite_File')}
                </Column>      
                <Column>
                  <Label htmlFor="licenciamento_ambiental">Licenciamento Ambiental:</Label>
                  {renderFileInputOrMessage('licenciamento_ambiental_File')}
                </Column>   
                <Column>
                  <Label htmlFor="autorizacoes">Autorizações:</Label>
                  {renderFileInputOrMessage('autorizacoes_File')}
                </Column>  
                <Column>
                  <Label htmlFor="debitos_ambientais">Débitos Ambientais:</Label>
                  {renderFileInputOrMessage('debitos_ambientais_File')}
                </Column>  
                <Column>
                  <Label htmlFor="projetos_amb_soc_eco">Projetos ambientais, sociais e econômicos:</Label>
                  {renderFileInputOrMessage('projetos_amb_soc_eco_File')}
                </Column>  
                <Column>
                  <Label htmlFor="relacionamento_stakeholders">Relacionamento com Stakeholders:</Label>
                  {renderFileInputOrMessage('relacionamento_stakeholders_File')}
                </Column>  
                <Column>
                  <Label htmlFor="relatorio_de_monitoramento">Relatório de Monitoramento:</Label>
                  {renderFileInputOrMessage('relatorio_de_monitoramento_File')}
                </Column>   
                <Column>
                  <Label htmlFor="arquivo_do_drone">Arquivo do Drone:</Label>
                  {renderFileInputOrMessage('arquivo_do_drone_File')}
                </Column> 
                <Column>
                  <Label htmlFor="relatorio_de_validacao">Relatório de Validação:</Label>
                  {renderFileInputOrMessage('relatorio_de_validacao_File')}
                </Column>    
                <Column>
                  <Label htmlFor="relatorio_de_verificacao">Relatório de Verificação:</Label>
                  {renderFileInputOrMessage('relatorio_de_verificacao_File')}
                </Column>
                <Column>
                  <Label htmlFor="relatorio_conjunto">Relatório Conjunto (Validação/Verificação):</Label>
                  {renderFileInputOrMessage('relatorio_conjunto_File')}
                </Column>    
                <Column>
                  <Label htmlFor="representacao_de_registro">Representação de Registro (PP Único):</Label>
                  {renderFileInputOrMessage('representacao_de_registro_File')}
                </Column>  
                <Column>
                  <Label htmlFor="rep_varios_registros">Representação de Registro (Vários PPs):</Label>
                  {renderFileInputOrMessage('rep_varios_registros_File')}
                </Column>
                <Column>
                  <Label htmlFor="representacao_conversao">Representação de conversão da SCU:</Label>
                  {renderFileInputOrMessage('representacao_conversao_File')}
                </Column>
                <Column>
                  <Label htmlFor="representacao_de_emissao">Representação de emissão (PP único):</Label>
                  {renderFileInputOrMessage('representacao_de_emissao_File')}
                </Column>      
                <Column>
                  <Label htmlFor="rep_varias_emissoes">Representação de emissão (múltiplos PPs):</Label>
                  {renderFileInputOrMessage('rep_varias_emissoes_File')}
                </Column>
                <Column>
                  <Label htmlFor="representacao_de_validacao">Representação de validação:</Label>
                  {renderFileInputOrMessage('representacao_de_validacao_File')}
                </Column>
                <Column>
                  <Label htmlFor="representacao_de_verificacao">Representação de verificação:</Label>
                  {renderFileInputOrMessage('representacao_de_verificacao_File')}
                </Column>
                <Column>
                  <Label htmlFor="relatorio_de_risco_afolu">Tabela de cálculo de risco de não permanência (AFOLU):</Label>
                  {renderFileInputOrMessage('relatorio_de_risco_afolu_File')}
                </Column>
                <Column>
                  <Label htmlFor="representacao_de_eventos_afolu">Representação de eventos de perda (AFOLU):</Label>
                  {renderFileInputOrMessage('representacao_de_eventos_afolu_File')}
                </Column>
                <Column>
                  <Label htmlFor="relatorio_de_evento_de_perda">Relatório de evento de perda:</Label>
                  {renderFileInputOrMessage('relatorio_de_evento_de_perda_File')}
                </Column>
                <Column>
                  <Label htmlFor="representacao_de_acesso">Representação de acesso:</Label>
                  {renderFileInputOrMessage('representacao_de_acesso_File')}
                </Column>
              </InnerContainer>
            </>
          ) : (
            <h1></h1>
          )}
        </Container>
      ) : (
        <h1></h1>
      )}
    </motion.div>
  );
};

export default ProjectTabEngineering;
