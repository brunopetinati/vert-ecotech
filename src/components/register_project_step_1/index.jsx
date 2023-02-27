import { Container, InnerContainer, ButtonContainer, Column, Label, Input, Button, Span } from './styles'
import React from 'react';

const RegisterProjectStep1 = () => {
  return (
    <Container>
      <h3>Informações Cadastrais</h3>
      <InnerContainer>
        <Column>
          <Label>Tipo de pessoa</Label>         
          <Span>Jurídica</Span>
          <p />          
          <Label>Área total da propriedade (ha)?</Label>
          <Input  type="text" />
          <Label>Endereço da propriedade</Label>
          <Input  type="text" />
          <Label>Número</Label>
          <Input  type="text" />        
        </Column>
        <Column>
          <Label>Cadastro realizado em</Label>         
          <Span>23-09-2022</Span>
          <p />
          <Label>Área total da reserva legal (ha)?</Label>
          <Input  type="text" />
          <Label>Cidade</Label>
          <Input  type="text" />
          <Label>Complemento</Label>
          <Input  type="text" />          
        </Column>
      </InnerContainer>
      <ButtonContainer>
        <Button>Voltar</Button>
        <Button>Registrar</Button>
      </ButtonContainer>
    </Container>
  )
};

export default RegisterProjectStep1;