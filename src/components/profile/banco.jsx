import Modal from "../default_modal";
import { Container, InnerContainer, ButtonContainer, Column, Label, Input, Button, Span } from './styles'

const Banco = ({ isOpen, onClose, children }) => {
  return(
    <Modal isOpen={isOpen} onClose={onClose} children={children}>
      <Container>
        <h3>Meu Perfil</h3>
        <InnerContainer>
          <Column> 
            <Label for="tipo_conta">Tipo de conta:</Label>
            <Input type="text" id="tipo_conta" name="tipo_conta"/> 
            <Label for="banco">Banco:</Label>
            <Input type="text" id="banco" name="banco"/>
            <Label for="conta">Conta:</Label>
            <Input type="text" id="conta" name="conta"/>
          </Column>
          <Column>            
            <Label for="agencia">Agência:</Label>
            <Input type="text" id="agencia" name="agencia"/>
            <Label for="chave_pix">Chave PIX:</Label>
            <Input type="text" id="chave_pix" name="chave_pix"/>
          </Column>
        </InnerContainer>
      </Container>
    </Modal>
  )
};

export default Banco;
