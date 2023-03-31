import { useDispatch, useSelector } from "react-redux";
import { Container, InnerContainer, ButtonContainer, Column, Label, Input, Button, Span } from './styles'
import { appStatus } from '../../store/modules/app_status/actions';
import FileUploader from "../register_project_file_uploader";

const RegisterProjectStep3 = () => {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(appStatus('register_land_continue'))
  };

  const handleRegister = () => {
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
        <Button onClick={() => handleClick()}>Voltar</Button>
        <Button onClick={() => handleRegister()}>Confirmar</Button>
      </ButtonContainer>
    </Container>
  )
};

export default RegisterProjectStep3;