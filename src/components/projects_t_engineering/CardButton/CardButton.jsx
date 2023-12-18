import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { currentUrl } from '../../../../src/constants/global';

const Card = styled.div`
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  --padding: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  cursor: pointer;
  width: 90px;
  height: 90px;
  float: left;
  transition: border-color 0.3s, background-color 0.3s, opacity 0.3s;
  opacity: ${props => (props.isSelected ? '1' : '0.3')};
  border: ${props => (props.isSelected ? '5px solid White' : '5px solid transparent')}; /* Adiciona uma borda amarela quando isSelected é verdadeiro */

  img {
    width: 90px;
    height: 90px;
  }

  &:hover {
    border-color: green;
    background-color: lightblue;
  }

  &::before {
    content: "";
    position: absolute;
    width: 90px;
    height: 90px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const CardButton = ({ image, project_id, card_name }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrlSelect = `${currentUrl}/api/cards/select-card`;
  const apiUrlInsert = `${currentUrl}/api/cards/insert`;
  const apiUrlDelete = `${currentUrl}/api/cards/delete2`;

  useEffect(() => {
    const fetchSelectedState = async () => {
      try {
        const token = sessionStorage.getItem('Authorization');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.post(`${apiUrlSelect}/${project_id}/${card_name}`, {}, { headers });

        //console.log(response.data['selected_card_id']);

        if (response.data['selected_card_id'] > 0) {
          setIsSelected(true);
        } else {
          setIsSelected(false);
        }
      } catch (error) {
        console.error('Erro na chamada da API:', error);

        Swal.fire({
          title: 'Erro!',
          text: 'Algo deu errado. Por favor, contate nosso suporte! suporte@vertecotech.com',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSelectedState();
  }, [project_id, card_name]);

  const handleButtonClick = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('project', project_id);
    formData.append('card_name', card_name);

    try {
      const token = sessionStorage.getItem('Authorization');
      const headers = { Authorization: `Bearer ${token}` };

      if (!isSelected) {
        const response = await axios.post(apiUrlInsert, formData, { headers });
        //console.log('Resposta da API:', response.data);
        setIsSelected(true);
      } else {
        const response = await axios.delete(`${apiUrlDelete}/${project_id}/${card_name}`, { headers });
        //console.log('Resposta da API:', response.data);
        setIsSelected(false);
      }
    } catch (error) {
      console.error('Erro na chamada da API:', error);

      Swal.fire({
        title: 'Erro!',
        text: 'Algo deu errado. Por favor, contate nosso suporte! suporte@vertecotech.com',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      onClick={handleButtonClick}
      isSelected={isSelected}
    >
      <img id={card_name} src={image} alt="Imagem" />
    </Card>
  );
};

export default CardButton;
