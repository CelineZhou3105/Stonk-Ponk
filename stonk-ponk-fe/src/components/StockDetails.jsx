import React, { useEffect, useState } from 'react';

import { CustomButton } from '../css/Button';
import StockDetailsChart from './StockDetailsChart';
import Navigation from './Navigation';
import { Table, TableCell, TableContainer, TableRow, Tabs, Tab } from '@material-ui/core';
import { ChartContainer, GraphAndPeriodDiv, PageContainer } from '../css/Div';
import { useParams } from "react-router-dom";
import { PageTitle } from '../css/Text';
import { market } from '../services/market';

function StockDetails() {

    let { id } = useParams(); // gets the ticker of the share

    const [name, setName] = useState('');
    const [ticker, setTicker] = useState('');
    const [price, setPrice] = useState('');
    const [marketName, setMarketName] = useState('');
    const [exchange, setExchange] = useState('');

    const [stats, setStats] = useState([
        { label: 'Bid', value: "N/A" },
        { label: 'Ask', value: "N/A" },
        { label: 'High', value: "N/A" },
        { label: 'Low', value: "N/A" },
        { label: 'Open', value: "N/A" },
        { label: 'Close', value: "N/A" },
        { label: 'Change', value: "N/A" },
        { label: 'Change Percentage', value: "N/A" },
        { label: '52 Week Range', value: "N/A" },
        { label: 'Market Cap', value: "N/A" }
    ]);

    useEffect(() => {
        market.getStockDetail(id)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                setName(json.name);
                setTicker(json.ticker);
                setPrice(json.price);
                setMarketName(json.market);
                setExchange(json.exchange);
                setStats([
                    { label: 'Bid', value: json.bid },
                    { label: 'Ask', value: json.ask },
                    { label: 'High', value: json.high },
                    { label: 'Low', value: json.low },
                    { label: 'Open', value: json.open },
                    { label: 'Close', value: json.close },
                    { label: 'Change', value: json.change },
                    { label: 'Change Percentage', value: json.change_perc },
                    { label: '52 Week Range', value: json.fifty_two_week_range },
                    { label: 'Market Cap', value: json.market_cap },
                ]);
            })
            .catch((error) => {
                Promise.resolve(error)
                    .then((error) => {
                        console.log(error)
                        alert(`${error.status} ${error.statusText}`);
                    });
            })
    }, [id, setStats, setName, setTicker, setPrice, setMarketName, setExchange]);



    const [period, setPeriod] = useState('last_week');
    const [tabValue, setTabValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
        switch (newValue) {
            case 0:
                setPeriod('last_week');
                break;
            case 1:
                setPeriod('last_month');
                break;
            case 2:
                setPeriod('last_six_months');
                break;
            case 3:
                setPeriod('last_year');
                break;
            default:
                setPeriod('last_week');
                break;
        }
    };
    return (
        <div>
            <Navigation />
            <PageContainer>
                <PageTitle>{name} <span>({ticker})</span></PageTitle>
                <h1>${parseFloat(price).toFixed(2)}USD</h1>
                <p>Market: {marketName}</p>
                <p>Exchange: {exchange}</p>
                <TableContainer>
                    <Table>
                        {stats.map((value) => {
                            return (
                                <TableRow>
                                    <TableCell variant="head">
                                        {value.label}
                                    </TableCell>
                                    <TableCell>
                                        {value.value}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </Table>
                </TableContainer>
                <ChartContainer style={{ width: "100%" }}>
                    <GraphAndPeriodDiv>
                        <StockDetailsChart period={period} id={id} />
                        <Tabs value={tabValue}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChange}
                            aria-label="tabs to switch between different periods to view the graph with">
                            <Tab label="Week" />
                            <Tab label="Month" />
                            <Tab label="6 months" />
                            <Tab label="Year" />
                        </Tabs>
                    </GraphAndPeriodDiv>
                    <CustomButton>What if I buy now?</CustomButton>
                    <CustomButton>What if I sell now?</CustomButton>
                </ChartContainer>
                <div>
                    <h1>News feed for {name}</h1>
                </div>
            </PageContainer>
        </div>
    )
}

export default StockDetails;