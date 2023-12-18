import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from '../chart';
import { Container, Button, Input } from './styles';
import { currentUrl } from '../../constants/global';
import axios from 'axios';

const ProjectTokenChart1 = () => {

  const collapsed = useSelector((state) => state.sidebar);
  const [data3, setData3] = useState([]);
  const [currentYear, setCurrentYear] = useState(2023);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('Authorization');
        const headers = { Authorization: `Bearer ${token}` };

        const requestData = { meses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], ano: currentYear };

        const response = await axios.post(`${currentUrl}/api/project_tokens/get_by_months`, requestData, { headers });

        if (Array.isArray(response.data)) {
          //console.log('Resposta da API:', response.data);
          setData3(response.data);
        } else {
          console.error('Dados da API inválidos');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        //setIsLoading(false);
      }
    };

    fetchData();
  }, [currentYear]);

  const handlePrevYear = () => {
    setCurrentYear(currentYear - 1);
  };

  const handleNextYear = () => {
    setCurrentYear(currentYear + 1);
  };

  return (
    <Container collapsed={collapsed}>
      <div style={{ width: '600px' }}>
        <div>
          <Chart data={data3} title={'Tokens Visão Mensal'} name={'name'} key_a={'ativos'} key_b={'aposentados'} stroke_a={'blue'} stroke_b={'black'} />
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '300px', marginLeft: '120px' }}>
            <Button onClick={handlePrevYear} style={{ margin: '0px 20px 0px 0px' }}>{'<<'}</Button>
            <Input type="text" value={currentYear} disabled style={{ width: '50px' }} />
            <Button onClick={handleNextYear} style={{ margin: '0px 15px 10px 20px' }}>{'>>'}</Button>
          </div>
        </div>  
      </div>    
    </Container>
  );
};

export default ProjectTokenChart1;
