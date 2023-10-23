import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Navbar, Offcanvas } from 'react-bootstrap';
import CryptoCurrencySelector from './CryptoCurrencySelector.js';
import TimeRangeSelector from './TimeRangeSelector';
import ChartContainer from './ChartContainer';
import Chart from 'chart.js/auto';
import moment from 'moment';

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedCurrency, setSelectedCurrency] = useState('cardano');
  const [priceData, setPriceData] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      let days = 1;
      switch (selectedTimeRange) {
        case '7d':
          days = 7;
          break;
        case '14d':
          days = 14;
          break;
        case '30d':
          days = 30;
          break;
        case '90d':
          days = 90;
          break;
        case '180d':
          days = 180;
          break;
        default:
          days = 1;
      }

      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${selectedCurrency}/market_chart?vs_currency=usd&days=${days}`);
      const result = await response.json();
      const prices = result.prices.map(price => price[1]);
      setPriceData(prices);
    };

    fetchData();
  }, [selectedCurrency, selectedTimeRange]);

  useEffect(() => {
    let color;
    switch (selectedCurrency) {
      case 'cardano':
        color = 'rgba(10, 110, 132, 89.2)';
        break;
      case 'bitcoin':
        color = 'rgba(255, 159, 64, 89.2)';
        break;
      case 'ethereum':
        color = 'rgba(54, 162, 235, 89.2)';
        break;
      case 'solana':
        color = 'rgba(0, 0, 0, 89.2)';
        break;
      default:
        color = 'rgba(10, 110, 132, 89.2)';
    }

    const chart = new Chart(chartRef.current, {
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

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={handleShow}>Select your currency: </Navbar.Brand>
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Crypto-Currency Graphic Selector</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CryptoCurrencySelector
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            handleClose={handleClose}
          />
          <TimeRangeSelector
            selectedTimeRange={selectedTimeRange}
            setSelectedTimeRange={setSelectedTimeRange}
            handleClose={handleClose}
          />
          <div className="card" id="last-price">
            Last Price: {priceData.length > 0 ? `$${priceData[priceData.length - 1].toFixed(2)}` : '-'}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <ChartContainer chartRef={chartRef} />
    </div>
  );
}

export default App;