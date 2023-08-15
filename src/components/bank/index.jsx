import DefaultModal from '../../components/default_modal';
import { Container, InnerContainer, ButtonContainer, Column, Label, Input, Button, Span, ButtonDisplay } from './styles'
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { currentUrl } from '../../constants/global';
import Swal from 'sweetalert2';

const Banco = ({ isOpen, onClose, children }) => {


  const currentUser = useSelector((state) => state.user.currentUser);

  const [formData, setFormData] = useState({
    account_type: '',
    bank: '',
    account_number: '',
    agency: '',
    pix_key: '',
    user: currentUser.id
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem('Authorization');
    const headers = { Authorization: `Bearer ${token}`, };

    try {
      const response = await axios.post(`${currentUrl}/api/bankinfo/`, {
        ...formData
      }, { headers });
      Swal.fire({
        title: 'Sucesso!',
        text: 'Dados de banco foram inseridos com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK'
      }); // Handle the response as needed
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error(error); // Handle any errors
      Swal.fire({
        title: 'Erro!',
        text: 'Algo deu errado. Por favor, contate nosso suporte! suporte@vertecotech.com',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <DefaultModal isOpen={isOpen} onClose={onClose} children={children}>
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
          <Button type="submit" onClick={(e) => handleSubmit(e)}>Adicionar Informações</Button>
        </ButtonDisplay>
      </Container>
    </DefaultModal>
  );
};

export default Banco;
