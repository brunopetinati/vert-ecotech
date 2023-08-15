import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from '../chart';
import { Container } from './styles';
import { calculateTotalAreaByMonth, calculateTotalRealAreaByMonth, mergeCarbonData } from './carbon';
import { groupByMonthAndStatus } from './project_status';
import { groupByUserType } from './users';

const Dashboard = () => {

  const currentUser = useSelector((state) => state.user.currentUser);
  const projects = useSelector((state) => state.app_data.projects);
  const users = useSelector((state) => state.app_data.users);


  const carbon_1 = calculateTotalAreaByMonth(projects);
  const carbon_2 = calculateTotalRealAreaByMonth(projects);

  let data = groupByUserType(users);

  let data2 = mergeCarbonData(carbon_1, carbon_2);

  const data3 = [
    { name: "Maio", ativos: 0, aposentados: 0 },
    { name: "Abril", ativos: 0, aposentados: 0 },
    { name: "Maio", ativos: 0, aposentados: 0 },
    { name: "Junho", ativos: 0, aposentados: 0 },
    { name: "Julho", ativos: 0, aposentados: 0 },
    { name: "Agosto", ativos: 0, aposentados: 0 },
    { name: "Setembro", ativos: 0, aposentados: 0 },
  ];

  let data4 = groupByMonthAndStatus(projects);

  // uv: short for "unique visitors", refers to the number of distinct individuals who visited a website or other online platform during a given time period.
  // pv: short for "page views", refers to the total number of times a webpage or other digital content was viewed or accessed during a given time period.
  // amt: short for "amount", refers to the total monetary value of transactions or other financial activity that occurred during a given time period.

  console.log(data)

  return (
    <Container>
      {currentUser.user_type === "ADM" && <Chart data={data}  title={'Acessos'} name={'month'} key_a={'Regular'} key_b={'ADM'} key_c={'COM'} key_d={'ENG'} stroke_a={'#8884d8'} stroke_b={'#82ca9d'} stroke_c={'brown'} stroke_d={'orange'}/>}
      <Chart data={data2} title={'Área total (ha):: Projetos de sequestro de CO2'} name={'month'} key_a={'em_processo'} stroke_a={'#7eff00'} key_b={'estimativa'} stroke_b={'#054d00'}/>
      <Chart data={data3} title={'Tokens'} name={'name'} key_a={'ativos'} key_b={'aposentados'} stroke_a={'#7eff00'} stroke_b={'black'} />
      {currentUser.user_type === "ADM" && <Chart data={data4} title={'Projetos'} name={'month'} key_a={'started'} key_b={'analysis'} key_c={'viability'} key_d={'negotiation'} key_e={'idle'} key_f={'implementing'} key_g={'concluded'} stroke_a={'blue'} stroke_b={'violet'} stroke_c={'green'} stroke_d={'gold'} stroke_e={'grey'} stroke_f={'orange'} stroke_g={'brown'}/> }
    </Container>
  );
};

export default Dashboard;