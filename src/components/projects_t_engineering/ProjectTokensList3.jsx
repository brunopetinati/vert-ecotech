import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { currentUrl } from '../../constants/global';

const ProjectTokensList3 = ({ project_id }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [currentYear, setCurrentYear] = useState(2023);
  
  useEffect(() => {
    setItemsPerPage(12);
    fetchData();
  }, [currentPage, itemsPerPage]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const token = sessionStorage.getItem('Authorization');
      const headers = { Authorization: `Bearer ${token}` };

      const startYear = 2020;
      const endYear = 2028;
      const yearRange = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);
      const requestData = { years: yearRange };

      const response = await axios.post(`${currentUrl}/api/project_tokens/get_by_years`, requestData, { headers });

      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
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
    <div >
      <h2>Tokens Visão Anual</h2>
      <table>
        <thead>
          <tr style={{ backgroundColor: 'rgb(79,79,79)', height: '25px', color: 'white' }}>
            <th style={{ width: '100px', padding: '10px' }}>Ano</th> 
            <th style={{ width: '100px', padding: '10px' }}>Ativos</th>
            <th style={{ width: '100px', padding: '10px' }}>Aposentados</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          ) : (
            items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
              <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? 'rgb(139, 195, 74)' : 'white' }}>
                <td style={cellStyle}>{item.name}</td>
                <td style={cellStyle}>{item.ativos}</td>
                <td style={cellStyle}>{item.aposentados}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div>
        <span>Página: </span>
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

export default ProjectTokensList3;
