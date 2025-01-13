import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { currentUrl } from '../../../../src/constants/global';
import styled from 'styled-components';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';


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

const Search = ({ onCloseModal, PreencheItem }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    handleSearchByDescricao(searchTerm);
  }, []);

  const handleSearchByDescricao = (descricao) => {
    setIsLoading(true);

    const token = sessionStorage.getItem('Authorization');
    const headers = { Authorization: `Bearer ${token}` };
    var url_ = "";

    if(descricao == "") { url_ = `${currentUrl}/api/geographic_coordinates/select`; }
    else { url_ = `${currentUrl}/api/geographic_coordinates/select_by_descricao/${descricao}`; }

    axios 
      .get(url_, { headers })
      .then((response) => {
        console.log(response.data);
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error('Erro na pesquisa:', error);
        Swal.fire({
          title: 'Erro!',
          text: 'Ocorreu um erro durante a pesquisa. Por favor, tente novamente mais tarde.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleBtnEdit = (item) => {    
    setSelectedItem(item);
    PreencheItem(item);
    onCloseModal();
  };

  const handleBtnDelete = (item) => {    
    onCloseModal();
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchByDescricao(searchTerm);
    }
  };  

  return (
    <div style={{ height: '380px' }}>
      <h2>Pesquisar Coordenadas Geográficas</h2>
      <div>
        <Input
          style={{width: '335px'}}
          type="text"
          placeholder="Digite o termo de busca"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleEnterPress}
        />
        <button
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
          onClick={() => handleSearchByDescricao(searchTerm)}
          disabled={isLoading}
        >
          Buscar
        </button>
      </div>
      {isLoading && <p>Realizando a busca...</p>}
      <br/>

        <div style={{ height: '250px', width: '440px', overflowY: 'auto' }}>
          <table style={{ width: '430px' }}>
            <thead>
              <tr style={{ backgroundColor: 'rgb(79,79,79)', height: '50px', color: 'white' }}>
                <th style={{ width: '100px', padding: '10px' }}>Descrição</th>
                <th style={{ width: '90px', padding: '10px' }}>Latitude</th>
                <th style={{ width: '90px', padding: '10px' }}>Longitude</th>
                <th style={{ width: '90px', textAlign: 'center', padding: '10px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result, index) => (
                <tr key={result.id} style={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgb(139, 195, 74)' }}>
                  <td style={{ width: '100px' }}>{result.descricao}</td>
                  <td>{result.latitude}</td>
                  <td>{result.longitude}</td>
                  <td style={{ textAlign: 'center', minWidth: '110px', maxWidth: '110px' }}>
                    <div style={{ float: 'left', marginLeft: '5px' }}><EditButton closeModal={() => handleBtnEdit(result)}/></div>
                    <div style={{ float: 'right', marginRight: '12px' }}><DeleteButton closeModal={() => handleBtnDelete(result)} id={result.id}/></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default Search;
