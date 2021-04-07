import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';

import { FilterContainer, PageContainer, Container, PortfolioValueContainer, SectionRowDiv } from '../css/Div';
import { SubText, SubTitle, NormalText, PageTitle, PortfolioValue, ColorText } from '../css/Text';

import StockTable from './StockTable';
import Filter from './Filter';

import { portfolio } from '../services/portfolio';

import PortfolioChart from './PortfolioChart';
import { CircularProgress } from '@material-ui/core';

// Headings for each table column
const tableHeadings = [
    { id: 'name', disablePadding: true, numeric: false, label: 'Name' },
    { id: 'performance', disablePadding: false, numeric: false, label: 'Performance (Month)' },
    { id: 'date', disablePadding: true, numeric: true, label: 'Purchase Date' },
    { id: 'purchase_price', disablePadding: false, numeric: true, label: 'Purchase Price' },
    { id: 'units', disablePadding: false, numeric: false, label: 'Units Owned' },
    { id: 'current_price', disablePadding: false, numeric: true, label: 'Current Price' },
    { id: 'value', disablePadding: false, numeric: true, label: 'Total Value' },
];


function Portfolio() {

    const [chartData, setChartData] = useState('Loading');
    const [portfolioValue, setPortfolioValue] = useState(0);
    const [lastContribution, setLastContribution] = useState(0);
    const [profit, setProfit] = useState(0);
    const [gainers, setGainers] = useState('Loading');
    const [losers, setLosers] = useState('Loading');
    const [portfolioStocks, setPortfolioStocks] = useState('Loading');
    const [page, setPage] = useState(0);

    const token = localStorage.getItem('token');

    /* useEffect to get the summary for portfolio */
    useEffect(() => {
        portfolio.getPortfolioSummary(token).then(response => {
            setChartData(response.stocks);
            setPortfolioValue(response.value.toFixed(2));
            setLastContribution(response.last_update);
            setProfit(response.profit);
        })
    }, [token]);


    /* useEffect to get the entire portfolio stocks */
    useEffect(() => {
        portfolio.getPortfolioDetails(token).then(response => {
            setPortfolioStocks(response.stocks);
        });
    }, [token]);

    // /* useEffect to get the best stocks for portfolio */
    useEffect(() => {
        portfolio.getPortfolioBest(token, 5).then(response => {
            setGainers(response.stocks);
        });
    }, [token]);

    // // /* useEffect to get the worst stocks for portfolio */
    useEffect(() => {
        portfolio.getPortfolioWorst(token, 5).then(response => {
            setLosers(response.stocks);
        });
    }, [token]);

    return (
        <div>
            <Navigation />
            <PageContainer>
                <PageTitle>Your Portfolio</PageTitle>
                {(chartData !== 'Loading' && gainers !== 'Loading' && losers !== 'Loading' && portfolioStocks !== 'Loading') ?
                    <>
                        <Container align_items="center" justify_content="space-evenly">
                            <PortfolioChart stockData={chartData} portfolioValue={portfolioValue} />
                            <PortfolioValueContainer>
                                <SubTitle>Portfolio Value</SubTitle>
                                <PortfolioValue>A${portfolioValue}</PortfolioValue>
                                <SubText color="#000000">
                                    {/* {'TODO DAILY CHANGE '} */}
                                    {/* <ColorText color="#00AD30">
                                            ({profit > 0 ? ('+TODO (DAILY CHANGE PERC)%') : ('TODO (DAILY CHANGE PERC)%')})
                                        </ColorText> */}
                                </SubText>
                                <SubText>
                                    Contributions: ${(portfolioValue - profit).toFixed(2)}
                                    <br />
                                        Last Investment: {new Date(lastContribution).toLocaleDateString()}
                                </SubText>
                            </PortfolioValueContainer>
                        </Container>
                        <SectionRowDiv>
                            <Container flex_direction="column">
                                <SubTitle>Best Performing Stocks</SubTitle>
                                <SubText>Based on profit margin.</SubText>
                                {gainers.map((stock) => {
                                    return (
                                        <>
                                            <NormalText>{stock.name}</NormalText>
                                            <SubText>{stock.ticker}<ColorText color="#00AD30">(+{stock.profit_margin.toFixed(2)}%)</ColorText></SubText>
                                        </>
                                    )
                                })}
                            </Container>
                            <Container flex_direction="column">
                                <SubTitle>Worst Performing Stocks</SubTitle>
                                <SubText>Based on profit margin.</SubText>
                                {losers.map((stock) => {
                                    return (
                                        <>
                                            <NormalText>{stock.name}</NormalText>
                                            <SubText>{stock.ticker}<ColorText color="#e80000">(+{stock.profit_margin.toFixed(2)}%)</ColorText></SubText>
                                        </>
                                    )
                                })}
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
                            <Filter setState={setPortfolioStocks} data={portfolioStocks}></Filter>
                        </FilterContainer>

                        <StockTable data={portfolioStocks} headings={tableHeadings} place="portfolio" setRows={setPortfolioStocks} page={page} setPage={setPage}></StockTable>
                    </>
                    : <CircularProgress />
                }

            </PageContainer>
        </div>

    )
}

export default Portfolio;