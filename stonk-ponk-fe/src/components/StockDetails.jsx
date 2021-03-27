import React, { useState } from 'react';

import { CustomButton } from '../css/Button';
import StockDetailsChart from './StockDetailsChart';
import Navigation from './Navigation';
import { Table, TableCell, TableContainer, TableRow, Tabs, Tab } from '@material-ui/core';
import { ChartContainer, GraphAndPeriodDiv, PageContainer } from '../css/Div';

import { useParams } from "react-router-dom";
import { PageTitle } from '../css/Text';

function StockDetails() {

    // TODO - replace this with not dummy share data
    let { id } = useParams(); // gets the ticker of the share

    const share = { name: 'Wesfarmers', ticker: 'WES', performance: 'graph', price: 590.48, sector: 'aus', type: 'etf' };

    const stats = [
        { label: 'Volume', value: 13923902 },
        { label: 'Bid', value: 237.70 },
        { label: 'Ask', value: 236.69 },
        { label: 'High', value: 291.20 },
        { label: 'Low', value: 238.94 },
        { label: 'Open', value: 321.90 },
        { label: 'Close', value: 340.00 },
    ];
    const [period, setPeriod] = useState('day');
    const [tabValue, setTabValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
        switch (newValue) {
            case 0:
                setPeriod('day');
                break;
            case 1:
                setPeriod('week');
                break;
            case 2:
                setPeriod('month');
                break;
            case 3:
                setPeriod('6 months');
                break;
            case 4:
                setPeriod('year');
                break;
            default:
                setPeriod('day');
                break;
        }
    };
    return (
        <div>
            <Navigation />
            <PageContainer>
                <PageTitle>{share.name} <span>({share.ticker})</span></PageTitle>
                <h1>${share.price}AUD</h1>
                <p>Market: ASX (Australian Stocks Exchange)</p>
                <TableContainer>
                    <Table>
                        {stats.map((value, index) => {
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
                        <StockDetailsChart period={period} />
                        <Tabs value={tabValue}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChange}
                            aria-label="tabs to switch between different periods to view the graph with">
                            <Tab label="Day" />
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
                    <h1>News feed for {share.name}</h1>
                </div>
            </PageContainer>
        </div>
    )
}

export default StockDetails;