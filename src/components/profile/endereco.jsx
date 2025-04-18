import DefaultModal from "../default_modal";
import { Container, InnerContainer, ButtonContainer, Column, Label, Input, Button, Span, ButtonDisplay } from './styles'

const Endereco = ({ isOpen, onClose, children }) => {
  return(
    <DefaultModal isOpen={isOpen} onClose={onClose} children={children}>
      <Container>
        <h2>Meu Perfil</h2>
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
    </DefaultModal>
  )
}

export default Endereco;