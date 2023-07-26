import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { currentUrl } from '../../constants/global';
import { Container, ButtonContainer, Button, InnerContainer, FileInput } from './styles';
import DefaultSecondaryModal from '../../components/default_secondary_modal';
import Swal from 'sweetalert2';


const ProjectTabComercial = ({ user, project }) => {
  const [fileStatus, setFileStatus] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const token = sessionStorage.getItem('Authorization');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios.get(`${currentUrl}/api/proposals/list/`, { headers })
      .then((response) => {
        console.log('response', response)
        setFileStatus(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [project.id]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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

        <InnerContainer>
          {fileStatus && fileStatus.length > 0 ? (
            <div>
              <h3>Existing Proposals(beta):</h3>
              <ul>
                {fileStatus.map((proposal) => (
                  <li key={proposal.id}>
                    <span>{proposal.proposal.name}</span>
                    <a href={`${currentUrl}${proposal.proposal.url}`} download>
                      <Button>Download</Button>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No proposals found.</p>
          )}
        </InnerContainer>

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

