import React from 'react';
import { ListGroup } from 'react-bootstrap';

function CryptoCurrencySelector({ selectedCurrency, setSelectedCurrency, handleClose }) {
    const handleCurrencySelect = (currency) => {
        setSelectedCurrency(currency);
        handleClose();
    };

    return (
        <>
            Select the crypto-currency you want to see the price of:
            <ListGroup as="ul">
                <ListGroup.Item as="li" onClick={() => handleCurrencySelect('cardano')} active={selectedCurrency === 'cardano'}>
                    Cardano
                </ListGroup.Item>
                <ListGroup.Item as="li" onClick={() => handleCurrencySelect('bitcoin')} active={selectedCurrency === 'bitcoin'}>
                    Bitcoin
                </ListGroup.Item>
                <ListGroup.Item as="li" onClick={() => handleCurrencySelect('ethereum')} active={selectedCurrency === 'ethereum'}>
                    Ethereum
                </ListGroup.Item>
                <ListGroup.Item as="li" onClick={() => handleCurrencySelect('solana')} active={selectedCurrency === 'solana'}>
                    Solana
                </ListGroup.Item>
            </ListGroup>
        </>
    );
}

export default CryptoCurrencySelector;