import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Navigation from './Navigation';

import { market } from '../services/market';
import { getMarketNews, getNews } from '../services/news';

import { 
    Container,
    FlexRowLeftDiv,
    NewsContainer,
    PageContainer, 
    SectionRowDiv
} from "../css/Div";
import {
    Link,
    NormalText,
    PageTitle,
    SubText
} from "../css/Text";

import { TextField as AutocompleteTextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pagination from '@material-ui/lab/Pagination';
import Alert from '@material-ui/lab/Alert';
import { CircularProgress } from '@material-ui/core';


function News() {
    // User input into the search bar
    const [input, setInput] = useState(null); 

    // Aborter for cancelling previous API calls
    const lastAbortController = useRef();

    // Options for stocks in the search bar
    const [stockOptions, setStockOptions] = useState([]);

    // News articles
    const [articles, setArticles] = useState(null);
    const [articlesShown, setArticlesShown] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [pages, setPages] = useState(0);

    const history = useHistory();

    // Tracks when errors occurs - for showing error banners to the user
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

    // Gets the news for an individual stock once the user has selected a stock
    function getNewsForStock(selectedStock) {
        setArticles(null);
        console.log("Finding news for ", selectedStock);
        getNews(selectedStock).then(response => {
            console.log(response);
            setArticles(response);
            if (response.length > 10) {
                setArticlesShown(response.slice(0, 10));
                setPages(Math.floor(response.length /10));

            } else {
                setArticlesShown(response);
                setPages(1);
            }
            setPageNum(1);
        }).catch(error => {
            handleError(error);
        })
    }

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
    }, [input, handleError])

    function renderArticles (page) {
        const start = page * 10;
        const end = page * 10 + 10;
        
        const newArticles = articles.slice(start, end);
        setArticlesShown(newArticles); 
    }
    
    // Get market news after the person clears the search bar, otherwise get news for the stock
    const handleInputChange = (event, value, reason) => {
        if (reason === "clear" ||  value === '') {
            // Set it back to market news
            setArticles(null);
            setInput(null);
            getTopStocksNews();
        } else {
            console.log("Getting results for...", value);
            setInput(value);
        }
    }

    // Function to get the news for the most active stocks
    const getTopStocksNews = useCallback(() => {
        getMarketNews()
        .then(response => {
            setArticles(response);
            if (response.length > 10) {
                const newArticles = response.slice(0, 10);
                console.log(newArticles);
                setArticlesShown(response.slice(0, 10));
                setPages(Math.floor(response.length /10));

            } else {
                setArticlesShown(response);
                setPages(1);
            }
        }).catch((error) => {
            handleError(error);
        });
    }, [handleError]);

    // Function to handle page changes
    const handlePageChange = (event, value) => {
        setPageNum(value);
        renderArticles(value - 1);
    };

    // Runs once after initial render to populate news page
    useEffect(() => {
        getTopStocksNews();
    }, [getTopStocksNews])

    return (
        <>
            <Navigation />
            {error && (
                <Alert variant="filled" severity="error">
                    {errorMsg}
                </Alert>
            )}
            <PageContainer>
                <PageTitle>News</PageTitle>
                <SubText>Don't know the ticker? Find it on: <Link href="https://www.marketwatch.com/tools/quotes/lookup.asp">Market Watch</Link></SubText>
                <Autocomplete
                    options={stockOptions}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, value) => { 
                        if (value !== null) {
                            getNewsForStock(value.ticker);
                        }
                    }}
                    style={{ width: '100%' }}
                    renderInput={(params) => <AutocompleteTextField {...params} label="Enter your ticker..." variant="outlined" />}
                    onInputChange={(e, value, reason) => { 
                        console.log("Setting input to: ", value); 
                        handleInputChange(e, value, reason);
                    }}
                    noOptionsText="No stocks found."
                    filterOptions={x => x}
                />
                {input === null 
                    ? <PageTitle>Market News for Most Active Stocks</PageTitle>
                    : <PageTitle>Market News for {input}</PageTitle>
                }
                {articles && articles.length === 0 &&
                    <div>No search results.</div>
                }
                {articles && articles.length > 0 &&
                    <Container flex_direction="column" gap="1em">
                        {articlesShown.map((article, index) => {
                            return (
                                <NewsContainer key={index}>
                                    <div>
                                        <NormalText><Link color="black" href={article.link} target="_blank">{article.title}</Link></NormalText>
                                        <SubText>{article.published}</SubText>
                                        <SubText>{article.summary}...</SubText>
                                    </div>
                                </NewsContainer>
                            );
                        })
                        }
                        <FlexRowLeftDiv>
                            Page: {pageNum}
                            <Pagination count={pages} page={pageNum} onChange={handlePageChange}/>
                        </FlexRowLeftDiv>
                    </Container>
                }
                {articles === null &&
                    <SectionRowDiv>
                        <CircularProgress />
                        Loading...
                    </SectionRowDiv>
                }
            </PageContainer>
        </>
    )
}

export default News;