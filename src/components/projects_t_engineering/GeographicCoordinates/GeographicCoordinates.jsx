import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from '../styles';
import Swal from 'sweetalert2';
import { currentUrl } from '../../../constants/global';
import { useNavigate } from 'react-router-dom';
import Search from './Search';
import CloseButton from './CloseButton';


const GeographicCoordinatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  -moz-box-pack: center;
  justify-content: center;
  width: 60vw;
  --margin-left: 230px;
  text-align: left;
  --margin-top: 100px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  /* Outros estilos de label, como cor ou tamanho de fonte, podem ser adicionados aqui */
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
  outline: none;
  width: 250px;

  &:focus {
    border-color: #007bff;
  }
`;

const GeographicCoordinates = ({ project_id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const descricao1Ref = useRef(null);

  useEffect(() => {
    if (selectedItem) {
      setId(selectedItem.id);
      setDescricao(selectedItem.descricao);
      setLatitude(selectedItem.latitude);
      setLongitude(selectedItem.longitude);
    }
  }, [selectedItem]);

  const handleSalvarClick = async () => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('descricao', descricao);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      formData.append('project', parseInt(project_id));

      const token = sessionStorage.getItem('Authorization');
      const headers = { Authorization: `Bearer ${token}` };

      // Verifique se o ID está preenchido
      if (id === '') {
        // Se o ID estiver vazio, faça uma chamada de inserção
        const response = await axios.post(`${currentUrl}/api/geographic_coordinates/insert`, formData, { headers });
        console.log('Inserido com sucesso! Resposta da API:', response.data);
      } else {
        // Se o ID estiver preenchido, faça uma chamada de atualização
        const response = await axios.put(`${currentUrl}/api/geographic_coordinates/update/${id}/`, formData, { headers });
        console.log('Atualizado com sucesso! Resposta da API:', response.data);
      }

      //limpar
      setId('');
      setDescricao('');
      setLatitude('');
      setLongitude('');
      descricao1Ref.current.focus();      

      Swal.fire({
        title: 'Sucesso!',
        text: 'Seus dados foram salvos com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
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

  const handleNovoClick = () => {
    setId('');
    setDescricao('');
    setLatitude('');
    setLongitude('');
    descricao1Ref.current.focus();
  };

  const handlePesquisarClick = () => {
    setIsSearching(!isSearching);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    descricao1Ref.current.focus(); 
  };  

  const PreencheItem = (item) => {
    setSelectedItem(item);
    console.log("coordenadas geográficas : " + selectedItem);
  };

  return (
    <div style={{ position: 'absolute', width: '722px', top: '65px', left: '350px' }}>
      <GeographicCoordinatesContainer>
        <h2>Coordenada Geográfica</h2>
        <div>
          <Label htmlFor="descricao">Descrição</Label>
          <Input
            style={{ width: '335px' }}
            type="text"
            id="descricao"
            name="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            ref={descricao1Ref}
          />
        </div>      
        <div>
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            style={{ width: '335px' }}
            type="text"
            id="latitude"
            name="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            style={{ width: '335px' }}
            type="text"
            id="longitude"
            name="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>
        <ButtonContainer>
          <Button style={{width: '110px'}} onClick={handleSalvarClick}>Salvar</Button>
          <Button style={{width: '110px'}} onClick={handleNovoClick}>Novo</Button>
          <Button style={{width: '110px'}} onClick={handlePesquisarClick}>Pesquisar</Button>
        </ButtonContainer>  

        {isModalOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                background: '#fff',
                padding: '20px',
                borderRadius: '5px',
              }}
            >
              <div>
                <CloseButton closeModal={closeModal} /> 
              </div>            
              <div>
                <Search onCloseModal={closeModal} PreencheItem={PreencheItem} />
              </div>
            </div>
          </div>
        )}      
      </GeographicCoordinatesContainer>
    </div>
  );
};

export default GeographicCoordinates;
