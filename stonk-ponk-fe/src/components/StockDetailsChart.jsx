import React, { useState, useEffect } from "react";

import Chart from "react-google-charts";
import { market } from "../services/market";

/**
 * StockDetails Chart - Line graph displayed on each individual stock details page.
 */
const StockDetailsChart = ({ period, id }) => {
	const [data, setData] = useState([["date", "price"]]);
	useEffect(() => {
		setData([["date", "price"]]);
	}, [period]);

	// Tracks whether there are errors
	const [error, setError] = useState(false);

	// Gets historical prices of the given stock for a given period
	useEffect(() => {
		market
			.getStockPrice(id, period)
			.then((response) => response.json())
			.then((json) => {
				const tableArray = [];
				for (let i = 0; i < json.length; i++) {
					tableArray.push([json[i].date, json[i].price]);
				}
				setData((data) => data.concat(tableArray));
			})
			.catch(() => {
				setError(true);
			});
	}, [id, period]);

	const options = {
		hAxis: {
			title: "Period",
		},
		vAxis: {
			title: "Price",
		},
		legend: {
			position: "none",
		},
	};

	return error ? (
		<div>Error occured when loading chart.</div>
	) : (
		<Chart
			width="1100px"
			height="500px"
			chartType="LineChart"
			loader={<div>Loading Chart</div>}
			data={data}
			options={options}
		/>
	);
};

export default StockDetailsChart;
