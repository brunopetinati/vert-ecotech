import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {StyledButtonSalvar, StyledButtonNovo, StyledButtonPesquisar } from './../styles';
import Swal from 'sweetalert2';
import { currentUrl } from '../../../../src/constants/global';
import { Label, ButtonContainer, Input } from './style';
import Search from './Search';
import CloseButton from './CloseButton';


const CreditoCarbono = ({ project_id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState('');
  const [safra, setSafra] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const safra1Ref = useRef(null);

  useEffect(() => {
    if (selectedItem) {
      setId(selectedItem.id);
      setSafra(selectedItem.safra);
      setQuantidade(selectedItem.quantidade);
    }
  }, [selectedItem]);

  const handleSalvarClick = async () => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('safra', safra);
      formData.append('quantidade', quantidade);
      formData.append('project', parseInt(project_id));

      const token = sessionStorage.getItem('Authorization');
      const headers = { Authorization: `Bearer ${token}` };

      // Verifique se o ID está preenchido
      if (id === '') {
        // Se o ID estiver vazio, faça uma chamada de inserção
        const response = await axios.post(`${currentUrl}/api/project_carbon_credits/insert`, formData, { headers });
        console.log('Inserido com sucesso! Resposta da API:', response.data);
      } else {
        // Se o ID estiver preenchido, faça uma chamada de atualização
        const response = await axios.put(`${currentUrl}/api/project_carbon_credits/update/${id}/`, formData, { headers });
        console.log('Atualizado com sucesso! Resposta da API:', response.data);
      }

      //limpar
      setId('');
      setSafra('');
      setQuantidade('');
      safra1Ref.current.focus();      

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
    setSafra('');
    setQuantidade('');
    safra1Ref.current.focus();
  };

  const handlePesquisarClick = () => {
    setIsSearching(!isSearching);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    safra1Ref.current.focus(); 
  };  

  const PreencheItem = (item) => {
    setSelectedItem(item);
    console.log("credito carbono : " + selectedItem);
  };  

  
  return (
    <div >
        <h2>Crédito de Carbono</h2>
        <div>
          <Label htmlFor="safra1">SAFRA</Label>
          <div>
            <Input
              style={{ width: '335px' }}
              type="text"
              id="safra1"
              name="safra1"
              value={safra}
              onChange={(e) => setSafra(e.target.value)}
              ref={safra1Ref}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="quantidade">QUANTIDADE</Label>
          <div>
            <Input
              style={{ width: '335px' }}
              type="text"
              id="quantidade"
              name="quantidade"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />
          </div>
        </div>
        <ButtonContainer>
          <StyledButtonSalvar style={{width: '110px'}} onClick={handleSalvarClick}>Salvar</StyledButtonSalvar>
          <StyledButtonNovo style={{width: '110px'}} onClick={handleNovoClick}>Novo</StyledButtonNovo>
          <StyledButtonPesquisar style={{width: '110px'}} onClick={handlePesquisarClick}>Pesquisar</StyledButtonPesquisar>
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
    </div>
  );
};

export default CreditoCarbono;
