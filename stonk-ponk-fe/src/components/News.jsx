import React, { useEffect, useRef, useState } from 'react';
import Navigation from './Navigation';
import { Container, FlexRowDiv, NewsContainer, PageContainer } from "../css/Div";
import { Link, NormalText, PageTitle, SubText } from "../css/Text";

import { TextField as AutocompleteTextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { market } from '../services/market';

import { getNews, getMarketNews } from '../services/news';

import Pagination from '@material-ui/lab/Pagination';

function News() {
    // User input into the search bar
    const [input, setInput] = useState(null); 
    const lastAUSPromise = useRef();
    const lastUSPromise = useRef();
    const lastPromise = useRef();

    // Aborter for cancelling previous API calls
    const lastAbortController = useRef();

    // Options in the search bar
    const [stockOptions, setStockOptions] = useState([]);
    const [selectedStock, setSelectedStock] = useState('');
    const [articles, setArticles] = useState(null);
    const [articlesShown, setArticlesShown] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [pages, setPages] = useState(0);

    function getNewsForStock() {
        console.log("Finding news for ", selectedStock);
        getNews(selectedStock.ticker).then(response => {
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

    // useEffect(() => {
    //     const currentUSPromise = market.getStockDetail(input);
    //     // store the promise to the ref
    //     lastUSPromise.current = currentUSPromise;

    //     currentUSPromise
    //     .then(response => response.json())
    //     .then(res => {
    //         if (currentUSPromise === lastUSPromise.current) {
    //             console.log("Setting stock options to have US stock", res);
    //             setStockOptions(currStocks => [...currStocks, res]);
    //         }
    //     }).catch((e) => {
    //         console.log('Could not find stock on US market');
    //     }).finally(() => {
    //         console.log("RESULTS AFTER US", stockOptions);
    //     })
    // }, [input])

    useEffect(() => {
        if (lastAbortController.current) {
            lastAbortController.current.abort();
        }

        // Create new AbortController for the new request and store it in the ref
        const currentAbortController = new AbortController();
        lastAbortController.current = currentAbortController;

        const currentPromise = market.checkTickerExists(input, currentAbortController)
        .then(response => response.json())
        .then(res => {
            setStockOptions(currStocks => [...currStocks,res]);
        }).catch((e) => {
            console.log('Could not find stock on US market');
        })
    }, [input])

    // useEffect(() => {
    //     setStockOptions([]);
    //     const currentAUSPromise =  market.getStockDetail(input+".AX");
    //     lastAUSPromise.current = currentAUSPromise;

    //     currentAUSPromise
    //     .then(response => response.json())
    //     .then(res => {
    //         if (currentAUSPromise === lastAUSPromise.current) {
    //             console.log("Setting stock options to have", res);
    //             setStockOptions(currStocks => [...currStocks, res]);
    //         }
    //     }).catch((e) => {
    //         console.log('Could not find stock on AUS market');
    //     }).finally(()=> {
    //         console.log("RESULTS:", stockOptions);
    //     })
    // }, [input])

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

    // Function to get the news for the market
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
                    onChange={(e, value) => { setSelectedStock(value); } }
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
                {articles && articles.length > 0 
                    ? <Container flex_direction="column" gap="1em">
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
                : <div>Loading...</div>
                }
            </PageContainer>
        </>
    )
}

export default News;