import Modal from "../default_modal";
import { Container, InnerContainer, Row, Label, Input, Button, ButtonDisplay} from './styles'

const Info = ({ isOpen, onClose, children }) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} children={children}>
      <Container>
      <h3>Meu Perfil</h3>
      <InnerContainer>
        <Row>  
          <Label for="rg">RG:</Label>
          <Input type="text" id="rg" name="rg" />
          <Label for="cpg">CPF:</Label>
          <Input type="text" id="cpg" name="cpg" />          
        </Row>
        <Row>            
          <Label for="cnpj">CNPJ:</Label>
          <Input type="text" id="cnpj" name="cnpj" />
        </Row>
      </InnerContainer>
      <ButtonDisplay>
        <Button>Adicionar Informações</Button>
      </ButtonDisplay>
    </Container>
  </Modal>
  )
};

export default Info;