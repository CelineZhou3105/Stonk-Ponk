import React, { useMemo } from 'react'
import Chart from "react-google-charts";

/**
 * Summary Chart - Line graph displayed on the Market Page to demonstrate the performance of each stock.
 */
function SummaryChart() {
    // TODO - Replace with calls for real data (not dummy data)
    const data = [
        ['x', 'price'],
        [0, 0],
        [1, 10],
        [2, 23],
        [3, 17],
        [4, 18],
        [5, 9],
        [6, 11],
        [7, 27],
        [8, 33],
        [9, 40],
        [10, 32],
        [11, 35],
    ];

    const series = React.useMemo(
        () => ({
          showPoints: false
        }),
        []
    );

    const axes = useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ]
    );

    return (
        <Chart
            width={250}
            height={100}
            chartType="LineChart" 
            loader={<div>Loading Chart</div>}
            data={data} 
            options={{
                hAxis: {
                  gridlines: {color: 'white'}  
                },
                vAxis: {
                    gridlines: {color: 'white'}  
                  },
                legend: {
                    position: 'none'
                }
            }}
        />
    )
}

export default SummaryChart;