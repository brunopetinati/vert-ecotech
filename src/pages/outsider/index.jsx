import { Container, InnerContainer, ButtonContainer, Column, Button } from './styles'
import FileUploader from "../../components/register_project_file_uploader";
import { useNavigate } from "react-router-dom";

const RegisterProjectFileUploadWebOpen = () => {

  const navigate = useNavigate();
  const handleRegister = () => {
    navigate('/welcome');
  };

  return (
    <Container>
      <h3>Informações Cadastrais</h3>
      <InnerContainer>
        <Column>
          <FileUploader />
        </Column>
      </InnerContainer>
      <ButtonContainer>
        <Button onClick={() => handleRegister()}>Voltar ao painel</Button>
      </ButtonContainer>
    </Container>
  )
};

export default RegisterProjectFileUploadWebOpen;