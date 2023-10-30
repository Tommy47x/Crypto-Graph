import React from "react"; // Imported so we can use React Hooks (Official)
import { Container, Navbar, Offcanvas } from "react-bootstrap"; // Imported so we can use the React Bootstrap library (Official)
import CryptoCurrencySelector from "./CryptoCurrencySelector"; // Imported so we can use the CryptoCurrencySelector component (Our own)
import TimeRangeSelector from "./TimeRangeSelector"; // Imported so we can use the TimeRangeSelector component (Our own)

function CryptoGraphicSelector(props) {
    const {
        show,
        handleClose,
        handleShow,
        selectedCurrency,
        setSelectedCurrency,
        selectedTimeRange,
        setSelectedTimeRange,
        priceData,
    } = props;

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand onClick={handleShow}>
                        Select your currency:{" "}
                    </Navbar.Brand>
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
                    <ul></ul>
                    <div className="card" id="last-price">
                        Last Price:{" "}
                        {priceData.length > 0
                            ? `$${priceData[priceData.length - 1].toFixed(3)}`
                            : "-"}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default CryptoGraphicSelector;
