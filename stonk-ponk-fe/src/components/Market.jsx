import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navigation from './Navigation';
import { Container, FilterContainer, SectionRowDiv, PageContainer } from '../css/Div';
import { ColorText, NormalText, PageTitle, SubText, SubTitle } from '../css/Text';
import Search from './Search';

import StockTable from './StockTable';

import { market } from '../services/market';

import Alert from '@material-ui/lab/Alert';
import { CircularProgress } from '@material-ui/core';

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
    const [losers, setLosers] = useState('Loading');
    const [gainers, setGainers] = useState('Loading');

    const history = useHistory();

    // Tracks whether there are errors - used for showing a banner to the user
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(''); 

    // Handle errors when they are returned by the fetch calls
    const handleError = useCallback((error) => {
        setError(true);
        if (error === "Expired token") {
            setErrorMsg("Your session has expired. Logging out...");
            setTimeout(() => {
                localStorage.removeItem('token');
                history.push('/');
            }, 3000);
        } else {
            setErrorMsg(error);
        }
    }, [history]);

    useEffect(() => {
        console.log("Page direction: ", pageDirection);
        if (pageDirection === 'right') {
            console.log("I am getting page: ", page);
            market.getMarketData('most_active', page).then(response => {
                console.log(response);
                setRows(rows => rows.concat(response));
                setMarketData(response);
            }).catch(error => {
                handleError(error);
            });
        } 
    }, [page, pageDirection, handleError]);

    useEffect(() => {
        market.getMarketData('losers', 0).then(response => {
            console.log("Losers: ", response);
            setLosers(response);
        }).catch(error => {
            handleError(error);
        });
    }, [history, handleError]);

    useEffect(() => {
        market.getMarketData('gainers', 0).then(response => {
            console.log("Gainers: ", response);
            setGainers(response);
        }).catch(error => {
            handleError(error);
        });
    }, [history, handleError]);

    return (
        <>
            <Navigation />
            {error && (
                <Alert variant="filled" severity="error">
                    {errorMsg}
                </Alert>
            )}
            <PageContainer>
                <PageTitle>Market</PageTitle>
                <FilterContainer>
                    <Search setResults={setRows} options={marketData} ></Search>
                </FilterContainer>
                {(gainers === 'Loading' || losers === 'Loading') &&
                    <CircularProgress />
                } 
                <div className="stock-container">
                    <StockTable data={rows} headings={headings} place="market" page={page} setPage={setPage} pageDirection={pageDirection} setPageDirection={setPageDirection}></StockTable>
                </div>
                <SectionRowDiv>
                    {gainers !== 'Loading' && (
                        <Container flex_direction="column">
                            <SubTitle>Top 10 Gainers</SubTitle>
                            <SubText>Based on daily change.</SubText>
                            {gainers.map((stock, index) => {
                                return(
                                    <div key={index}>
                                        <NormalText>{stock.name}</NormalText>
                                        <SubText>{stock.ticker}<ColorText color="#00AD30">{stock.change_perc > 0 ? `(+${stock.change_perc}%)`: `(${stock.change_perc}%)`}</ColorText></SubText>
                                    </div>
                                )
                            })}
                        </Container>
                    )}
                    
                    {losers !== 'Loading' && (
                        <Container flex_direction="column">
                            <SubTitle>Top 10 Losers</SubTitle>
                            <SubText>Based on daily change.</SubText>
                            {losers.map((stock, index) => {
                                return(
                                    <div key={index}>
                                        <NormalText>{stock.name}</NormalText>
                                        <SubText>{stock.ticker}<ColorText color="#e80000">{stock.change_perc > 0 ? `(+${stock.change_perc}%)`: `(${stock.change_perc}%)`}</ColorText></SubText>
                                    </div>
                                )
                            })}
                        </Container>
                    )}
                    
                </SectionRowDiv>
            </PageContainer>
        </>
    )
}

export default Market;


