import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';
import { Container, InnerContainer, Column, Button, ListItem, ListItemText, ListItemTextResposta, ButtonContainer, Span, DownloadButton } from '../styles';
import { returnYesorNoforBoolean, returnUserName, formatSICARCode } from "../../../constants/functions";
import { currentUrl } from '../../../constants/global';
import { convertPhone, transformNumbersToHectares, formatCPF, formatCEP } from "../../../constants/functions";
import PasswordModal from "../../../components/projects_t_consolidation/password_modal";

const Intel = ({user, project}) => {


  const users = useSelector((state) => state.app_data.users);
  const [password, setPassword] = useState('');
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  let projectOwner = currentUser.id;

  if (currentUser.user_type !== "Regular") {
    projectOwner = users.find(user => user.id === project.owner);
  }

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const downloadPDF = (fileField) => {

    const token = sessionStorage.getItem('Authorization');
    const headers = { Authorization: `Bearer ${token}` };

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

const addressParts = [];

if (projectOwner.street) {
  addressParts.push('Rua ' + projectOwner.street);
}

if (projectOwner.number) {
  addressParts.push(projectOwner.number);
}

if (projectOwner.complement) {
  addressParts.push('Complemento ' + projectOwner.complement);
}

if (projectOwner.district) {
  addressParts.push(projectOwner.district);
}

if (projectOwner.city) {
  addressParts.push(projectOwner.city);
}

if (projectOwner.state) {
  addressParts.push(projectOwner.state);
}

if (projectOwner.cep) {
  addressParts.push('CEP: ' + formatCEP(projectOwner.cep));
}

const addressString = addressParts.join(', ');

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{ float: 'left', marginTop: '0px', marginLeft: '-100px' }}
          >

      <div style={{ marginLeft: '218px', marginTop: '-10px' }}>
        <h2>Informações</h2>
      </div>

      <Container>
        {user.user_type === "ADM" && 
            <div>
              <ListItem style={{ backgroundColor: 'lightgrey' }}>
                  <div style={{ marginLeft: '20px' }}>
                    <span style={{ fontWeight: 'bold', color: '#363636', fontSize: '12pt' }}>
                      { projectOwner.full_name }
                    </span>
                  </div>
              </ListItem>

              <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
                <ListItemText>Contato</ListItemText>
              </ListItem>

              <ListItem>
                <ListItemTextResposta>Telefone: {convertPhone(projectOwner.phone)}</ListItemTextResposta>
              </ListItem>
              
              <ListItem>
                <ListItemTextResposta>Email: {projectOwner.email || '-'}</ListItemTextResposta>
              </ListItem>

              <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
                <ListItemText>Endereço</ListItemText>
              </ListItem>     

              <ListItem>
                <ListItemTextResposta>{addressString}</ListItemTextResposta>
              </ListItem>   

              <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
                <ListItemText>Informações de Banco</ListItemText>
              </ListItem>

              <ListItem>
                <ListItemTextResposta>Não possui</ListItemTextResposta>
              </ListItem>     

            </div>
          }        

          <ListItem style={{ backgroundColor: 'lightgrey', marginTop: '20px' }}>
              <div style={{ marginLeft: '20px' }}>
                <span style={{ fontWeight: 'bold', color: '#363636', fontSize: '12pt' }}>
                { project.title === 'default' ? 'Sem Título' : project.title }
                </span>
              </div>
          </ListItem>

          <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
            <ListItemText>Proprietário da área</ListItemText>
          </ListItem>        

          <ListItem>
            <ListItemTextResposta>
            { currentUser.user_type === "ADM"
              ? returnUserName(project.owner, users) || '-'
              : currentUser.full_name }             
            </ListItemTextResposta>
          </ListItem>     

          <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
            <ListItemText style={{ color: 'black' }}>
              A propriedade está sob domínio de uma pessoa física ou jurídica?
            </ListItemText>
          </ListItem>  

          <ListItem>
            <ListItemTextResposta>{project.physical_or_legal_entity || '-'}</ListItemTextResposta>
          </ListItem>    

          <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
            <ListItemText>
              CNPJ ou CPF do proprietário
            </ListItemText>
          </ListItem>        

          <ListItem>
            <ListItemTextResposta>{formatCPF(project.cnpj) || '-'}</ListItemTextResposta>
          </ListItem>    

          <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
            <ListItemText>
              Qual o endereço da propriedade?
            </ListItemText>
          </ListItem>     

          <ListItem>
            <ListItemTextResposta>{project.address || '-'}</ListItemTextResposta>
          </ListItem>         

          <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
            <ListItemText>
              Status da Matrícula
            </ListItemText>
          </ListItem>     

          <ListItem>
            <ListItemTextResposta>{project.matricula_status || '-'}</ListItemTextResposta>
          </ListItem>

          <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
            <ListItemText>
              Possui déficit de reserva legal?
            </ListItemText>
          </ListItem>     

          <ListItem>
            <ListItemTextResposta>{returnYesorNoforBoolean(project.legal_reserve_deficit) || '-'}</ListItemTextResposta>
          </ListItem>    

          <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
            <ListItemText>
              Possui dívida federal pelo não pagamento de tributos?
            </ListItemText>
          </ListItem>     

          <ListItem>
            <ListItemTextResposta>{returnYesorNoforBoolean(project.has_federal_debt) || '-'}</ListItemTextResposta>
          </ListItem>  

          <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
            <ListItemText>
              Área total da propriedade (ha)?
            </ListItemText>
          </ListItem>     

          <ListItem>
            <ListItemTextResposta>{transformNumbersToHectares(project.total_area) || '-'}</ListItemTextResposta>
          </ListItem>

          <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
            <ListItemText>
              Área total da reserva legal (ha)?
            </ListItemText>
          </ListItem>     

          <ListItem>
            <ListItemTextResposta>{transformNumbersToHectares(project.legal_reserve_area) || '-'}</ListItemTextResposta>
          </ListItem>

          <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
            <ListItemText>
              Status do CAR
            </ListItemText>
          </ListItem>     

          <ListItem>
            <ListItemTextResposta>{project.status_car || '-'}</ListItemTextResposta>
          </ListItem>

          <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
            <ListItemText>
              Código SICAR (CAR)
            </ListItemText>
          </ListItem>     

          <ListItem>
            <ListItemTextResposta>{formatSICARCode(project.sicar_code) || '-'}</ListItemTextResposta>
          </ListItem>      

          <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
            <ListItemText>
              Status do georreferenciamento no SIGEF
            </ListItemText>
          </ListItem>     

          <ListItem>
            <ListItemTextResposta>{project.georeferencing_status || '-'}</ListItemTextResposta>
          </ListItem>             

          <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
            <ListItemText>
              Situação da reserva legal da propriedade:
            </ListItemText>
          </ListItem>     

          <ListItem>
            <ListItemTextResposta>{project.reserve_legal_status || '-'}</ListItemTextResposta>
          </ListItem>        

          <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
            <ListItemText>
              Possui Unidade de Conservação (UC) no imóvel?
            </ListItemText>
          </ListItem>     

          <ListItem>
            <ListItemTextResposta>{project.conservation_unit || '-'}</ListItemTextResposta>
          </ListItem>     

          <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
            <ListItemText>
              Existem ações tomadas pelo proprietário para garantir a preservação das florestas existentes no imóvel?
            </ListItemText>
          </ListItem>   

          <ListItem>
            <ListItemTextResposta>{project.owner_actions_to_preserve_forest || '-'}</ListItemTextResposta>
          </ListItem>                               

          <Column style={{ marginTop: '-36px' }}>
            <ButtonContainer>
              <div style={{ marginLeft: '50px', marginTop: '-50px' }}>
                {/*}
                {<Button onClick={() => downloadPDF('pdf_matricula_certificate')}>Certificado de Matrícula</Button>}
                {<Button onClick={() => downloadPDF('pdf_car')}>PDF CAR</Button>}
                {<Button onClick={() => downloadPDF('pdf_ccir')}>PDF CCIR</Button>}
                {<Button onClick={() => downloadPDF('property_polygon')}>Polígono da Propridade</Button>}
                {<Button onClick={() => downloadPDF('pdf_federal_debt_certificate')}>Certificado Dívida Federal</Button>}
                {*/}
              </div>
            </ButtonContainer>                  
          </Column>
          {isPasswordModalOpen && (
          <PasswordModal onConfirm={(password) => {
            setPassword(password);
            closePasswordModal();
          }} />
        )}
      </Container>
    </motion.div>
  )
};

export default Intel;