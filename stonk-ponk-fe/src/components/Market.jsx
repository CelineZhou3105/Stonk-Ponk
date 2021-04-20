import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Navigation from './Navigation';
import StockTable from './StockTable';

import { market } from '../services/market';

import {
    Container,
    FilterContainer,
    PageContainer,
    SectionRowDiv
} from '../css/Div';
import { ColorText, NormalText, PageTitle, SubText, SubTitle } from '../css/Text';

import Alert from '@material-ui/lab/Alert';
import { CircularProgress } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField as AutocompleteTextField } from '@material-ui/core';

// Headings for each table column
const headings = [
    { id: 'name', disablePadding: true, numeric: false, label: 'Name' },
    { id: 'performance', disablePadding: false, numeric: false, label: 'Performance (100 Days)' },
    { id: 'price', disablePadding: false, numeric: true, label: 'Current Price' },
];

/**
 * Market Page - Page where users can see real stock data on the most active stocks in the market. 
 * @returns 
 */
function Market() {
    // Component will rerender upon filtering the rows
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [pageDirection, setPageDirection] = useState('right');
    const [losers, setLosers] = useState('Loading');
    const [gainers, setGainers] = useState('Loading');

    const history = useHistory();

    // Tracks whether there are errors - used for showing a banner to the user
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(''); 

    // User input into the search bar
    const [input, setInput] = useState(null); 

    // Options for stocks in the search bar
    const [stockOptions, setStockOptions] = useState([]);

    // Aborter for cancelling previous API calls
    const lastAbortController = useRef();

    // Makes an API call to retrieve search results when user has entered a ticker
    useEffect(() => {
        if (input !== null) {
            if (lastAbortController.current) {
                lastAbortController.current.abort();
            }
            // Create new AbortController for the new request and store it in the ref
            const currentAbortController = new AbortController();
            lastAbortController.current = currentAbortController;

            const currentPromise = market.checkTickerExists(input, currentAbortController)
            .then(response => response.json())
            
            currentPromise
            .then(res => {
                console.log(res);
                setStockOptions(res);
            }).catch(error => {
                // Do nothing - this means there are no search results, which is normal
            })
        }
    }, [input])

    // Get market news after the person clears the search bar, otherwise get news for the stock
    const handleInputChange = (event, value, reason) => {
        if (reason === "clear" ||  value === '') {
            // Set it back to market news
            setInput(null);
        } else {
            console.log("Getting results for...", value);
            setInput(value);
        }
    }

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

    // useEffect for gathering data about the most active stocks on each page of the table
    useEffect(() => {
        console.log("Page direction: ", pageDirection);
        if (pageDirection === 'right') {
            console.log("I am getting page: ", page);
            market.getMarketData('most_active', page).then(response => {
                console.log(response);
                setRows(rows => rows.concat(response));
            }).catch(error => {
                handleError(error);
            });
        } 
    }, [page, pageDirection, handleError]);

    // useEffect for gathering data about the market losers
    useEffect(() => {
        market.getMarketData('losers', 0).then(response => {
            console.log("Losers: ", response);
            setLosers(response);
        }).catch(error => {
            handleError(error);
        });
    }, [history, handleError]);

    // useEffect for gathering data about the market gainers
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
                <Alert onClose={() => setError(false)} variant="filled" severity="error">
                    {errorMsg}
                </Alert>
            )}
            <PageContainer>
                <PageTitle>Market</PageTitle>
                <FilterContainer>
                    <Autocomplete
                        style={{ width: 300 }}
                        options={stockOptions}
                        getOptionLabel={(option) => option.name}
                        onChange={(e, value) => { 
                            if (value !== null) {
                                history.push(`/stocks/${value.ticker}`);
                            }
                        }}
                        renderInput={(params) => <AutocompleteTextField {...params} label="Search for a particular stock..." variant="outlined" />}
                        onInputChange={(e, value, reason) => { 
                            console.log("Setting input to: ", value); 
                            handleInputChange(e, value, reason);
                        }}
                        noOptionsText="No stocks found."
                        filterOptions={x => x}
                    />
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
                            <Tooltip 
                                title='The top 10 stocks whose prices changes the most in the past day.'
                                placement="right"
                            >
                                <SubText margin="0 0 1em 0">*Based on daily change.</SubText>
                            </Tooltip>
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
                            <Tooltip 
                                title='The 10 worst stocks whose prices changed the most in the past day.'
                                placement="right"
                            >
                                <SubText margin="0 0 1em 0">*Based on daily change.</SubText>
                            </Tooltip>
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


