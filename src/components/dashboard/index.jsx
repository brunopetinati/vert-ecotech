import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WalkingVase from '../../assets/gifs/plant-gworing.gif';
import Graph from '../chart';
import { Container } from './styles';

const StockChart = () => {
  //const [data, setData] = useState(null);

  const data = [
    { name: "Jan", uv: 0, pv: 0, amt: 0 },
    { name: "Feb", uv: 0, pv: 0, amt: 0 },
    { name: "Mar", uv: 0, pv: 0, amt: 0 },
    { name: "Apr", uv: 0, pv: 0, amt: 0 },
  ];

  // uv: short for "unique visitors", refers to the number of distinct individuals who visited a website or other online platform during a given time period.
  // pv: short for "page views", refers to the total number of times a webpage or other digital content was viewed or accessed during a given time period.
  // amt: short for "amount", refers to the total monetary value of transactions or other financial activity that occurred during a given time period.


  const data2 = [
    { name: "Out", seq: 0, emit: 0, acm: 0 },
    { name: "Nov", seq: 0, emit: 0, acm: 0 },
    { name: "Dez", seq: 0, emit: 0, acm: 0 },
    { name: "Jan", seq: 0, emit: 0, acm: 0 },
    { name: "Fev", seq: 0, emit: 0, acm: 0 },
    { name: "Mar", seq: 0, emit: 0, acm: 0 },
    { name: "Abr", seq: 0, emit: 0, acm: 0 },
  ];

  const data3 = [
    { name: "Out", ativos: 0, aposentados: 0 },
    { name: "Nov", ativos: 0, aposentados: 0 },
    { name: "Dez", ativos: 0, aposentados: 0 },
    { name: "Jan", ativos: 0, aposentados: 0 },
    { name: "Fev", ativos: 0, aposentados: 0 },
    { name: "Mar", ativos: 0, aposentados: 0 },
    { name: "Abr", ativos: 0, aposentados: 0 },
  ];

  const data4 = [
    { name: "Out", started: 0, analysis: 0, viability: 0, negotiation: 0, implementing: 0, concluded: 0 },
    { name: "Nov", started: 0, analysis: 0, viability: 0, negotiation: 0, implementing: 0, concluded: 0 },
    { name: "Dez", started: 0, analysis: 0, viability: 0, negotiation: 0, implementing: 0, concluded: 0 },
    { name: "Jan", started: 0, analysis: 0, viability: 0, negotiation: 0, implementing: 0, concluded: 0 },
    { name: "Fev", started: 0, analysis: 0, viability: 0, negotiation: 0, implementing: 0, concluded: 0 },
    { name: "Mar", started: 0, analysis: 0, viability: 0, negotiation: 0, implementing: 0, concluded: 0 },
    { name: "Abr", started: 0, analysis: 0, viability: 0, negotiation: 0, implementing: 0, concluded: 0 },
  ];
  return (
    <Container>
      <Graph data={data}  title={'Acessos'} name={'name'} key_a={'pv'} key_b={'uv'} key_c={'amt'} stroke_a={'#8884d8'} stroke_b={'#82ca9d'} stroke_c={'brown'} />
      <Graph data={data2} title={'Sequestro de Carbono na Atmosfera'} name={'name'} key_a={'seq'} key_b={'emit'} key_c={'acm'} stroke_a={'#7eff00'} stroke_b={'#054d00'} stroke_c={'orange'}/>
      <Graph data={data3} title={'Tokens'} name={'name'} key_a={'ativos'} key_b={'aposentados'} stroke_a={'#7eff00'} stroke_b={'black'} />
      <Graph data={data4} title={'Projetos'} name={'name'} key_a={'started'} key_b={'analysis'} key_c={'viability'} key_d={'negotiation'} key_e={'idle'} key_f={'implementing'} key_g={'concluded'} stroke_a={'blue'} stroke_b={'violet'} stroke_c={'green'} stroke_d={'gold'} stroke_e={'grey'} stroke_f={'orange'} stroke_g={'brown'}/>
    </Container>
  );
};

export default StockChart;