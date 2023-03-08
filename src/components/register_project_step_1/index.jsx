import { useDispatch, useSelector } from "react-redux";
import { Container, InnerContainer, ButtonContainer, Column, Label, Input, Button, Span } from './styles'
import { useNavigate } from 'react-router-dom';
import { appStatus } from '../../store/modules/app_status/actions';
import React, { useState } from 'react';
import axios from 'axios';
import DefaultButton from '../default_button/index'

const RegisterProjectStep1 = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/welcome')
  };

  const handleRegister = (event) => {
    handleSubmit(event);
    dispatch(appStatus('register_land_continue'))
  };

  const [totalArea, setTotalArea] = useState('');
  const [totalReserveArea, setTotalReserveArea] = useState('');
  const [address, setAddress] = useState('');



  const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('http://localhost:8000/api/projects/', {
          totalArea,
          totalReserveArea,
          address
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
        return
    }
  };

  return (
    <Container>
      <h3>Informações Cadastrais</h3>
      <InnerContainer onSubmit={handleRegister}>
        <Column>
          <Label>Tipo de pessoa</Label>         
          <Span>Jurídica || Tipo de pessoa</Span>
          <p />          
          <Label>Nome do proprietário da área:</Label>
          <Input  type="text" />
          <Label>Telefone Whatsapp do proprietário:</Label>
          <Input type="text" 
             mask={"(99) 99999-9999"}
             maskPlaceholder="(99) 99999-9999"
             alwaysShowMask={false}
             placeholder="Ex: (99) 99999-9999"
           ></Input>  
          <Label>E-mail do proprietário:</Label>
          <Input  type="text" placeholder="Ex: usuario@email.com"/>        
        </Column>
        <Column>
          <Label>Cadastro realizado em</Label>         
          <Span>23-09-2022</Span>
          <p />
          <Label>Área total da propriedade (ha)?</Label>
          <Input
            type="text"
            placeholder="Em hectares(ha)"
            value={totalArea}
            onChange={(event) => setTotalArea(event.target.value)}
          />
          <Label>Área total da reserva legal (ha)?</Label>
          <Input
            type="text"
            placeholder="Em hectares(ha)"
            value={totalReserveArea}
            onChange={(event) => setTotalReserveArea(event.target.value)}
          />
          <Label>Qual o endereço da propriedade?</Label>
            <Input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />        
        </Column>
      </InnerContainer>
      <ButtonContainer>
        <Button onClick={() => handleClick()}>Voltar</Button>
        <Button onClick={() => handleRegister()}>Confirmar</Button>
      </ButtonContainer>
    </Container>
  )
};

export default RegisterProjectStep1;