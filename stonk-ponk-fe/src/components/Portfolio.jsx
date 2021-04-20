import React, { useCallback, useEffect, useState } from 'react';

import Navigation from './Navigation';
import PortfolioChart from './PortfolioChart';
import StockTable from './StockTable';

import { portfolio } from '../services/portfolio';

import {
    Container,
    LeftButtonContainer,
    ModalContainer,
    ModalContent,
    ModalStocksContainer,
    PageContainer,
    PortfolioHealthContainer,
    PortfolioValueContainer,
    SectionRowDiv
} from '../css/Div';
import { 
    PortfolioSuggestionSubText,
    PortfolioSuggestionTitle,
    SubText,
    SubTitle,
    NormalText,
    PageTitle, 
    PortfolioValue,
    ColorText,
    PortfolioHealthText,
    ModalSuggestionTitle
} from '../css/Text';
import { CustomButton, CloseButton } from '../css/Button';

import ProgressBar from 'react-animated-progress-bar';
import { Chip, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { Tooltip } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

// Headings for each table column
const tableHeadings = [
    { id: 'name', disablePadding: true, numeric: false, label: 'Name' },
    { id: 'performance', disablePadding: false, numeric: false, label: 'Performance (Month)' },
    { id: 'date', disablePadding: true, numeric: true, label: 'Purchase Date' },
    { id: 'purchase_price', disablePadding: false, numeric: true, label: 'Purchase Price (AUD)' },
    { id: 'units', disablePadding: false, numeric: false, label: 'Units Owned' },
    { id: 'current_price', disablePadding: false, numeric: true, label: 'Current Price (AUD)' },
    { id: 'value', disablePadding: false, numeric: true, label: 'Total Value (AUD)' },
];

// Suggestions based on your portfolio makeup
const noStocksSuggestion = `
After you make your first purchase and add it to Stonk Ponk, you will have an active Portfolio!
This means that you will have a Portfolio value which will vary based on stock price movements. 
Your portfolio will also be eligible to receive personalized portfolio health calculations and suggestions.`

const stocksSuggestion = `
Every time you purchase shares in a stock your portfolio value will be increased to reflect the addition of the new shares. 
If you purchase shares of a stock that you do not currently own, it will reduce the % stake of your existing stocks in the portfolio make up.
If you purchase shares of a stock that you currently own, the % stake of that stock in your portfolio make up will increase. The purchase price will be updated to be the weighted average price of your purchases. This calculation will be based on the volume of shares that have been bought in each instance. 
Depending on the type of stocks that you purchase your portfolio’s risk, profit, and volatility will be impacted. The portfolio health section will be updated after each purchase to reflect these changes.
`
const sellNoStocksSuggestion =`You have no stocks that you own. You cannot sell shares of stocks that you do not own!`

const sellStocksSuggestion =`Under the New Business Tax System (Capital Gains Tax) Act 1999, Capital Gains Tax is payable on all profits made when you sell shares of a stock.`

const lessThanOneYearSuggestion = `If you sell these stocks, you will have to pay full taxation on any profits made. 
This is because you are selling the shares after holding them for less than 12 months. these shares are not eligible for a Capital Gains Tax exemption.`

const moreThanOneYearSuggestion = `If you sell shares of these stocks, you are eligible for a 50% discount on your capital gains tax. 
This is because you have held them for longer than 12 months.`

const sellStocksSuggestionEnd = `Every time you sell shares in a stock your portfolio value will be decreased to reflect the removal of these shares. 
When you sell shares of a stock that you currently own, the % stake of that stock in your portfolio make up will decrease (or be completely removed if you sell all owned shares). 
Depending on the type of stocks that you sell, your portfolio’s risk, profit, and volatility will be impacted. The portfolio health section will be updated after each sale to reflect these changes.`

/**
 * Portfolio page - Consists of information about the user's portfolio (stocks they own). This page describes
 * the portfolio makeup, cumulative value, health scores, best and worst stocks and any suggestions to improve
 * their portfolio. Also includes an editable stock table for users to add/remove/edit stocks in their portfolio.
 */
function Portfolio() {

    // Data on the user's portfolio
    const [chartData, setChartData] = useState('Loading');
    const [portfolioValue, setPortfolioValue] = useState(0);
    const [lastContribution, setLastContribution] = useState(0);
    const [profit, setProfit] = useState(0);
    const [gainers, setGainers] = useState('Loading');
    const [losers, setLosers] = useState('Loading');
    const [portfolioStocks, setPortfolioStocks] = useState('Loading');
    const [page, setPage] = useState(0);
    const [health, setHealth] = useState('Loading');
    const [suggestions, setSuggestions] = useState('Loading');

    // Tracks whether there are errors, shows a banner if there is
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Tracks the modals
    const [buyNow, setBuyNow] = useState(false);
    const [sellNow, setSellNow] = useState(false);

    const history = useHistory();

    // Handles the errors when making api calls
    const handleError = useCallback((error) => {
        setError(true);
        if (error === "Expired token") {
            setErrorMsg('Your session has expired. Logging out...');
            setTimeout(() => {
                localStorage.removeItem('token');
                history.push('/');
            }, 3000);
        } else {
            console.log("An error occured while fetching market data. Please refresh."); // TODO - remove this
            setError(true);
            setErrorMsg(error);
        }
    }, [history]);

    /* useEffect to get the summary for portfolio */
    useEffect(() => {
        portfolio.getPortfolioSummary().then(response => {
            setChartData(response.stocks);
            setPortfolioValue(response.value.toFixed(2));
            setLastContribution(response.last_update);
            setProfit(response.profit);
        }).catch(error => {
            handleError(error);
        });
    }, [handleError]);

    /* useEffect to get the entire portfolio stocks */
    useEffect(() => {
        portfolio.getPortfolioDetails().then(response => {
            setPortfolioStocks(response.stocks);
        }).catch(error => {
            handleError(error);
        });
    }, [handleError]);

    /* useEffect to get the best stocks for portfolio */
    useEffect(() => {
        portfolio.getPortfolioBest(5).then(response => {
            setGainers(response.stocks);
        }).catch(error => {
            handleError(error);
        });
    }, [handleError]);

    /* useEffect to get the worst stocks for portfolio */
    useEffect(() => {
        portfolio.getPortfolioWorst(5).then(response => {
            setLosers(response.stocks);
        }).catch(error => {
            handleError(error);
        });
    }, [handleError]);

    /* useEffect to get the health for portfolio */
    useEffect(() => {
        portfolio.getPortfolioHealth().then(response => {
            console.log(response);
            setHealth(response.scores);
            setSuggestions(response.suggestions);
        }).catch(error => {
            handleError(error);
        });
    }, [handleError]);

    const progressColours = {
        poor: '#ca0902',
        fair: '#f58b00',
        good: '#f5c800',
        excellent: '#0cac64',
    }

    // Filters the user's portfolio to get stocks purchased more than a year ago
    function getOldStocks() {
        const oldStocks = portfolioStocks.filter(stock => {
            const purchaseDate = new Date(stock.first_purchase_date);
            const diffTime = Date.now() - purchaseDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays >= 365) {
                return true;
            } else {
                return false;
            }
        })
        return oldStocks;
    }

    // Filters the user's portfolio to get stocks purchased less than a year ago
    function getYoungStocks() {
        const newStocks = portfolioStocks.filter(stock => {
            const purchaseDate = new Date(stock.first_purchase_date);
            const diffTime = Date.now() - purchaseDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays < 365) {
                return true;
            } else {
                return false;
            }
        })
        return newStocks;
    }

    return (
        <div>
            <Navigation />
            { error && (
                <Alert variant="filled" severity="error">
                    {errorMsg}
                </Alert>
            )}
            <PageContainer>
                <PageTitle>Your Portfolio</PageTitle>
                {(chartData === 'Loading' || gainers === 'Loading' || losers === 'Loading' || portfolioStocks === 'Loading') &&
                    <CircularProgress />
                }  
                {chartData !== 'Loading' && (
                    <Container align_items="center" justify_content="space-evenly">
                        <PortfolioChart stockData={chartData} portfolioValue={portfolioValue} />
                        <PortfolioValueContainer>
                            <SubTitle>Portfolio Value</SubTitle>
                            <Tooltip title='This is the current value of the portfolio after all US stocks have been converted to AUD' placement="bottom">
                                <PortfolioValue>A${portfolioValue}</PortfolioValue>
                            </Tooltip>
                            <SubText color="#000000">
                                {/* {'TODO DAILY CHANGE '} */}
                                {/* <ColorText color="#00AD30">
                                        ({profit > 0 ? ('+TODO (DAILY CHANGE PERC)%') : ('TODO (DAILY CHANGE PERC)%')})
                                    </ColorText> */}
                            </SubText>
                            <Tooltip title={`Contributions - How much you have invested into your portfolio.`} placement="right">
                                <SubText margin="0">Contributions: ${(portfolioValue - profit).toFixed(2)}</SubText>
                            </Tooltip>
                            <Tooltip title={`Last Investment - Last time you made an investment.`} placement="right">
                                <SubText margin="0 0 1em 0">Last Investment: {new Date(lastContribution).toLocaleDateString()}</SubText>
                            </Tooltip>
                        </PortfolioValueContainer>
                        <PortfolioHealthContainer>
                            <SubTitle>Portfolio Health</SubTitle>
                            <SubText>This section describes your portfolio health.</SubText>
                            {health !== 'Loading' ? 
                                <>
                                    <Tooltip title='Measures the diversification of your portfolio in comparison to the S&P500 (market)' placement='right'>
                                        <PortfolioHealthText>Beta Score</PortfolioHealthText>
                                    </Tooltip>
                                    <ProgressBar
                                        width="100%"
                                        height="10px"
                                        rect
                                        fontColor="gray"
                                        percentage={health.beta_score.toString()}
                                        rectPadding="1px"
                                        rectBorderRadius="20px"
                                        trackPathColor="transparent"
                                        bgColor="#333333"
                                        trackBorderColor="grey"
                                        defColor={progressColours}
                                    />
                                    <Tooltip title={`Measures the profitability of your portfolio in comparison to the S&P500 (market)`} placement='right'>
                                        <PortfolioHealthText>Profit Score</PortfolioHealthText>
                                    </Tooltip>
                                    <ProgressBar
                                        width="100%"
                                        height="10px"
                                        rect
                                        fontColor="gray"
                                        percentage={health.profit_score.toString()}
                                        rectPadding="1px"
                                        rectBorderRadius="20px"
                                        trackPathColor="transparent"
                                        bgColor="#333333"
                                        trackBorderColor="grey"
                                        defColor={progressColours}
                                    />
                                    <Tooltip title={`Measures how much your portfolio's value shifts in proportion to changes in the S&P500 (market)`} placement='right'>
                                        <PortfolioHealthText>Volatility Score</PortfolioHealthText>
                                    </Tooltip>
                                    <ProgressBar
                                        width="100%"
                                        height="10px"
                                        rect
                                        fontColor="gray"
                                        percentage={health.volatility_score.toString()}
                                        rectPadding="1px"
                                        rectBorderRadius="20px"
                                        trackPathColor="transparent"
                                        bgColor="#333333"
                                        trackBorderColor="grey"
                                        defColor={progressColours}
                                    />
                                </>
                            : <div>Loading health...</div>
                            }
                        </PortfolioHealthContainer>
                    </Container>
                )}
                <SectionRowDiv>
                    {gainers !== 'Loading' && (
                        <Container flex_direction="column">
                            <SubTitle>Best Performing Stocks</SubTitle>
                            <Tooltip 
                                title='These are your top 10 performing stocks based on profit margin. We calculate it based on (current price - purchase price)/(purchase price).'
                                placement="right"
                            >
                                <SubText margin="0 0 1em 0">*Based on profit margin.</SubText>
                            </Tooltip>
                            {gainers.map((stock) => {
                                return (
                                    <>
                                        <NormalText>{stock.name}</NormalText>
                                        <SubText>{stock.ticker}<ColorText color="#00AD30">({stock.profit_margin > 0 ? '+' : ''}{stock.profit_margin.toFixed(2)}%)</ColorText></SubText>
                                    </>
                                )
                            })}
                        </Container>
                    )}
                    
                    {losers !== 'Loading' && (
                        <>
                            <Container flex_direction="column">
                                <SubTitle>Worst Performing Stocks</SubTitle>
                                <Tooltip 
                                    title='These are your 10 worst performing stocks based on profit margin. We calculate it based on (current price - purchase price)/(purchase price).'
                                    placement="right"
                                >
                                    <SubText margin="0 0 1em 0">*Based on profit margin.</SubText>
                                </Tooltip>
                                {losers.map((stock) => {
                                    return (
                                        <>
                                            <NormalText>{stock.name}</NormalText>
                                            <SubText>{stock.ticker}<ColorText color="#e80000">({stock.profit_margin > 0 ? '+' : ''}{stock.profit_margin.toFixed(2)}%)</ColorText></SubText>
                                        </>
                                    )
                                })}
                            </Container>
                            <Container flex_direction="column">
                                <SubTitle>
                                    Suggestions
                                </SubTitle>
                                <PortfolioSuggestionTitle>Beta Score</PortfolioSuggestionTitle>
                                <PortfolioSuggestionSubText>{suggestions[0]}</PortfolioSuggestionSubText>
                                <PortfolioSuggestionTitle>Profit Score</PortfolioSuggestionTitle>
                                <PortfolioSuggestionSubText>{suggestions[1]}</PortfolioSuggestionSubText>
                                <PortfolioSuggestionTitle>Volatility Score</PortfolioSuggestionTitle>
                                <PortfolioSuggestionSubText>{suggestions[2]}</PortfolioSuggestionSubText>
                            </Container>
                        </>
                    )}
                </SectionRowDiv>
                
                
                {portfolioStocks !== 'Loading' && (
                    <>
                        <LeftButtonContainer>
                            <CustomButton onClick={() => setBuyNow(true)}><ShoppingCartIcon />What if I buy now?</CustomButton>
                            <CustomButton onClick={() => setSellNow(true)}><AttachMoneyIcon />What if I sell now?</CustomButton>
                        </LeftButtonContainer>
                        <StockTable data={portfolioStocks} headings={tableHeadings} place="portfolio" setRows={setPortfolioStocks} page={page} setPage={setPage}></StockTable>
                    </>
                )}

                {buyNow &&
                    <ModalContainer>
                        <ModalContent>
                            <CloseButton onClick={() => setBuyNow(false)} >&times;</CloseButton>
                            <PageTitle>What if I buy now?<ShoppingCartIcon/></PageTitle>
                            {portfolioStocks.length === 0 
                                ? noStocksSuggestion
                                : stocksSuggestion
                            }   
                        </ModalContent>
                    </ModalContainer>
                }
                {sellNow &&
                    <ModalContainer>
                        <ModalContent height="700px">
                            <CloseButton onClick={() => setSellNow(false)} >&times;</CloseButton>
                            <PageTitle>What if I sell now?<AttachMoneyIcon/></PageTitle>
                            
                            {sellStocksSuggestion}
                            {portfolioStocks.length === 0 && sellNoStocksSuggestion} 
                            {portfolioStocks.length > 0 && getOldStocks().length > 0 && (
                                <>
                                    <ModalSuggestionTitle>Stocks held for more than one year</ModalSuggestionTitle>
                                    {lessThanOneYearSuggestion}
                                    <ModalStocksContainer>
                                    {getOldStocks().map(stock => {
                                        return (<Chip color="primary" label={stock.name} />)
                                    })}
                                    </ModalStocksContainer>
                                </>
                            )} 
                            {portfolioStocks.length > 0 && getYoungStocks().length > 0 && (
                                <>
                                    <ModalSuggestionTitle>Stocks held for less than one year</ModalSuggestionTitle>
                                    {moreThanOneYearSuggestion}
                                    <ModalStocksContainer>
                                        {getYoungStocks().map(stock => {
                                            return (<Chip color="primary" label={stock.name} />);
                                        })}
                                    </ModalStocksContainer>
                                </>
                            )}
                            <ModalSuggestionTitle>Changes to your portfolio health</ModalSuggestionTitle>
                            {sellStocksSuggestionEnd} 
                        </ModalContent>
                    </ModalContainer>
                }
                
            </PageContainer>
        </div>

    )
}

export default Portfolio;
