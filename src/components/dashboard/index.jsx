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
    { name: "Jan", inicializado: 377, concluído: 290 },
    { name: "Feb", inicializado: 600, concluído: 560 },
    { name: "Mar", inicializado: 800, concluído: 400 },
    { name: "Apr", inicializado: 1230, concluído: 900 },
    { name: "May", inicializado: 1890, concluído: 4800 },
    { name: "Jun", inicializado: 2390, concluído: 3800 },
    { name: "Jul", inicializado: 3490, concluído: 4300 },
  ];

  const data4 = [
    { name: "Out", dollar: 4.50, euro: 6.30 },
    { name: "Nov", dollar: 5.50, euro: 6.20 },
    { name: "Dez", dollar: 5.55, euro: 6.10 },
    { name: "Jan", dollar: 5.60, euro: 5.80 },
    { name: "Fev", dollar: 5.80, euro: 5.90 },
    { name: "Mar", dollar: 5.30, euro: 6.20 },
    { name: "Abr", dollar: 5.24, euro: 6.50 },
  ];

  return (
    <Container>
      <Graph data={data}  title={'Acessos'} name={'name'} key_a={'pv'} key_b={'uv'} key_c={'amt'} stroke_a={'#8884d8'} stroke_b={'#82ca9d'} stroke_c={'brown'} />
      <Graph data={data2} title={'CO2'} name={'name'} key_a={'seq'} key_b={'emit'} key_c={'acm'} stroke_a={'#7eff00'} stroke_b={'#054d00'} stroke_c={'orange'}/>
      <Graph data={data3} title={'Projetos'} name={'name'} key_a={'inicializado'} key_b={'concluído'}  stroke_a={'black'} stroke_b={'#7eff00'}/>
      <Graph data={data4} title={'Moeda'} name={'name'} key_a={'dollar'} key_b={'euro'} stroke_a={'blue'} stroke_b={'violet'}/>
    </Container>
  );
};

export default StockChart;
