import './App.css';
import React, { useState, useEffect, useRef } from 'react'; // Imported so we can use React Hooks (Official)
import ChartContainer from './ChartContainer'; // Imported so we can use the ChartContainer component(Our own)
import Chart from 'chart.js/auto'; // Imported so we can use the Chart.js library (Official)
import moment from 'moment'; // Imported so we can use the moment.js library (Official)
import CryptoGraphicSelector from './CryptoGraphicSelector';

function App() {
  const [show, setShow] = useState(false); // Responsible for showing/hiding the Offcanvas component
  const handleClose = () => setShow(false); // Responsible for hiding the Offcanvas component
  const handleShow = () => setShow(true); // Responsible for showing the Offcanvas component
  const [selectedCurrency, setSelectedCurrency] = useState('cardano'); // Responsible for storing the selected currency
  const [priceData, setPriceData] = useState([]); // Responsible for storing the price data
  const [selectedTimeRange, setSelectedTimeRange] = useState('today'); // Responsible for storing the selected time range
  const chartRef = useRef(null); // Responsible for storing the reference to the chart

  useEffect(() => { // Responsible for fetching the price data
    const fetchData = async () => {
      const timeRangeDays = {
        '7d': 7,
        '14d': 14,
        '30d': 30,
        '90d': 90,
        '180d': 180,
      };

      const days = timeRangeDays[selectedTimeRange] || 1;

      // Fetch the price data from the CoinGecko API
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${selectedCurrency}/market_chart?vs_currency=usd&days=${days}`);
      const result = await response.json(); // Convert the response to JSON
      const prices = result.prices.map(price => price[1]); // Extract the prices from the result
      setPriceData(prices); // Update the price data
    };

    fetchData();
  }, [selectedCurrency, selectedTimeRange]);


  useEffect(() => { // UseEffect responsible for creating the chart
    const currencyColors = {
      cardano: 'rgba(10, 110, 132, 89.2)',
      bitcoin: 'rgba(255, 159, 64, 89.2)',
      ethereum: 'rgba(54, 162, 235, 89.2)',
      solana: 'rgba(153, 102, 255, 89.2)',
    };

    const color = currencyColors[selectedCurrency] || 'rgba(0, 0, 0, 0)';

    const chart = new Chart(chartRef.current, { // Create the chart
      type: 'line',
      data: {
        labels: priceData.map(price => {
          const date = moment.unix(price[0] / 1000);
          return date.isValid() ? date.format('') : '';
        }),
        datasets: [
          {
            label: `${selectedCurrency} Price`,
            data: priceData,
            borderColor: color,
            backgroundColor: color,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    return () => {
      chart.destroy();
    };
  }, [priceData, selectedCurrency]);

  return ( // 
    <div className="App">
      <CryptoGraphicSelector
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        selectedTimeRange={selectedTimeRange}
        setSelectedTimeRange={setSelectedTimeRange}
        priceData={priceData}
      />
      <ChartContainer chartRef={chartRef} />
    </div>
  );
}

export default App;