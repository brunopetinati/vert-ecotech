import Modal from "../default_modal";
import { Container, InnerContainer, ButtonContainer, Column, Label, Input, Button, Span, ButtonDisplay } from './styles'

const Endereco = ({ isOpen, onClose, children }) => {
  return(
    <Modal isOpen={isOpen} onClose={onClose} children={children}>
      <Container>
        <h3>Meu Perfil</h3>
        <InnerContainer>
          <Column>  
            <Label for="cep">CEP:</Label>
            <Input type="text" id="cep" name="cep" />
            
            <Label for="numero">Número:</Label>
            <Input type="text" id="numero" name="numero" />
            <Label for="bairro">Bairro:</Label>
            <Input type="text" id="bairro" name="bairro" />    
          </Column>
          <Column>        
            <Label for="rua">Rua:</Label>
            <Input type="text" id="rua" name="rua" />    
            <Label for="cidade">Cidade:</Label>
            <Input type="text" id="cidade" name="cidade"/>
            <Label for="uf">UF:</Label>
            <Input type="text" id="uf" name="uf"/>         
          </Column>
        </InnerContainer>
      <ButtonDisplay>
        <Button>Adicionar Endereço</Button>
      </ButtonDisplay>
      </Container>
    </Modal>
  )
}

export default Endereco;