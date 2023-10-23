import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function TimeRangeSelector({ selectedTimeRange, setSelectedTimeRange, handleClose }) {
    const handleTimeRangeSelect = (timeRange) => {
        setSelectedTimeRange(timeRange);
        handleClose();
    };

    return (
        <>
            <ul></ul>
            Also you can select the time range:
            <Navbar bg="light" variant="light" className="card" id="cardP">
                <Nav className="me-auto">
                    <Nav.Link href="#" onClick={() => handleTimeRangeSelect('today')} active={selectedTimeRange === 'today'}>
                        Today
                    </Nav.Link>
                    <Nav.Link href="#" onClick={() => handleTimeRangeSelect('7d')} active={selectedTimeRange === '7d'}>
                        7d
                    </Nav.Link>
                    <Nav.Link href="#" onClick={() => handleTimeRangeSelect('14d')} active={selectedTimeRange === '14d'}>
                        14d
                    </Nav.Link>
                    <Nav.Link href="#" onClick={() => handleTimeRangeSelect('30d')} active={selectedTimeRange === '30d'}>
                        30d
                    </Nav.Link>
                    <Nav.Link href="#" onClick={() => handleTimeRangeSelect('90d')} active={selectedTimeRange === '90d'}>
                        90d
                    </Nav.Link>
                    <Nav.Link href="#" onClick={() => handleTimeRangeSelect('180d')} active={selectedTimeRange === '180d'}>
                        180d
                    </Nav.Link>
                </Nav>
            </Navbar>
        </>
    );
}

export default TimeRangeSelector;