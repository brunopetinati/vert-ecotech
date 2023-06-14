import Modal from '../../components/default_modal';
import { Container, InnerContainer, ButtonContainer, Column, Label, Input, Button, Span, ButtonDisplay } from './styles'
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { currentUrl } from '../../constants/global';

const Banco = ({ isOpen, onClose, children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [formData, setFormData] = useState({
    account_type: '',
    bank: '',
    account_number: '',
    agency: '',
    pix_key: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${currentUrl}/api/bankinfo/`, {
        ...formData,
        user: currentUser
      });
      console.log(response.data); // Handle the response as needed
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error(error); // Handle any errors
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} children={children}>
      <Container>
        <InnerContainer onSubmit={handleSubmit}>
            <Column>
              <Label htmlFor="tipo_conta">Tipo de conta:</Label>
              <Input
                type="text"
                id="tipo_conta"
                name="account_type"
                value={formData.account_type}
                onChange={handleInputChange}
              />
              <Label htmlFor="banco">Banco:</Label>
              <Input
                type="text"
                id="banco"
                name="bank"
                value={formData.bank}
                onChange={handleInputChange}
              />
              <Label htmlFor="conta">Conta:</Label>
              <Input
                type="text"
                id="conta"
                name="account_number"
                value={formData.account_number}
                onChange={handleInputChange}
              />
            </Column>
            <Column>
              <Label htmlFor="agencia">Agência:</Label>
              <Input
                type="text"
                id="agencia"
                name="agency"
                value={formData.agency}
                onChange={handleInputChange}
              />
              <Label htmlFor="chave_pix">Chave PIX:</Label>
              <Input
                type="text"
                id="chave_pix"
                name="pix_key"
                value={formData.pix_key}
                onChange={handleInputChange}
              />
            </Column>
        </InnerContainer>
        <ButtonDisplay>
              <Button type="submit">Adicionar Informações</Button>
            </ButtonDisplay>
      </Container>
    </Modal>
  );
};

export default Banco;
