import { Container, InnerContainer, ButtonContainer, Column, Button } from './styles'
import FileUploader from "../register_project_file_uploader";
import { useNavigate } from "react-router-dom";

const RegisterProjectFileUpload = () => {

  const navigate = useNavigate();
  const handleRegister = () => {
    navigate('/welcome');
  };

  return (
    <Container>
      <h2>Informações Cadastrais</h2>
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

export default RegisterProjectFileUpload;