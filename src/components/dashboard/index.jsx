import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from '../chart';
import { Container } from './styles';
import { calculateTotalAreaByMonth, calculateTotalRealAreaByMonth, mergeCarbonData } from './carbon';
import { groupByMonthAndStatus } from './project_status';
import { groupByUserType } from './users';

const Dashboard = () => {

  // sequestro de carbono na atmosfera
  const projects = useSelector((state) => state.app_data.projects);
  const users = useSelector((state) => state.app_data.users);
  const carbon_1 = calculateTotalAreaByMonth(projects);
  const carbon_2 = calculateTotalRealAreaByMonth(projects);
  let data = groupByUserType(users);
  let data2 = mergeCarbonData(carbon_1, carbon_2);

  console.log('tristeza ja',data2);

  /* const data = [
    { name: "Jan", uv: 0, pv: 0, amt: 0 },
    { name: "Feb", uv: 0, pv: 0, amt: 0 },
    { name: "Mar", uv: 0, pv: 0, amt: 0 },
    { name: "Apr", uv: 0, pv: 0, amt: 0 },
  ]; */

  // status dos projetos

  let data4 = groupByMonthAndStatus(projects);

  // uv: short for "unique visitors", refers to the number of distinct individuals who visited a website or other online platform during a given time period.
  // pv: short for "page views", refers to the total number of times a webpage or other digital content was viewed or accessed during a given time period.
  // amt: short for "amount", refers to the total monetary value of transactions or other financial activity that occurred during a given time period.

  const data3 = [
    { name: "Out", ativos: 0, aposentados: 0 },
    { name: "Nov", ativos: 0, aposentados: 0 },
    { name: "Dez", ativos: 0, aposentados: 0 },
    { name: "Jan", ativos: 0, aposentados: 0 },
    { name: "Fev", ativos: 0, aposentados: 0 },
    { name: "Mar", ativos: 0, aposentados: 0 },
    { name: "Abr", ativos: 0, aposentados: 0 },
  ];

  /* const data5 = [
    { month: "Out", started: 0, analysis: 0, viability: 0, negotiation: 0, implementing: 0, concluded: 0 },
    { month: "Nov", started: 0, analysis: 0, viability: 0, negotiation: 0, implementing: 0, concluded: 0 },
    { month: "Dez", started: 0, analysis: 0, viability: 0, negotiation: 0, implementing: 0, concluded: 0 },
    { month: "Jan", started: 0, analysis: 0, viability: 0, negotiation: 0, implementing: 0, concluded: 0 },
    { month: "Fev", started: 0, analysis: 0, viability: 0, negotiation: 0, implementing: 0, concluded: 0 },
    { month: "Mar", started: 0, analysis: 0, viability: 0, negotiation: 0, implementing: 0, concluded: 0 },
    { month: "Abr", started: 0, analysis: 0, viability: 0, negotiation: 0, implementing: 0, concluded: 0 },
  ]; */
  
  return (
    <Container>
      <Chart data={data}  title={'Acessos'} name={'month'} key_a={'Regular'} key_b={'ADM'} key_c={'COM'} key_d={'ENG'} stroke_a={'#8884d8'} stroke_b={'#82ca9d'} stroke_c={'brown'} stroke_d={'orange'}/>
      <Chart data={data2} title={'Sequestro de Carbono na Atmosfera (ha)'} name={'month'} key_a={'em_processo'} stroke_a={'#7eff00'} key_b={'estimativa'} stroke_b={'#054d00'}/>
      <Chart data={data3} title={'Tokens'} name={'name'} key_a={'ativos'} key_b={'aposentados'} stroke_a={'#7eff00'} stroke_b={'black'} />
      <Chart data={data4} title={'Projetos'} name={'month'} key_a={'started'} key_b={'analysis'} key_c={'viability'} key_d={'negotiation'} key_e={'idle'} key_f={'implementing'} key_g={'concluded'} stroke_a={'blue'} stroke_b={'violet'} stroke_c={'green'} stroke_d={'gold'} stroke_e={'grey'} stroke_f={'orange'} stroke_g={'brown'}/>
    </Container>
  );
};

export default Dashboard;