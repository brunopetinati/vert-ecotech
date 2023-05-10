import Modal from "../default_modal";
import { Container, InnerContainer, ButtonContainer, Column, Label, Input, Button, Span, ButtonDisplay } from './styles'

const ResetPassword = ({ isOpen, onClose, children }) => {
  return(
    <Modal isOpen={isOpen} onClose={onClose} children={children}>
      <Container>
        <InnerContainer>
          <Column> 
            <Label for="tipo_conta">Senha atual:</Label>
            <Input type="text" id="tipo_conta" name="tipo_conta"/> 
          </Column>
          <Column>            
            <Label for="chave_pix">Nova senha:</Label>
            <Input type="text" id="chave_pix" name="chave_pix"/>
          </Column>
        </InnerContainer>
      <ButtonDisplay>
        <Button>Salvar</Button>
      </ButtonDisplay>
      </Container>
    </Modal>
  )
};

export default ResetPassword;
