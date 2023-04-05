import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

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
    <div>
      {/* {data ? (
        <Line
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false
              },
            },
            scales: {
              x: {
                ticks: {
                  color: '#555',
                },
                grid: {
                  color: '#ddd',
                },
              },
              y: {
                ticks: {
                  color: '#555',
                },
                grid: {
                  color: '#ddd',
                },
              },
            },
          }}
        />
      ) : (
        'Loading...'
      )} */}
      <h1>dashboard</h1>
    </div>
  );
};

export default StockChart;
