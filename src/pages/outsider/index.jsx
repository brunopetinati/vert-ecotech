import { Container, InnerContainer, ButtonContainer, Column, Button } from './styles'
import FileUploaderWeb from "../../components/register_project_file_uploader_web";
import { useNavigate } from "react-router-dom";

const RegisterProjectFileUploadWebOpen = () => {


  function separateInfo(data) {
    const [constant1, constant2, constant3] = data.split("-");
    return [constant1, constant2, constant3];
  }

  let [projectId, credentials, owner] = null;
  
  if (window.location.pathname) {
    const info = (window.location.pathname.split('/')[2]);
    [projectId, credentials, owner] = separateInfo(info);
  }

  return (
    <Container>
      <h3>Informações Cadastrais</h3>
      <InnerContainer>
        <Column>
          <FileUploaderWeb projectId={projectId} credentials={credentials} owner={owner}/>
        </Column>
      </InnerContainer>
      <Button>Finalizar</Button>
      <Button>Salvar e continuar mais tarde</Button>      
    </Container>
  )
};

export default RegisterProjectFileUploadWebOpen;