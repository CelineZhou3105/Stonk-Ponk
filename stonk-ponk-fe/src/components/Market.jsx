import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import { Container, FilterContainer, SectionRowDiv, PageContainer } from '../css/Div';
import { ColorText, NormalText, PageTitle, SubText, SubTitle } from '../css/Text';
import Search from './Search';

import StockTable from './StockTable';

import Filter from './Filter';
import { market } from '../services/market';

// Headings for each table column
const headings = [
    { id: 'name', disablePadding: true, numeric: false, label: 'Name' },
    { id: 'performance', disablePadding: false, numeric: false, label: 'Performance' },
    { id: 'price', disablePadding: false, numeric: true, label: 'Current Price' },
];

function Market() {
    // Component will rerender upon filtering the rows
    const [marketData, setMarketData] = useState([]);
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [pageDirection, setPageDirection] = useState('right');
    const [losers, setLosers] = useState([]);
    const [gainers, setGainers] = useState([]);

    useEffect(() => {
        console.log("Page direction: ", pageDirection);
        if (pageDirection === 'right') {
            console.log("I am getting page: ", page);
            market.getMarketData('most_active', page).then(response => {
                console.log(response);
                setRows(rows => rows.concat(response));
                setMarketData(response);
            }).catch(error => {
                console.log(error);
            });
        } 
    }, [page, pageDirection]);

    useEffect(() => {
        market.getMarketData('losers', 0).then(response => {
            console.log("Losers: ", response);
            setLosers(response);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        market.getMarketData('gainers', 0).then(response => {
            console.log("Gainers: ", response);
            setGainers(response);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <>
            <Navigation />
            <PageContainer>
                <PageTitle>Market</PageTitle>
                <FilterContainer>
                    <Filter setState={setRows} data={marketData}></Filter>
                    <Search setResults={setRows} options={marketData} ></Search>
                </FilterContainer>
                <div className="stock-container">
                    <StockTable data={rows} headings={headings} place="market" page={page} setPage={setPage} pageDirection={pageDirection} setPageDirection={setPageDirection}></StockTable>
                </div>
                <SectionRowDiv>
                    <Container flex_direction="column">
                        <SubTitle>Top 10 Gainers</SubTitle>
                        <SubText>Based on daily change.</SubText>
                        {gainers.map((stock) => {
                            return(
                                <>
                                    <NormalText>{stock.name}</NormalText>
                                    <SubText>{stock.ticker}<ColorText color="#00AD30">{stock.change_perc > 0 ? `(+${stock.change_perc}%)`: `(${stock.change_perc}%)`}</ColorText></SubText>
                                </>
                            )
                        })}
                    </Container>
                    <Container flex_direction="column">
                        <SubTitle>Top 10 Losers</SubTitle>
                        <SubText>Based on daily change.</SubText>
                        {losers.map((stock) => {
                            return(
                                <>
                                    <NormalText>{stock.name}</NormalText>
                                    <SubText>{stock.ticker}<ColorText color="#e80000">{stock.change_perc > 0 ? `(+${stock.change_perc}%)`: `(${stock.change_perc}%)`}</ColorText></SubText>
                                </>
                            )
                        })}
                    </Container>
                </SectionRowDiv>
            </PageContainer>
        </>
    )
}

export default Market;


