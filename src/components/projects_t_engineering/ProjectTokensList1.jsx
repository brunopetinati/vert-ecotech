import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importe Swal
import { currentUrl } from '../../constants/global';
import { Button, Input } from './styles2';

const ProjectTokensList1 = ({ project_id }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const token = sessionStorage.getItem('Authorization');
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`${currentUrl}/api/project_tokens/select`, { headers });
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const aposentarItem = async (item) => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Deseja realmente aposentar este token?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, aposentar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        aposentarTokenConfirmado(item);
      }
    });
  };

  const aposentarTokenConfirmado = async (item) => {
    try {
      setIsLoading(true);
      const token = sessionStorage.getItem('Authorization');
      const headers = { Authorization: `Bearer ${token}` };
      const url = `${currentUrl}/api/project_tokens/aposentar_item/${item.id}/`;

      const response = await axios.put(url, {}, { headers });

      const updatedItems = items.map((oldItem) => {
        if (oldItem.id === item.id) {
          return { ...oldItem, status: false };
        }
        return oldItem;
      });
      setItems(updatedItems);
    } catch (error) {
      console.error('Error aposentando item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const token = sessionStorage.getItem('Authorization');
      const headers = { Authorization: `Bearer ${token}` };
      let url_ = "";

      if (searchTerm === "") {
        url_ = `${currentUrl}/api/project_tokens/select`;
      } else {
        url_ = `${currentUrl}/api/project_tokens/select_by_token/${searchTerm}`;
      }

      const response = await axios.get(url_, { headers });

      setItems(response.data);
    } catch (error) {
      console.error('Error searching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchOnEnter = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const cellStyle = {
    width: '150px',
    maxWidth: '150px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: '20px',
    textAlign: 'center',
    color: 'rgb(54,54,54)'
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div style={{ position: 'absolute', width: '722px', top: '65px', left: '350px' }}>
      <h2>Tokens Aposentadoria</h2>
      <div>
        <input
          type="text"
          placeholder="Search Tokens"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleSearchOnEnter}
          ref={searchInputRef}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table>
        <thead>
          <tr style={{ backgroundColor: 'rgb(79,79,79)', height: '25px', color: 'white' }}>
            <th style={{ width: '100px', padding: '10px' }}>Tokens</th>
            <th style={{ width: '100px', padding: '10px' }}>Data Hora</th>
            <th style={{ width: '100px', padding: '10px' }}>Quantidade</th>
            <th style={{ width: '100px', padding: '10px' }}>Status</th>
            <th style={{ width: '100px', padding: '10px' }} >Ações</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : (
            items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
              <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? 'rgb(139, 195, 74)' : 'white' }}>
                <td style={cellStyle}>{item.token}</td>
                <td style={cellStyle}>{item.date_time_cad}</td>
                <td style={cellStyle}>{item.quantidade}</td>
                <td style={cellStyle}>{item.status ? 'Ativo' : 'Inativo'}</td>
                <td style={cellStyle}>
                  {item.status ? (
                    <Button onClick={() => aposentarItem(item)}>Aposentar</Button>
                  ) : (
                    <button disabled>Aposentado</button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div>
        <span>Page: </span>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectTokensList1;
