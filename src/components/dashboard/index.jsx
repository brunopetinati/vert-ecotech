import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WalkingVase from '../../assets/gifs/plant-gworing.gif';
import Graph from '../chart';
import { Container } from './styles';

const StockChart = () => {
  //const [data, setData] = useState(null);

  const data = [
    { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Mar", uv: 2000, pv: 8800, amt: 2290 },
    { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  ];

  // uv: short for "unique visitors", refers to the number of distinct individuals who visited a website or other online platform during a given time period.
  // pv: short for "page views", refers to the total number of times a webpage or other digital content was viewed or accessed during a given time period.
  // amt: short for "amount", refers to the total monetary value of transactions or other financial activity that occurred during a given time period.


  const data2 = [
    { name: "Out", seq: 4000, emit: 2400, acm: 1600 },
    { name: "Nov", seq: 3000, emit: 1398, acm: 1602 },
    { name: "Dez", seq: 2000, emit: 9800, acm: -7800 },
    { name: "Jan", seq: 2780, emit: 3908, acm: -1128 },
    { name: "Fev", seq: 1890, emit: 4800, acm: -2910 },
    { name: "Mar", seq: 2390, emit: 3800, acm:  -1410},
    { name: "Abr", seq: 3490, emit: 4300, acm: -810 },
  ];

  const data3 = [
    { name: "Out", ativos: 377, aposentados: 290 },
    { name: "Nov", ativos: 600, aposentados: 560 },
    { name: "Dez", ativos: 800, aposentados: 400 },
    { name: "Jan", ativos: 1230, aposentados: 900 },
    { name: "Fev", ativos: 1890, aposentados: 4800 },
    { name: "Mar", ativos: 2390, aposentados: 3800 },
    { name: "Abr", ativos: 3490, aposentados: 4300 },
  ];

  const data4 = [
    { name: "Out", started: 1, analysis: 0, viability: 0, negotiation: 0, implementing: 0, concluded: 0 },
    { name: "Nov", started: 2, analysis: 1, viability: 0, negotiation: 0, implementing: 0, concluded: 0 },
    { name: "Dez", started: 3, analysis: 2, viability: 1, negotiation: 0, implementing: 0, concluded: 0 },
    { name: "Jan", started: 1, analysis: 0, viability: 5, negotiation: 0, implementing: 0, concluded: 0 },
    { name: "Fev", started: 5, analysis: 0, viability: 0, negotiation: 6, implementing: 0, concluded: 0 },
    { name: "Mar", started: 4, analysis: 5, viability: 0, negotiation: 0, implementing: 6, concluded: 0 },
    { name: "Abr", started: 7, analysis: 2, viability: 3, negotiation: 0, implementing: 0, concluded: 6 },
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