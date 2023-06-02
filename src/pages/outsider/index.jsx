import { Container, InnerContainer, ButtonContainer, Column, Button, ButtonSecondary } from './styles'
import FileUploaderWeb from "../../components/register_project_file_uploader_web";
import { useNavigate } from "react-router-dom";

const RegisterProjectFileUploadWebOpen = () => {


  function separateInfo(data) {
    const [constant1, constant2, constant3] = data.split("-vert-");
    return [constant1, constant2, constant3];
  }

  let projectId, credentials, owner = null;
  
  if (window.location.pathname) {
    const info = (window.location.pathname.split('/')[2]);
    [owner, credentials, projectId] = separateInfo(info);
    console.log('dentro do if', projectId, credentials, owner)
  }

  console.log('fora do if', projectId, credentials, owner)

  return (
    <Container>
      <h3>Informações Cadastrais</h3>
      <InnerContainer>
        <Column>
          <FileUploaderWeb projectId={projectId} credentials={credentials} ownerID={owner}/>
        </Column>
      </InnerContainer>
      <InnerContainer style={{marginTop: '16px'}}>
        <Button>Finalizar</Button>
        <ButtonSecondary>Salvar e continuar mais tarde</ButtonSecondary>      
      </InnerContainer>
    </Container>
  )
};

export default RegisterProjectFileUploadWebOpen;