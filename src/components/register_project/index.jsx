import { Container, InnerContainer, Column, Label, Input, Button, Span } from './styles'
import React from 'react';
import RegisterProjectStep1 from '../register_project_step_1'
import RegisterProjectStep2 from '../register_project_step_2'


const RegisterProject = () => {
  return (
  <Container>
    <InnerContainer>
      <RegisterProjectStep1 />
    </InnerContainer>
  </Container>
  )
};

export default RegisterProject;