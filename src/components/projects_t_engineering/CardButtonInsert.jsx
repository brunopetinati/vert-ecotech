import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from './styles';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { currentUrl } from '../../constants/global';

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
  transition: border-color 0.3s, background-color 0.3s;

  img {
    width: 90px;
    height: 90px;
  }

  &:hover {
    border-color: blue; /* Cor da borda ao passar o mouse */
    background-color: lightblue; /* Cor de fundo ao passar o mouse */
  }

  &::before {
    content: "";
    position: absolute;
    width: 90px;
    height: 90px;
    background: rgba(255, 255, 255, 0.5); /* Cor de fundo com 50% de transparência (vermelho no exemplo) */
    opacity: 0;
    transition: opacity 0.3s; /* Adicione uma transição suave na opacidade */
    pointer-events: none; /* Evite que o elemento ::before seja clicável */
  }

  &:hover::before {
    opacity: 1; /* Mostra o elemento ::before no hover */
  }
`;

const CardButtonInsert = ({ image, project_id, card_name }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Adicionado o estado de isLoading
  const apiUrlSelect = `${currentUrl}/api/cards/select-card`;
  const apiUrlInsert = `${currentUrl}/api/cards/insert`;
  const apiUrlDelete = `${currentUrl}/api/cards/delete2`;

  useEffect(() => {
    const fetchSelectedState = async () => {
      try {
        const token = sessionStorage.getItem('Authorization');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.post(`${apiUrlSelect}/${project_id}/${card_name}`, {}, { headers });

        console.log(response.data['selected_card_id']);

        if (response.data['selected_card_id'] > 0) {          
          setIsSelected(true);
        }
        else 
        {
          setIsSelected(false);
        }
      } catch (error) {
        // Lide com os erros da API aqui
        console.error('Erro na chamada da API:', error);

        Swal.fire({
          title: 'Erro!',
          text: 'Algo deu errado. Por favor, contate nosso suporte! suporte@vertecotech.com',
          icon: 'error',
          confirmButtonText: 'OK',
        });

      } finally {
        setIsLoading(false); // Definir isLoading como falso após a chamada da API
      }
    };

    fetchSelectedState();
  }, [project_id, card_name]);

  const handleButtonClick = async () => {
    if (isLoading) {
      // Se isLoading for verdadeiro, não fazer nada
      return;
    }

    setIsLoading(true); // Definir isLoading como verdadeiro durante a chamada da API

    
    const formData = new FormData();
    formData.append('project', project_id);
    formData.append('card_name', card_name);

    try {
      const token = sessionStorage.getItem('Authorization');
      const headers = { Authorization: `Bearer ${token}` };

      if (!isSelected) {
        const response = await axios.post(apiUrlInsert, formData, { headers });
        console.log('Resposta da API:', response.data);
        setIsSelected(true);
      } else {
        const response = await axios.delete(`${apiUrlDelete}/${project_id}/${card_name}`, { headers });
        console.log('Resposta da API:', response.data);
        setIsSelected(false);
      }
    } catch (error) {
      // Lide com os erros da API aqui
      console.error('Erro na chamada da API:', error);

      Swal.fire({
        title: 'Erro!',
        text: 'Algo deu errado. Por favor, contate nosso suporte! suporte@vertecotech.com',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsLoading(false); // Definir isLoading como falso após a chamada da API
    }

    console.log('project_id: ' + project_id + ' card_name: ' + card_name + ' seleção:' + !isSelected);
  };

  return (
    <Card
      onClick={handleButtonClick}
      style={{
        border: isSelected ? '5px solid #4F4F4F' : '5px solid white',
        backgroundColor: isSelected ? '#4F4F4F' : 'white',
      }}
    >
      <img id={card_name} src={image} alt="Imagem" />
    </Card>
  );
};

export default CardButtonInsert;