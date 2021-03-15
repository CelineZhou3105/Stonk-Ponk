import React, { useMemo } from 'react'
import Chart from "react-google-charts";

/**
 * StockDetails Chart - Line graph displayed on each individual stock details page.
 */
function StockDetailsChart() {
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

    // TODO - take the last two points and calculate if it has increased or decreased and display percentage

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
            width={600}
            height={400}
            chartType="LineChart" 
            loader={<div>Loading Chart</div>}
            data={data} 
            options={{
                legend: {
                    position: 'none'
                }
            }}
        />
    )
}

export default StockDetailsChart;