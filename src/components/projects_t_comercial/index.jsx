import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { currentUrl } from '../../constants/global';
import { Container, ButtonContainer, Button, InnerContainer, FileInput, List, ListItem } from './styles';
import DefaultSecondaryModal from '../../components/default_secondary_modal';
import Swal from 'sweetalert2';
import { getProposalStatusInfo } from '../../constants/functions';


const ProjectTabComercial = ({ user, project }) => {
  const [fileStatus, setFileStatus] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = sessionStorage.getItem('Authorization');
  const headers = { Authorization: `Bearer ${token}` };
  const [proposals, setProposals] = useState([]);
  

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    axios.get(`${currentUrl}/api/proposals/list/`, { headers })
      .then((response) => {
        setFileStatus(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [project.id, proposals]);

  const fetchProposals = () => {
    axios.get(`${currentUrl}/api/projects/${project.id}/proposals`, { headers })
      .then((response) => {
        setProposals(response.data); // Update the list of proposals
      })
      .catch((error) => {
        console.error('Error fetching proposals:', error);
      });
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('project', project.id);
    formData.append('proposal', selectedFile);

    axios.post(`${currentUrl}/api/proposals/`, formData, { headers })
      .then((response) => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'File uploaded successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        setIsModalOpen(false);
        fetchProposals(); // Fetch updated proposals after successful upload
        
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to download the file. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  const handleDownload = (proposalID) => {
    const downloadUrl = `${currentUrl}/api/proposal/${proposalID}/download/`;

    const token = sessionStorage.getItem('Authorization');
    const headers = { Authorization: `Bearer ${token}` };
    let password;

    axios.post(downloadUrl, { password }, { headers, responseType: 'blob' })
      .then(response => {
        // Criar um link temporário para download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `vert-ecotech-proposta-${proposalID}-.pdf`); // Nome do arquivo a ser baixado
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Erro ao baixar o arquivo:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to download the file. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Container>
        <ButtonContainer>
          <Button onClick={() => setIsModalOpen(true)}>Adicionar Proposta</Button>
        </ButtonContainer>

        <div style={{ height: "80vh", overflowY: "auto", width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
          {fileStatus && fileStatus.length > 0 ? (
            <div>
              <List>
                {fileStatus.map((proposal) => (
                  <ListItem key={proposal.id}>
                    <ul>{project.title}</ul>
                    <span style={{ color: '#8bc34a' }}>Proposta Comercial</span>
                      <Button onClick={() => handleDownload(proposal.id)}>Download</Button>
                    <div style={{ color: getProposalStatusInfo(proposal.acceptance).color }}>
                      {getProposalStatusInfo(proposal.acceptance).text}
                    </div>
                  </ListItem>
                ))}
              </List>
            </div>
          ) : (
            <p style={{marginBottom: '160px'}}>Não há propostas para esse projeto.</p>
          )}
        </div>

        {isModalOpen && (
          <DefaultSecondaryModal isOpen={isModalOpen} onClose={setIsModalOpen}>
            <FileInput type="file" onChange={handleFileChange} />
            <Button onClick={handleUpload}>Enviar Proposta</Button>
            <Button onClick={() => setIsModalOpen(false)}>Fechar</Button>
          </DefaultSecondaryModal>
        )}
      </Container>
    </motion.div>
  )
};

export default ProjectTabComercial;

