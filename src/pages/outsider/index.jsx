import { Container, InnerContainer, ButtonContainer, Column, Button } from './styles'
import FileUploaderWeb from "../../components/register_project_file_uploader_web";
import { useNavigate } from "react-router-dom";

const RegisterProjectFileUploadWebOpen = () => {

  if (window.location.pathname) {
    console.log(window.location.pathname.split('/')[2])
    console.log(window.location.pathname.slice('/'))
  }

  const projectId = 'projectId'
  const credentials = 'credentials'
  const owner = 'owner'

  return (
    <Container>
      <h3>Informações Cadastrais</h3>
      <InnerContainer>
        <Column>
          <FileUploaderWeb projectId={projectId} credentials={credentials} owner={owner}/>
        </Column>
      </InnerContainer>

    </Container>
  )
};

export default RegisterProjectFileUploadWebOpen;