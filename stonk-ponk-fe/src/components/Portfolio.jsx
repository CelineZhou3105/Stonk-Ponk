import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';

// import { getPortfolio } from '../services/portfolio';

import { FilterContainer, FlexColumnLeftDiv, PageContainer, Container, PortfolioValueContainer, SectionRowDiv } from '../css/Div';
import { Link, SubText, SubTitle, NormalText, PageTitle, PortfolioValue, ColorText } from '../css/Text';

import Chart from "react-google-charts";

import StockTable from './StockTable';
import Filter from './Filter';

import { portfolio } from '../services/portfolio';

import PortfolioChart from './PortfolioChart';

// Headings for each table column
const tableHeadings = [
    { id: 'name', disablePadding: true, numeric: false, label: 'Name' },
    { id: 'performance', disablePadding: false, numeric: false, label: 'Performance' },
    { id: 'date', disablePadding: true, numeric: true, label: 'Purchase Date' },
    { id: 'purchase_price', disablePadding: false, numeric: true, label: 'Purchase Price' },
    { id: 'units', disablePadding: false, numeric: false, label: 'Units Owned' },
    { id: 'current_price', disablePadding: false, numeric: true, label: 'Current Price' },
    { id: 'value', disablePadding: false, numeric: true, label: 'Total Value' },
];

const stocksDummyData = [
    { name: 'Wesfarmers', ticker: 'WES', performance: 'graph', price: 590.48, vwap: 290.93, sector: 'aus', type: 'etf', volume: 5, purchase_price: 60.000, last_purchased: 1612962000, original_contribution: 300.00},
    { name: 'Atlassian', ticker: 'TEAM', performance: 'graph', price: 300.42, vwap: 290.93, sector: 'aus', type: 'etf', volume: 5, purchase_price: 16.00, last_purchased: 1613912400, original_contribution: 80.00},
    { name: 'Alphabet Inc Class C', ticker: 'GOOG', performance: 'graph', vwap: 290.93, price: 2061.92, sector: 'aus', type: 'etf', volume: 3, purchase_price: 300.00, last_purchased: 1613912400, original_contribution: 900.00},
    { name: 'Kogan.com Ltd', ticker: 'KGN', performance: 'graph', price: 2061.92, vwap: 900.93, sector: 'aus', type: 'stock', volume: 5, purchase_price: 180.00, last_purchased: 1614344400, original_contribution: 900.00},
    { name: 'BHP Group', ticker: 'BHP', performance: 'graph', price: 2399.32, vwap: 1000.93, sector: 'aus', type: 'stock', volume: 3, purchase_price: 300.00, last_purchased: 1614517200, original_contribution: 900.00},
    { name: 'Santos Limited', ticker: 'STO', performance: 'graph', price: 499.00, vwap: 250.93, sector: 'aus', type: 'stock', volume: 5, purchase_price: 180.00, last_purchased: 1614517200, original_contribution: 900.00},
];

const responseData = {
    stocks: stocksDummyData,
    contribution: 20800.20,
    best_performing: [
        { name: 'Kogan.com Ltd', ticker: 'KGN', performance: 'graph', price: 2061.92, vwap: 290.93, sector: 'aus', type: 'stock', units_owned: 5, last_purchased: 1614344400, original_contribution: 900.00},
        { name: 'BHP Group', ticker: 'BHP', performance: 'graph', price: 2399.32, vwap: 290.93, sector: 'aus', type: 'stock', units_owned: 3, last_purchased: 1614517200, original_contribution: 900.00},
        { name: 'Alphabet Inc Class C', ticker: 'GOOG', performance: 'graph',  vwap: 290.93, price: 2061.92, sector: 'aus', type: 'etf', units_owned: 3, last_purchased: 1613912400, original_contribution: 900.00},
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

    const [chartData, setChartData] = useState([]);
    const [portfolioValue, setPortfolioValue] = useState(0);
    const [lastContribution, setLastContribution] = useState(0);
    const [profit, setProfit] = useState(0);
    const [gainers, setGainers] = useState([]);
    const [losers, setLosers] = useState([]);

    /* useEffect to get the summary for portfolio */
    useEffect(() => {
        const token = localStorage.getItem('token');
        portfolio.getPortfolioSummary(token).then(response => {
            console.log(response);
            setChartData(response.stocks);
            setPortfolioValue(response.value);
            setLastContribution(response.last_update);
            setProfit(response.profit);
        });
    }, []);

    /* useEffect to get the best stocks for portfolio */
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     portfolio.getPortfolioBest(token, 5).then(response => {
    //         console.log(response);
    //         setGainers(response.stocks);
    //     });
    // }, []);

    // /* useEffect to get the worst stocks for portfolio */
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     portfolio.getPortfolioWorst(token, 5).then(response => {
    //         console.log(response);
    //         setLosers(response.stocks);
    //     });
    // }, []);

    const [rows, setRows] = useState(stocksDummyData);
    
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
                    <PortfolioChart stockData={stocksDummyData} portfolioValue={25000} />
                    <PortfolioValueContainer>
                        <SubTitle>Portfolio Value</SubTitle>
                        <PortfolioValue>A${portfolioValue}</PortfolioValue>
                        <SubText color="#000000">
                            {diff + ' '}
                            <ColorText color="#00AD30">
                                ({diff > 0 ? ('+' + percentageDiff + '%') : (percentageDiff+ '%')})
                            </ColorText>
                        </SubText>
                        <SubText>
                            Contributions: ${portfolioValue - profit}
                            <br/>
                            Last Investment: {new Date(lastContribution).toLocaleDateString()}
                        </SubText>
                    </PortfolioValueContainer>
                </Container>
                <SectionRowDiv>
                        <Container flex_direction="column">
                            <SubTitle>
                                Best Performing Stocks
                            </SubTitle>
                            {bestStockSummary}
                            {/* {gainers.map((stock) => {
                                return(
                                    <>
                                        <NormalText>{stock.name}</NormalText>
                                        <SubText>{stock.ticker}<ColorText color="#00AD30">(+{stock.change_perc}%)</ColorText></SubText>
                                    </>
                                )
                            })} */}
                        </Container>
                        <Container flex_direction="column">
                            <SubTitle>
                                Worst Performing Stocks
                            </SubTitle>
                            {worstStockSummary}
                            {/* {losers.map((stock) => {
                                return(
                                    <>
                                        <NormalText>{stock.name}</NormalText>
                                        <SubText>{stock.ticker}<ColorText color="#e80000">(+{stock.change_perc}%)</ColorText></SubText>
                                    </>
                                )
                            })} */}
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
                <FilterContainer>
                    <Filter setState={setRows} data={stocksDummyData}></Filter>
                </FilterContainer>
                <StockTable data={rows} headings={tableHeadings} place="portfolio" setRows={setRows} page={0} setPage={() => {}}></StockTable>
            </PageContainer>
        </div>
        
    )
}

export default Portfolio;