import React from 'react';
import Navigation from './Navigation';

// import { getPortfolio } from '../services/portfolio';

import { FlexColumnLeftDiv, PageContainer, Container, PortfolioValueContainer, SectionRowDiv } from '../css/Div';
import { Link, SubText, SubTitle, NormalText, PageTitle, PortfolioValue, ColorText } from '../css/Text';

import Chart from "react-google-charts";

import StockTable from './StockTable';

// Headings for each table column
const tableHeadings = [
    { id: 'name', disablePadding: true, numeric: false, label: 'Name' },
    { id: 'performance', disablePadding: false, numeric: false, label: 'Performance' },
    { id: 'date', disablePadding: true, numeric: true, label: 'Purchase Date' },
    { id: 'purchase_price', disablePadding: false, numeric: true, label: 'Purchase Price' },
    { id: 'current_price', disablePadding: false, numeric: true, label: 'Current Price' },
    { id: 'units', disablePadding: false, numeric: false, label: 'Units Owned' },
    { id: 'value', disablePadding: false, numeric: true, label: 'Total Value' },
];



const stocksDummyData = [
    { name: 'Wesfarmers', ticker: 'WES', performance: 'graph', price: 590.48, sector: 'aus', type: 'etf', units_owned: 5, purchase_price: 60.000, last_purchased: 1612962000, original_contribution: 300.00},
    { name: 'Atlassian', ticker: 'TEAM', performance: 'graph', price: 300.42, sector: 'aus', type: 'etf', units_owned: 5, purchase_price: 16.00, last_purchased: 1613912400, original_contribution: 80.00},
    { name: 'Alphabet Inc Class C', ticker: 'GOOG', performance: 'graph', price: 2061.92, sector: 'aus', type: 'etf', units_owned: 3, purchase_price: 300.00, last_purchased: 1613912400, original_contribution: 900.00},
    { name: 'Kogan.com Ltd', ticker: 'KGN', performance: 'graph', price: 2061.92, sector: 'aus', type: 'stock', units_owned: 5, purchase_price: 180.00, last_purchased: 1614344400, original_contribution: 900.00},
    { name: 'BHP Group', ticker: 'BHP', performance: 'graph', price: 2399.32, sector: 'aus', type: 'stock', units_owned: 3, purchase_price: 300.00, last_purchased: 1614517200, original_contribution: 900.00},
    { name: 'Santos Limited', ticker: 'STO', performance: 'graph', price: 499.00, sector: 'aus', type: 'stock', units_owned: 5, purchase_price: 180.00, last_purchased: 1614517200, original_contribution: 900.00},
];

const responseData = {
    stocks: stocksDummyData,
    contribution: 20800.20,
    best_performing: [
        { name: 'Kogan.com Ltd', ticker: 'KGN', performance: 'graph', price: 2061.92, sector: 'aus', type: 'stock', units_owned: 5, last_purchased: 1614344400, original_contribution: 900.00},
        { name: 'BHP Group', ticker: 'BHP', performance: 'graph', price: 2399.32, sector: 'aus', type: 'stock', units_owned: 3, last_purchased: 1614517200, original_contribution: 900.00},
        { name: 'Alphabet Inc Class C', ticker: 'GOOG', performance: 'graph', price: 2061.92, sector: 'aus', type: 'etf', units_owned: 3, last_purchased: 1613912400, original_contribution: 900.00},
    ],
    worst_performing: [
        { name: 'Atlassian', ticker: 'TEAM', performance: 'graph', price: 300.42, sector: 'aus', type: 'etf', units_owned: 5, last_purchased: 1613912400, original_contribution: 80.00},
        { name: 'Wesfarmers', ticker: 'WES', performance: 'graph', price: 590.48, sector: 'aus', type: 'etf', units_owned: 5, last_purchased: 1612962000, original_contribution: 300.00},
        { name: 'Santos Limited', ticker: 'STO', performance: 'graph', price: 499.00, sector: 'aus', type: 'stock', units_owned: 5, last_purchased: 1614517200, original_contribution: 900.00},
    ]
}

const bestStockSummary = responseData.best_performing.map(stock => {
    const diff = (((stock.price * stock.units_owned) - (stock.original_contribution))/(stock.original_contribution) * 100).toFixed(2);

    return (
        <FlexColumnLeftDiv key={stock.ticker}>
            <NormalText>{stock.name}</NormalText>
            <SubText>
                <Link href={`/stocks/${stock.ticker}`}>{stock.ticker}</Link>
                {diff > 0 ? <ColorText color="#00AD30"> (+{diff}%)</ColorText> : <ColorText color="#FF1D1D"> ({diff}%)</ColorText>}
            </SubText>
        </FlexColumnLeftDiv>
    )
});

const worstStockSummary = responseData.worst_performing.map(stock => {
    const diff = (((stock.price * stock.units_owned) - (stock.original_contribution))/(stock.original_contribution) * 100).toFixed(2);

    return (
        <FlexColumnLeftDiv key={stock.ticker}>
            <NormalText>{stock.name}</NormalText>
            <SubText>
                <Link href={`/stocks/${stock.ticker}`}>{stock.ticker}</Link>
                {diff > 0 ? <ColorText color="#00AD30"> (+{diff}%)</ColorText> : <ColorText color="#FF1D1D"> ({diff}%)</ColorText>}
            </SubText>
        </FlexColumnLeftDiv>
    )
});

function Portfolio() {
    // TODO - Connect this with the backend.
    // const token = localStorage.getItem('token');
    // const data = getPortfolio(token);
    

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
    let percentageDiff = ((diff/responseData.contribution) * 100).toFixed(2);

    return (
        <div>
            <Navigation />
            <PageContainer>
                <PageTitle>Your Portfolio</PageTitle>
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
                                ({diff > 0 ? ('+' + percentageDiff + '%') : (percentageDiff+ '%')})
                            </ColorText>
                        </SubText>
                        <SubText>
                            Contributions: ${responseData.contribution}
                            <br/>
                            Last Investment: {date}
                        </SubText>
                    </PortfolioValueContainer>
                </Container>
                <SectionRowDiv>
                        <Container flex_direction="column">
                            <SubTitle>
                                Best Performing Stocks
                            </SubTitle>
                            {bestStockSummary}
                        </Container>
                        <Container flex_direction="column">
                            <SubTitle>
                                Worst Performing Stocks
                            </SubTitle>
                            {worstStockSummary}
                        </Container>
                        <Container flex_direction="column">
                            <SubTitle>
                                Suggestions:
                            </SubTitle>
                            <NormalText>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                            </NormalText>
                        </Container>
                </SectionRowDiv>
                <StockTable data={stocksDummyData} headings={tableHeadings} place="portfolio"></StockTable>
            </PageContainer>
        </div>
        
    )
}

export default Portfolio;