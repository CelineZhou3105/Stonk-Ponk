import React, { useEffect, useRef, useState } from 'react';

import Navigation from './Navigation';

import { market } from '../services/market';
import { getMarketNews, getNews } from '../services/news';

import { 
    Container,
    FlexRowDiv,
    NewsContainer,
    PageContainer 
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
            renderArticles(pageNum - 1);
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
            }).catch((e) => {
                console.log('Error: ', e, 'input: ', input);
            })
        }
    }, [input])

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
            setArticles([]);
            getTopStocksNews();
        } else {
            console.log("Getting results for...", value);
            setInput(value);
        }
    }

    // Runs once after initial render to populate news page
    useEffect(() => {
        getTopStocksNews();
    }, [])

    // Function to get the news for the most active stocks
    const getTopStocksNews = () => {
        getMarketNews()
        .then(response => {
            setArticles(response);
            if (response.length > 10) {
                setArticlesShown(response.slice(0, 10));
                setPages(Math.floor(response.length /10));

            } else {
                setArticlesShown(response);
                setPages(1);
            }
        }).catch(() => {
            alert("Error with getting market news");
        });
    }

    // Function to handle page changes
    const handlePageChange = (event, value) => {
        setPageNum(value);
        renderArticles(pageNum - 1);
    };

    return (
        <>
            <Navigation />
            <PageContainer>
                <PageTitle>News</PageTitle>
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
                        {articlesShown.map(article => {
                            return (
                                <NewsContainer>
                                    <div>
                                        <NormalText>{article.media}: <Link color="black" href={article.link} target="_blank">{article.title}</Link></NormalText>
                                        <SubText>{article.date}</SubText>
                                        <SubText>{article.description}</SubText>
                                    </div>
                                </NewsContainer>
                            );
                        })
                        }
                        <FlexRowDiv>
                            Page: {pageNum}
                            <Pagination count={pages} page={pageNum} onChange={handlePageChange}/>
                        </FlexRowDiv>
                    </Container>
                }
                {articles === null &&
                    <div>Loading...</div>
                }
            </PageContainer>
        </>
    )
}

export default News;