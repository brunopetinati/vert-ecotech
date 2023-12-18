import React from "react";
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTitle } from './styles';

const ResponsiveChartContainer = styled.div`
  width: 500px;
  margin-left: -0px;

  @media screen and (max-width: 768px) {
    width: 100%; 
  }
`;

const Chart = ({data, title, name, key_a, key_b, key_c, key_d, key_e, key_f, key_g, stroke_a, stroke_b, stroke_c, stroke_d, stroke_e, stroke_f, stroke_g}) => (
  <ChartContainer>
    <h3 style={{color: '#054d00'}}>{title}</h3>
      <ResponsiveChartContainer>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey={name} />
          <YAxis />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={key_a} stroke={stroke_a} />
          {key_b && <Line type="monotone" dataKey={key_b} stroke={stroke_b} />}
          {key_c && <Line type="monotone" dataKey={key_c} stroke={stroke_c} />}
          {key_d && <Line type="monotone" dataKey={key_d} stroke={stroke_d} />}
          {key_e && <Line type="monotone" dataKey={key_e} stroke={stroke_e} />}
          {key_f && <Line type="monotone" dataKey={key_f} stroke={stroke_f} />}
          {key_g && <Line type="monotone" dataKey={key_g} stroke={stroke_g} />}
        </LineChart>
      </ResponsiveContainer>
    </ResponsiveChartContainer>
  </ChartContainer>
);

export default Chart;
