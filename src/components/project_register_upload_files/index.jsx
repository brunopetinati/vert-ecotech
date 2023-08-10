import { Container, InnerContainer, ButtonContainer, Column, Button } from './styles'
import FileUploader from "../project_register_file_uploader";
import { useNavigate } from "react-router-dom";

const RegisterProjectFileUpload = () => {

  return (
    <Container>
      <h2>Informações Cadastrais</h2>
      <span>Faça o upload dos arquivos necessários para identificar as informações do seu projeto.</span><br />
      <span>Anexe todos os documentos para que possamos realizar a análise de viabilidade!</span>
      <InnerContainer>
        <Column>
          <FileUploader />
        </Column>
      </InnerContainer>
    </Container>
  )
};

export default RegisterProjectFileUpload;