import React, { useState, useEffect } from "react";

import { market } from "../services/market";

import Chart from "react-google-charts";
import CircularProgress from "@material-ui/core/CircularProgress";

/**
 * PortfolioPricesChart - Line graph displayed on each individual stock details page.
 */
const PortfolioPricesChart = ({ ticker, period }) => {
	const [data, setData] = useState([["date", "price"]]);
	useEffect(() => {
		setData([["date", "price"]]);
	}, [period]);

	// Tracks errors
	const [error, setError] = useState(false);

	useEffect(() => {
		market
			.getStockPrice(ticker, period)
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
	}, [ticker, period]);

	const options = {
		hAxis: {
			gridlines: { count: 0, color: "#FFF" },
			textPosition: "none",
		},
		vAxis: {
			gridlines: { count: 0, color: "#FFF" },
			textPosition: "none",
		},
		legend: {
			position: "none",
		},
		series: {
			0: { curveType: "function" },
		},
	};

	return error ? (
		<div>Could not load chart data.</div>
	) : (
		<Chart
			width={350}
			height={150}
			chartType="LineChart"
			loader={<CircularProgress />}
			data={data}
			options={options}
		/>
	);
};

export default PortfolioPricesChart;
