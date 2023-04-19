import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import WalkingVase from '../../assets/gifs/plant-gworing.gif'

const StockChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&apikey=YOUR_API_KEY'
        );
        const data = response.data['Time Series (Daily)'];
        const dates = Object.keys(data);
        const prices = dates.map((date) => data[date]['4. close']);
        setData({ labels: dates.reverse(), datasets: [{ data: prices.reverse() }] });
      } catch (error) {
        console.error('Error fetching stock data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <h2 style={{fontStyle: 'italic', color: '#054d00'}}>Still working on that...</h2>
      <img src={WalkingVase} style={{width: '150px'}} alt="Loading..." />
    </div>
  );
};

export default StockChart;
