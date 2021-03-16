import React, { useState, useEffect } from 'react'
import Chart from "react-google-charts";

/**
 * StockDetails Chart - Line graph displayed on each individual stock details page.
 */
const StockDetailsChart = ({ period }) => {

    // TODO - Replace with calls for real data (not dummy data)
    const dayData = [
        ['x', 'price'],
        ["8:00am", 5],
        ["9:00am", 10],
        ["10:00am", 23],
        ["11:00am", 17],
        ["12:00pm", 18],
        ["1:00pm", 9],
        ["2:00pm", 11],
        ["3:00pm", 27],
    ];
    const weekData = [
        ['x', 'price'],
        ["15/03", 10],
        ["16/03", 12],
        ["17/03", 8],
        ["18/03", 13],
        ["19/03", 18],
        ["20/03", 20],
        ["21/03", 20],
    ];

    const monthData = [
        ['x', 'price'],
        ["15/03", 10],
        ["22/03", 21],
        ["29/03", 25],
        ["5/04", 19],
        ["12/03", 27],
    ];

    const [data, setData] = useState(dayData);

    useEffect(() => {
        // calls a fetch for the correct period from the backend
        switch (period) {
            case "day":
                setData(dayData);
                break;
            case "week":
                setData(weekData);
                break;
            case "month":
                setData(monthData);
                break;
            default:
                break;
        }
    }, [period]);

    const options = {
        hAxis: {
            title: "Period",
        },
        vAxis: {
            title: "Price",
        },
        legend: {
            position: "none"
        }
    }
    // TODO - take the last two points and calculate if it has increased or decreased and display percentage

    // const series = React.useMemo(
    //     () => ({
    //       showPoints: false
    //     }),
    //     []
    // );

    // const axes = useMemo(
    //     () => [
    //         { primary: true, type: 'linear', position: 'bottom' },
    //         { type: 'linear', position: 'left' }
    //     ]
    // );

    return (
        <Chart
            width="1100px"
            height="500px"
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={options}
        />
    )
}

export default StockDetailsChart;