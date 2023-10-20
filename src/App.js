import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Navbar, Offcanvas } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Chart from 'chart.js/auto';
import axios from 'axios';
import moment from 'moment';

//TO-DO: Impartire cod actual in componente functionale
//TO-DO: Implementare functionalitate de selectare a monedei - > DONE
//TO-DO: Implementare functionalitate de selectare a perioadei(OPTIONAL)
//TO-DO: Resize la grafic -> DONE

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedCurrency, setSelectedCurrency] = useState('cardano');
  const [priceData, setPriceData] = useState([]);
  const startOfMonth = moment().startOf('month');
  const endOfMonth = moment();
  const daysInMonth = endOfMonth.diff(startOfMonth, 'days') + 1;
  const labels = Array.from({ length: daysInMonth }, (_, i) =>
    startOfMonth.clone().add(i, 'days').format('MMM D')
  );
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`https://api.coingecko.com/api/v3/coins/${selectedCurrency}/market_chart?vs_currency=usd&days=30`);
      const prices = result.data.prices.map(price => price[1]);
      setPriceData(prices);
    };

    fetchData();
  }, [selectedCurrency]);

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
        labels: labels,
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

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    handleClose();
  };

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
          Select the crypto-currency you want to see the price of:
          <ListGroup as="ul" active>
            <ListGroup.Item as="li" onClick={() => handleCurrencySelect('cardano')}> Cardano</ListGroup.Item>
            <ListGroup.Item as="li" onClick={() => handleCurrencySelect('bitcoin')}>Bitcoin</ListGroup.Item>
            <ListGroup.Item as="li" onClick={() => handleCurrencySelect('ethereum')}>Ethereum </ListGroup.Item>
            <ListGroup.Item as="li" onClick={() => handleCurrencySelect('solana')}>Solana</ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>

      <Container>
        <div id="chart-container">
          <canvas id="myChart" ref={chartRef}></canvas>
        </div>
      </Container>
    </div >
  );
}

export default App;