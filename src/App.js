import './App.css';
import React, { useState, useEffect, useRef } from 'react'; // Imported so we can use React Hooks (Official)
import { Container, Navbar, Offcanvas } from 'react-bootstrap'; // Imported so we can use Bootstrap components (Official)
import CryptoCurrencySelector from './CryptoCurrencySelector.js'; // Imported so we can use the CryptoCurrencySelector component(Our own)
import TimeRangeSelector from './TimeRangeSelector'; // Imported so we can use the TimeRangeSelector component(Our own)
import ChartContainer from './ChartContainer'; // Imported so we can use the ChartContainer component(Our own)
import Chart from 'chart.js/auto'; // Imported so we can use the Chart.js library (Official)
import moment from 'moment'; // Imported so we can use the moment.js library (Official)

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
      let days = 1;  // Default value
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
      // Fetch the price data from the CoinGecko API
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${selectedCurrency}/market_chart?vs_currency=usd&days=${days}`);
      const result = await response.json(); // Convert the response to JSON
      const prices = result.prices.map(price => price[1]); // Extract the prices from the result
      setPriceData(prices); // Update the price data
    };

    fetchData();
  }, [selectedCurrency, selectedTimeRange]);

  useEffect(() => { // UseEffect responsible for creating the chart
    let color;
    switch (selectedCurrency) { // Set the color based on the selected currency
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
            Last Price: {priceData.length > 0 ? `$${priceData[priceData.length - 1].toFixed(3)}` : '-'}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <ChartContainer chartRef={chartRef} />
    </div>
  );
}

export default App;