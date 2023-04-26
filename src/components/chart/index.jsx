import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";


const Graph = ({data, name, key_a, key_b}) => (
  <div>
    <h2>Line Chart</h2>
    <LineChart width={500} height={300} data={data}>
      <XAxis dataKey={name} />
      <YAxis />
      <CartesianGrid stroke="#ccc" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={key_a} stroke="#8884d8" />
      <Line type="monotone" dataKey={key_b} stroke="#82ca9d" />
    </LineChart>
  </div>
);

export default Graph;

