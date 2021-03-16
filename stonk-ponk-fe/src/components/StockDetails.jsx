import React from 'react';

import { LoginButton } from '../css/Button';
import StockDetailsChart from './StockDetailsChart';
import Navigation from './Navigation';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { ChartContainer, StockDetailsContainer } from '../css/Div';

import { useParams } from "react-router-dom";

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

    return (
        <div>
            <Navigation />
            <StockDetailsContainer>
                <h1>{share.name} <span>({share.ticker})</span></h1>
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
                <ChartContainer>
                    <StockDetailsChart />
                    <LoginButton>What if I buy now?</LoginButton>
                    <LoginButton>What if I sell now?</LoginButton>
                </ChartContainer>
                <div>
                    <h1>News feed for {share.name}</h1>
                </div>
            </StockDetailsContainer>

        </div>
    )
}

export default StockDetails;