import React from 'react';
import { Container } from 'react-bootstrap';

function ChartContainer({ chartRef }) {
    return (
        <Container>
            <div id="chart-container">
                <canvas id="myChart" ref={chartRef}></canvas>
            </div>
        </Container>
    );
}

export default ChartContainer;