import React, { useMemo } from 'react'
import Chart from "react-google-charts";

/**
 * Summary Chart - Line graph displayed on the Market Page to demonstrate the performance of each stock.
 */
function SummaryChart(props) {
    // TODO - Replace with calls for real data (not dummy data)

    const {points} = props;
    const data = [['date', 'price']];
    for (let i = 0; i < points.length; i++) {
        console.log(points[i])
        data.push([points[i].date, points[i].price]);
    }

    return (
        <Chart
            width={350}
            height={150}
            chartType="LineChart" 
            loader={<div>Loading Chart</div>}
            data={data} 
            options={{
                hAxis: {
                    gridlines: {count: 0, color: '#FFF'},
                    textPosition: 'none',
                },
                vAxis: {
                    gridlines: {count: 0, color: '#FFF'}, 
                    textPosition: 'none',
                  },
                legend: {
                    position: 'none'
                },
                series: {
                    0: { curveType: 'function' },
                },
                
            }}
        />
    )
}

export default SummaryChart;