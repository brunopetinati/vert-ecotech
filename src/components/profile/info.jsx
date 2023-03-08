import Modal from "../default_modal";
import { Container, InnerContainer, Column, Label, Input, Button, ButtonDisplay} from './styles'

const Info = ({ isOpen, onClose, children }) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} children={children}>
      <Container>
      <h3>Meu Perfil</h3>
      <InnerContainer>
        <Column>  
          <Label for="rg">RG:</Label>
          <Input type="text" id="rg" name="rg" />
          <Label for="cpg">CPF:</Label>
          <Input type="text" id="cpg" name="cpg" />          
        </Column>
        <Column>            
          <Label for="cnpj">CNPJ:</Label>
          <Input type="text" id="cnpj" name="cnpj" />
        </Column>
      </InnerContainer>
      <ButtonDisplay>
        <Button>Adicionar Informações</Button>
      </ButtonDisplay>
    </Container>
  </Modal>
  )
};

export default Info;