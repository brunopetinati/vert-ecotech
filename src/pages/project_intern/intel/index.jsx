import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';
import { Container, InnerContainer, Column, Label, ListItem, ListItemText, ButtonContainer, Span, DownloadButton } from '../styles';
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
          >
      <Container>
        <div style={{ overflowY: "auto", 
          width: '100vw', display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginLeft: '-70px',
          marginTop: '16px',
        }}>
          {user.user_type === "ADM" && 
              <div>
                  
                <ListItem style={{marginTop: '0px', backgroundColor: 'lightgrey' }}>
                    <div style={{ marginLeft: '50px', marginTop: '-10px' }}>
                      <h4>{ projectOwner.full_name }</h4>
                    </div>
                </ListItem>        

                <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
                  <ListItemText style={{ color: 'black' }}>Contato</ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>Telefone: {convertPhone(projectOwner.phone)}</ListItemText>
                </ListItem>
                
                <ListItem>
                  <ListItemText>Email: {projectOwner.email || '-'}</ListItemText>
                </ListItem>

                <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
                  <ListItemText style={{ color: 'black' }}>Endereço</ListItemText>
                </ListItem>     

                <ListItem>
                  <ListItemText>{addressString}</ListItemText>
                </ListItem>   

                <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
                  <ListItemText style={{ color: 'black' }}>Informações de Banco</ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>Não possui</ListItemText>
                </ListItem>               

              </div>
            }          

            <ListItem style={{marginTop: '0px', backgroundColor: 'lightgrey' }}>
                <div style={{ marginLeft: '50px', marginTop: '-10px' }}>
                  <h4>{ project.title === 'default' ? 'Sem Título' : project.title }</h4>
                </div>
            </ListItem>    

            <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
              <ListItemText style={{ color: 'black' }}>Proprietário da área</ListItemText>
            </ListItem>        

            <ListItem>
              <ListItemText>
              { currentUser.user_type === "ADM"
                ? returnUserName(project.owner, users) || '-'
                : currentUser.full_name }             
              </ListItemText>
            </ListItem>     

            <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
              <ListItemText style={{ color: 'black' }}>
                A propriedade está sob domínio de uma pessoa física ou jurídica?
              </ListItemText>
            </ListItem>  

            <ListItem>
              <ListItemText>{project.physical_or_legal_entity || '-'}</ListItemText>
            </ListItem>    

            <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
              <ListItemText style={{ color: 'black' }}>
                CNPJ ou CPF do proprietário
              </ListItemText>
            </ListItem>        

            <ListItem>
              <ListItemText>{formatCPF(project.cnpj) || '-'}</ListItemText>
            </ListItem>    

            <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
              <ListItemText style={{ color: 'black' }}>
                Qual o endereço da propriedade?
              </ListItemText>
            </ListItem>     

            <ListItem>
              <ListItemText>{project.address || '-'}</ListItemText>
            </ListItem>         

            <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
              <ListItemText style={{ color: 'black' }}>
                Status da Matrícula
              </ListItemText>
            </ListItem>     

            <ListItem>
              <ListItemText>{project.matricula_status || '-'}</ListItemText>
            </ListItem>

            <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
              <ListItemText style={{ color: 'black' }}>
                Possui déficit de reserva legal?
              </ListItemText>
            </ListItem>     

            <ListItem>
              <ListItemText>{returnYesorNoforBoolean(project.legal_reserve_deficit) || '-'}</ListItemText>
            </ListItem>    

            <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
              <ListItemText style={{ color: 'black' }}>
                Possui dívida federal pelo não pagamento de tributos?
              </ListItemText>
            </ListItem>     

            <ListItem>
              <ListItemText>{returnYesorNoforBoolean(project.has_federal_debt) || '-'}</ListItemText>
            </ListItem>  

            <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
              <ListItemText style={{ color: 'black' }}>
                Área total da propriedade (ha)?
              </ListItemText>
            </ListItem>     

            <ListItem>
              <ListItemText>{transformNumbersToHectares(project.total_area) || '-'}</ListItemText>
            </ListItem>

            <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
              <ListItemText style={{ color: 'black' }}>
                Área total da reserva legal (ha)?
              </ListItemText>
            </ListItem>     

            <ListItem>
              <ListItemText>{transformNumbersToHectares(project.legal_reserve_area) || '-'}</ListItemText>
            </ListItem>

            <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
              <ListItemText style={{ color: 'black' }}>
                Status do C.A.R
              </ListItemText>
            </ListItem>     

            <ListItem>
              <ListItemText>{project.status_car || '-'}</ListItemText>
            </ListItem>

            <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
              <ListItemText style={{ color: 'black' }}>
                Código SICAR (C.A.R)
              </ListItemText>
            </ListItem>     

            <ListItem>
              <ListItemText>{formatSICARCode(project.sicar_code) || '-'}</ListItemText>
            </ListItem>      

            <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
              <ListItemText style={{ color: 'black' }}>
                Status do georreferenciamento no SIGEF
              </ListItemText>
            </ListItem>     

            <ListItem>
              <ListItemText>{project.georeferencing_status || '-'}</ListItemText>
            </ListItem>             

            <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
              <ListItemText style={{ color: 'black' }}>
                Situação da reserva legal da propriedade:
              </ListItemText>
            </ListItem>     

            <ListItem>
              <ListItemText>{project.reserve_legal_status || '-'}</ListItemText>
            </ListItem>        

            <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
              <ListItemText style={{ color: 'black' }}>
                Possui Unidade de Conservação (UC) no imóvel?
              </ListItemText>
            </ListItem>     

            <ListItem>
              <ListItemText>{project.conservation_unit || '-'}</ListItemText>
            </ListItem>     

            <ListItem style={{ backgroundColor: 'rgb(235,235,235)' }}>
              <ListItemText style={{ color: 'black' }}>
                Existem ações tomadas pelo proprietário para garantir a preservação das florestas existentes no imóvel?
              </ListItemText>
            </ListItem>   

            <ListItem>
              <ListItemText>{project.owner_actions_to_preserve_forest || '-'}</ListItemText>
            </ListItem>                               

            <Column style={{ marginTop: '36px'}}>
              <ButtonContainer>
                {project.pdf_matricula_certificate && <DownloadButton onClick={() => downloadPDF('pdf_matricula_certificate')}>Certificado de Matrícula</DownloadButton>}
                {project.pdf_car && <DownloadButton onClick={() => downloadPDF('pdf_car')}>PDF C.A.R</DownloadButton>}
                {project.pdf_ccir && <DownloadButton onClick={() => downloadPDF('pdf_ccir')}>PDF CCIR</DownloadButton>}
                {project.property_polygon && <DownloadButton onClick={() => downloadPDF('property_polygon')}>Polígono da Propridade</DownloadButton>}
                {project.pdf_federal_debt_certificate && <DownloadButton onClick={() => downloadPDF('pdf_federal_debt_certificate')}>Certificado Dívida Federal</DownloadButton>}
              </ButtonContainer>                  
            </Column>
            {isPasswordModalOpen && (
            <PasswordModal onConfirm={(password) => {
              setPassword(password);
              closePasswordModal();
            }} />
          )}
        </div>
      </Container>
    </motion.div>
  )
};

export default Intel;