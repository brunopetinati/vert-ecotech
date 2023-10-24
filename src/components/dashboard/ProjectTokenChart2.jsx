import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from '../chart';
import { Container, Button, Input } from './styles';
import { currentUrl } from '../../constants/global';
import axios from 'axios';

const ProjectTokenChart2 = () => {
  const collapsed = useSelector((state) => state.sidebar);
  const [data3, setData3] = useState([]);
  const [currentYear, setCurrentYear] = useState(2023); // Ano inicial

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('Authorization');
        const headers = { Authorization: `Bearer ${token}` };

        const startYear = 2020; // Ano de início do range
        const endYear = 2028; // Ano final do range

        const yearRange = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);

        const requestData = { years: yearRange };

        const response = await axios.post(`${currentUrl}/api/project_tokens/get_by_years`, requestData, { headers });

        if (Array.isArray(response.data)) {
          console.log('Resposta da API:', response.data);
          setData3(response.data);
        } else {
          console.error('Dados da API inválidos');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Não é necessário depender do 'currentYear' aqui

  return (
    <Container collapsed={collapsed}>
      <div style={{ width: '600px' }}>
        <div>
          <Chart data={data3} title={'Tokens'} name={'name'} key_a={'ativos'} key_b={'aposentados'} stroke_a={'blue'} stroke_b={'black'} />
        </div>
      </div>
    </Container>
  );
};

export default ProjectTokenChart2;
