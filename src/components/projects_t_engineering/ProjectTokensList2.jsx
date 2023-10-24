import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { currentUrl } from '../../constants/global';
import { Button, Input } from './styles2';

const ProjectTokensList2 = ({ project_id }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [currentYear, setCurrentYear] = useState(2023);
  
  useEffect(() => {
    setItemsPerPage(12);
    fetchData(currentYear);
  }, [currentPage, itemsPerPage, currentYear]);

  const fetchData = async ( currentYear ) => {
    try {
      setIsLoading(true);
      const token = sessionStorage.getItem('Authorization');
      const headers = { Authorization: `Bearer ${token}` };

      const requestData = { meses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], ano: currentYear };

      const response = await axios.post(`${currentUrl}/api/project_tokens/get_by_months`, requestData, { headers });

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

  const handlePrevYear = () => {
    setCurrentYear(currentYear - 1);
  };

  const handleNextYear = () => {
    setCurrentYear(currentYear + 1);
  };  

  return (
    <div style={{ position: 'absolute', width: '722px', top: '65px', left: '350px' }}>      
      <h2>Tokens Visão Mensal</h2>
      <table>
        <thead>
          <tr style={{ backgroundColor: 'rgb(79,79,79)', height: '25px', color: 'white' }}>
            <th style={{ width: '100px', padding: '10px' }}>Mês</th> 
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
      <div style={{ width: '100%', position: 'absolute', left: '165px' }}>
        <div style={{ width: '300px' }}>
          <Button onClick={handlePrevYear}>{'<<'}</Button>
          <Input type="text" value={currentYear} disabled style={{ width: '50px' }} />
          <Button onClick={handleNextYear}>{'>>'}</Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectTokensList2;
