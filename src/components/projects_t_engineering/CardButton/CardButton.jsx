import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { currentUrl } from '../../../../src/constants/global';
import {Card} from './styles';



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
