import React from 'react';
import Chart from "react-google-charts";

import CircularProgress from '@material-ui/core/CircularProgress';
import { NormalText } from '../css/Text';

function PortfolioChart(props) {
    
    const { stockData, portfolioValue } = props;

    const data = [['stock name', 'value']];
    let empty = false;
    if (stockData.length === 0) { // The user has no stocks in their portfolio
        empty = true;
    } else {
        let topStocksTotalValue = 0;
        for (let i = 0; i < stockData.length; i++) {
            data.push([stockData[i].name, stockData[i].value]);
            topStocksTotalValue += stockData[i].value;
        }

        let otherValue = portfolioValue - topStocksTotalValue;
        if (otherValue/portfolioValue > 0.01) {
            data.push(['Other', portfolioValue - topStocksTotalValue]);
        }
    }
    
    return(
        empty ? <NormalText>There are no stocks in your portfolio. Add some now!</NormalText>
        :(<Chart
            width={'500px'}
            height={'300px'}
            chartType="PieChart"
            loader={<CircularProgress />}
            data={data}
            options={{
                title: 'Portfolio makeup',
                backgroundColor: 'transparent',
            }}
        />)
    )
}

export default PortfolioChart;