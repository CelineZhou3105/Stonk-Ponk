import React from 'react';

// import { getPortfolio } from '../services/portfolio';

import { Container, PortfolioValueContainer } from '../css/Div';
import { SubText, SubTitle, PortfolioValue, ColorText } from '../css/Text';

import Chart from "react-google-charts";

const stocksDummyData = [
    { name: 'Wesfarmers', ticker: 'WES', performance: 'graph', price: 590.48, sector: 'aus', type: 'etf', units_owned: 5, purchase_price: 60.000, last_purchased: 1612962000, original_contribution: 300.00 },
    { name: 'Atlassian', ticker: 'TEAM', performance: 'graph', price: 300.42, sector: 'aus', type: 'etf', units_owned: 5, purchase_price: 16.00, last_purchased: 1613912400, original_contribution: 80.00 },
    { name: 'Alphabet Inc Class C', ticker: 'GOOG', performance: 'graph', price: 2061.92, sector: 'aus', type: 'etf', units_owned: 3, purchase_price: 300.00, last_purchased: 1613912400, original_contribution: 900.00 },
    { name: 'Kogan.com Ltd', ticker: 'KGN', performance: 'graph', price: 2061.92, sector: 'aus', type: 'stock', units_owned: 5, purchase_price: 180.00, last_purchased: 1614344400, original_contribution: 900.00 },
    { name: 'BHP Group', ticker: 'BHP', performance: 'graph', price: 2399.32, sector: 'aus', type: 'stock', units_owned: 3, purchase_price: 300.00, last_purchased: 1614517200, original_contribution: 900.00 },
    { name: 'Santos Limited', ticker: 'STO', performance: 'graph', price: 499.00, sector: 'aus', type: 'stock', units_owned: 5, purchase_price: 180.00, last_purchased: 1614517200, original_contribution: 900.00 },
];

const responseData = {
    stocks: stocksDummyData,
    contribution: 20800.20,
    best_performing: [
        { name: 'Kogan.com Ltd', ticker: 'KGN', performance: 'graph', price: 2061.92, sector: 'aus', type: 'stock', units_owned: 5, last_purchased: 1614344400, original_contribution: 900.00 },
        { name: 'BHP Group', ticker: 'BHP', performance: 'graph', price: 2399.32, sector: 'aus', type: 'stock', units_owned: 3, last_purchased: 1614517200, original_contribution: 900.00 },
        { name: 'Alphabet Inc Class C', ticker: 'GOOG', performance: 'graph', price: 2061.92, sector: 'aus', type: 'etf', units_owned: 3, last_purchased: 1613912400, original_contribution: 900.00 },
    ],
    worst_performing: [
        { name: 'Atlassian', ticker: 'TEAM', performance: 'graph', price: 300.42, sector: 'aus', type: 'etf', units_owned: 5, last_purchased: 1613912400, original_contribution: 80.00 },
        { name: 'Wesfarmers', ticker: 'WES', performance: 'graph', price: 590.48, sector: 'aus', type: 'etf', units_owned: 5, last_purchased: 1612962000, original_contribution: 300.00 },
        { name: 'Santos Limited', ticker: 'STO', performance: 'graph', price: 499.00, sector: 'aus', type: 'stock', units_owned: 5, last_purchased: 1614517200, original_contribution: 900.00 },
    ]
}

const PortfolioSummary = () => {
    // Calculations for the value of the portfolio
    let stockData = [['Stock name', 'Portfolio value']];
    let value = 0;
    let mostRecent = 0;
    stocksDummyData.forEach(stock => {
        let stockValue = [stock.name, stock.price * stock.units_owned];
        stockData.push(stockValue);
        value = value + stock.price * stock.units_owned;
        if (stock.last_purchased > mostRecent) {
            mostRecent = stock.last_purchased;
        }
    });
    let date = new Date(mostRecent * 1000).toDateString();

    let diff = (value - responseData.contribution).toFixed(2);
    let percentageDiff = ((diff / responseData.contribution) * 100).toFixed(2);
    return (
        <Container>
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={stockData}
                options={{
                    title: 'Portfolio makeup',
                    backgroundColor: 'transparent',
                }}
                rootProps={{ 'data-testid': '1' }}
            />
            <PortfolioValueContainer>
                <SubTitle>Portfolio Value</SubTitle>
                <PortfolioValue>A${value}</PortfolioValue>
                <SubText color="#000000">
                    {diff + ' '}
                    <ColorText color="#00AD30">
                        ({diff > 0 ? ('+' + percentageDiff + '%') : (percentageDiff + '%')})
                            </ColorText>
                </SubText>
                <SubText>
                    Contributions: ${responseData.contribution}
                    <br />
                            Last Investment: {date}
                </SubText>
            </PortfolioValueContainer>
        </Container>
    );
}

export default PortfolioSummary;