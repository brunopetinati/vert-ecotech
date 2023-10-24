import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion } from 'framer-motion';
import { currentUrl } from '../../constants/global';
import Swal from 'sweetalert2';
import { StyledButton } from '../default_button/styles.js';
import { ListItemText } from './styles.js';
import { IconContainer } from './styles.js';
import { Container, List, ListItem } from './styles';
import PasswordModal from './password_modal';


const ProjectTabConsolidation = ({user, project}) => {
  const [fileStatus, setFileStatus] = useState({});

  const token = sessionStorage.getItem('Authorization');
  const headers = { Authorization: `Bearer ${token}` };
  const currentUser = useSelector((state) => state.user.currentUser);
  const engineering = useSelector((state) => state.app_data.engineering);
  const matchObjectd = engineering.find(item => item.project === project.id);

  const [password, setPassword] = useState(null);

  let matchObjectId = null;
  
  if (matchObjectd) {
    matchObjectId = matchObjectd.id;
  };

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  useEffect(() => {
    axios.get(`${currentUrl}/api/engineering/${matchObjectId}/`, { headers })
      .then((response) => {
        setFileStatus(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const getFileStatusIcon = (hasFile) => {
    if (hasFile) {
      return <span style={{ color: 'green' }}>&#10003;</span>; // Green check
    } else {
      return <span style={{ color: 'red' }}>&#x2715;</span>; // Circle with X
    }
  };

  //download engenharia

  const handleEngineeringDownload = (fileField, password) => {

    if (currentUser.user_type === "ADM") {
      axios
      .post(`${currentUrl}/api/environmental-engineering/${project.id}/download/${fileField}/`, { password }, {
        headers,
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileField}.pdf`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Erro ao fazer download do arquivo. Estamos trabalhando para resolver o problema o mais breve possível.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
    } else {

    if (!password) {
      openPasswordModal();
      return;
    }

    axios
      .post(`${currentUrl}/api/environmental-engineering/${project.id}/download/${fileField}/`, { password }, {
        headers,
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileField}.pdf`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to download the file. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
    }
  };

  // download projetos

  const handleDownloadProjectFiles = (fileField, password) => {

    if (currentUser.user_type === "ADM") {
      axios
      .post(`${currentUrl}/api/project/${project.id}/download/${fileField}/`, { password }, {
        headers,
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileField}.pdf`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Erro ao fazer download do arquivo. Estamos trabalhando para resolver o problema o mais breve possível.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
    } else {

    if (!password) {
      openPasswordModal();
      return;
    }

    axios
      .post(`${currentUrl}/api/project/${project.id}/download/${fileField}/`, { password }, {
        headers,
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileField}.pdf`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to download the file. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
    }
  };  

  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
    >
      <Container>
      <div style={{ height: "80vh", overflowY: "auto", width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <List>
          <ListItem style={{marginTop: '1400px', backgroundColor: 'lightgrey' }}>
              <div style={{ marginLeft: '50px', marginTop: '-10px' }}><h4>Descrição</h4></div>
              <div style={{ marginLeft: '115px', marginTop: '-10px' }}><h4>Status</h4></div>
              <div style={{ marginLeft: '120px', marginTop: '-10px' }}><h4>Ação</h4></div>
          </ListItem>          
          <ListItem>
            <ListItemText>Certificado de Matrícula</ListItemText>
            <IconContainer>{getFileStatusIcon(project.pdf_matricula_certificate)}</IconContainer>
            <div>{project.pdf_matricula_certificate && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleDownloadProjectFiles('pdf_matricula_certificate')}>Download</StyledButton>}</div>
          </ListItem>
          <ListItem>
            <ListItemText>C.A.R (SICAR)</ListItemText>
            <IconContainer>{getFileStatusIcon(project.pdf_car)}</IconContainer>
            <div>{project.pdf_car && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleDownloadProjectFiles('pdf_car')}>Download</StyledButton>}</div>
          </ListItem>
          <ListItem>
            <ListItemText>CCIR</ListItemText>
            <IconContainer>{getFileStatusIcon(project.pdf_ccir)}</IconContainer>
            <div>{project.pdf_ccir && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleDownloadProjectFiles('pdf_ccir')}>Download</StyledButton>}</div>
          </ListItem>
          <ListItem>
            <ListItemText>Polígono da propriedade</ListItemText>
            <IconContainer>{getFileStatusIcon(project.property_polygon)}</IconContainer>
            <div>{project.property_polygon && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleDownloadProjectFiles('property_polygon')}>Download</StyledButton>}</div>
          </ListItem>
          <ListItem>
            <ListItemText>Regularização com a Dívida Federal</ListItemText>
            <IconContainer>{getFileStatusIcon(project.pdf_federal_debt_certificate)}</IconContainer>
            <div>{project.pdf_federal_debt_certificate && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleDownloadProjectFiles('pdf_federal_debt_certificate')}>Download</StyledButton>}</div>
          </ListItem>
          <ListItem>
            <ListItemText> PDD PDF</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.pdd_pdf)}</IconContainer>
            <div>{fileStatus.pdd_pdf && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('pdd_pdf')}>Download</StyledButton>}</div>
          </ListItem>
          <ListItem>
            <ListItemText>PDD Draft</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.pdd_draft)}</IconContainer>
            <div>{fileStatus.pdd_draft && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('pdd_draft')}>Download</StyledButton>}</div>
          </ListItem>
          <ListItem>
            <ListItemText>Pre-Análise de Viabilidade</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.pre_analise_viabilidade)}</IconContainer>
            <div>{fileStatus.pre_analise_viabilidade && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('pre_analise_viabilidade')}>Download</StyledButton>}</div>
          </ListItem>        
          <ListItem>
            <ListItemText>Análise de Viabilidade / PIN</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.viability_analysis)}</IconContainer>
            <div>{fileStatus.viability_analysis && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('viability_analysis')}>Download</StyledButton>}</div>
          </ListItem>
          <ListItem>
            <ListItemText>Registration Wilder</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.registration_wilder)}</IconContainer>
            <div>{fileStatus.registration_wilder && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('registration_wilder')}>Download</StyledButton>}</div>
          </ListItem>
          <ListItem>
            <ListItemText>Due Diligence / PIN</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.due_diligence)}</IconContainer>
            <div>{fileStatus.due_diligence && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('due_diligence')}>Download</StyledButton>}</div>
          </ListItem>   
          <ListItem>
            <ListItemText>Due Diligence / Proprietário</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.due_diligence)}</IconContainer>
            <div>{fileStatus.due_diligence && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('due_diligence')}>Download</StyledButton>}</div>
          </ListItem>           
          <ListItem>
            <ListItemText>Imagens de Satélite</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.imagens_de_satelite)}</IconContainer>
            <div>{fileStatus.imagens_de_satelite && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('imagens_de_satelite')}>Download</StyledButton>}</div>
          </ListItem>  
          <ListItem>
            <ListItemText>Licenciamento Ambiental</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.licenciamento_ambiental)}</IconContainer>
            <div>{fileStatus.licenciamento_ambiental && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('licenciamento_ambiental')}>Download</StyledButton>}</div>
          </ListItem>    
          <ListItem>
            <ListItemText>Autorizações</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.autorizacoes)}</IconContainer>
            <div>{fileStatus.autorizacoes && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('autorizacoes')}>Download</StyledButton>}</div>
          </ListItem>   
          <ListItem>
            <ListItemText>Débitos Ambientais</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.debitos_ambientais)}</IconContainer>
            <div>{fileStatus.debitos_ambientais && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('debitos_ambientais')}>Download</StyledButton>}</div>
          </ListItem>  
          <ListItem>
            <ListItemText>Projetos ambientais, sociais, econômicos</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.projetos_amb_soc_eco)}</IconContainer>
            <div>{fileStatus.projetos_amb_soc_eco && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('projetos_amb_soc_eco')}>Download</StyledButton>}</div>
          </ListItem>  
          <ListItem>
            <ListItemText>Relecionamento com Stakeholders</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.relacionamento_stakeholders)}</IconContainer>
            <div>{fileStatus.relacionamento_stakeholders && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('relacionamento_stakeholders')}>Download</StyledButton>}</div>
          </ListItem>   
          <ListItem>
            <ListItemText>Relatório de Monitoramento</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.relatorio_de_monitoramento)}</IconContainer>
            <div>{fileStatus.relatorio_de_monitoramento && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('relatorio_de_monitoramento')}>Download</StyledButton>}</div>
          </ListItem>    
          <ListItem>
            <ListItemText>Arquivo do Drone</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.arquivo_do_drone)}</IconContainer>
            <div>{fileStatus.arquivo_do_drone && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('arquivo_do_drone')}>Download</StyledButton>}</div>
          </ListItem> 
          <ListItem>
            <ListItemText>Relatório de Validação</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.relatorio_de_validacao)}</IconContainer>
            <div>{fileStatus.relatorio_de_validacao && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('relatorio_de_validacao')}>Download</StyledButton>}</div>
          </ListItem>    
          <ListItem>
            <ListItemText>Relatório de Verificação</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.relatorio_de_verificacao)}</IconContainer>
            <div>{fileStatus.relatorio_de_verificacao && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('relatorio_de_verificacao')}>Download</StyledButton>}</div>
          </ListItem>       
          <ListItem>
            <ListItemText>Relatório Conjunto (Validação/Verificação)</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.relatorio_conjunto)}</IconContainer>
            <div>{fileStatus.relatorio_conjunto && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('relatorio_conjunto')}>Download</StyledButton>}</div>
          </ListItem>   
          <ListItem>
            <ListItemText>Representação de Registro (PP Único)</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.representacao_de_registro)}</IconContainer>
            <div>{fileStatus.representacao_de_registro && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('representacao_de_registro')}>Download</StyledButton>}</div>
          </ListItem>  
          <ListItem>
            <ListItemText>Representação de Registro (Vários PPs)</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.rep_varios_registros)}</IconContainer>
            <div>{fileStatus.rep_varios_registros && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('rep_varios_registros')}>Download</StyledButton>}</div>
          </ListItem>    
          <ListItem>
            <ListItemText>Representação de conversão da SCU</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.representacao_conversao)}</IconContainer>
            <div>{fileStatus.representacao_conversao && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('representacao_conversao')}>Download</StyledButton>}</div>
          </ListItem>
          <ListItem>
            <ListItemText>Representação de emissão (PP único)</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.representacao_de_emissao)}</IconContainer>
            <div>{fileStatus.representacao_de_emissao && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('representacao_de_emissao')}>Download</StyledButton>}</div>
          </ListItem> 
          <ListItem>
            <ListItemText>Representação de emissão (múltiplos PPs)</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.rep_varias_emissoes)}</IconContainer>
            <div>{fileStatus.rep_varias_emissoes && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('rep_varias_emissoes')}>Download</StyledButton>}</div>
          </ListItem>    
          <ListItem>
            <ListItemText>Representação de validação</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.representacao_de_validacao)}</IconContainer>
            <div>{fileStatus.representacao_de_validacao && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('representacao_de_validacao')}>Download</StyledButton>}</div>
          </ListItem>   
          <ListItem>
            <ListItemText>Representação de verificação</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.representacao_de_verificacao)}</IconContainer>
            <div>{fileStatus.representacao_de_verificacao && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('representacao_de_verificacao')}>Download</StyledButton>}</div>
          </ListItem>  
          <ListItem>
            <ListItemText>Tabela de cálculo de risco de não permanência</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.relatorio_de_risco_afolu)}</IconContainer>
            <div>{fileStatus.relatorio_de_risco_afolu && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('relatorio_de_risco_afolu')}>Download</StyledButton>}</div>
          </ListItem>
          <ListItem>
            <ListItemText>Representação de eventos de perda</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.representacao_de_eventos_afolu)}</IconContainer>
            <div>{fileStatus.representacao_de_eventos_afolu && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('representacao_de_eventos_afolu')}>Download</StyledButton>}</div>
          </ListItem>
          <ListItem>
            <ListItemText>Relatório de evento de perda</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.relatorio_de_evento_de_perda)}</IconContainer>
            <div>{fileStatus.relatorio_de_evento_de_perda && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('relatorio_de_evento_de_perda')}>Download</StyledButton>}</div>
          </ListItem>        
          <ListItem>
            <ListItemText>Representação de acesso</ListItemText>
            <IconContainer>{getFileStatusIcon(fileStatus.representacao_de_acesso)}</IconContainer>
            <div>{fileStatus.representacao_de_acesso && <StyledButton style={{ width: '200px', height: '30px' }} onClick={() => handleEngineeringDownload('representacao_de_acesso')}>Download</StyledButton>}</div>
          </ListItem>        
        </List>
      </div>
      {isPasswordModalOpen && (
        <PasswordModal onConfirm={(password) => {
          setPassword(password);
          closePasswordModal();
        }} />
      )}
      </Container>
    </motion.div>
  );
};

export default ProjectTabConsolidation;




