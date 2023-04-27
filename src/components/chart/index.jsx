import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";


const Graph = ({data, title, name, key_a, key_b, key_c, stroke_a, stroke_b, stroke_c}) => (
  <div>
    <h2 style={{color: '#054d00'}}>{title}</h2>
    <LineChart width={500} height={300} data={data}>
      <XAxis dataKey={name} />
      <YAxis />
      <CartesianGrid stroke="#ccc" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={key_a} stroke={stroke_a} />
      {key_b && <Line type="monotone" dataKey={key_b} stroke={stroke_b} />}
      {key_c && <Line type="monotone" dataKey={key_c} stroke={stroke_c} />}
    </LineChart>
  </div>
);

export default Graph;

