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

	useEffect(() => {
		console.log(period);
		market
			.getStockPrice(ticker, period)
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				const tableArray = [];
				for (let i = 0; i < json.length; i++) {
					tableArray.push([json[i].date, json[i].price]);
				}
				setData((data) => data.concat(tableArray));
			})
			.catch((error) => {
				Promise.resolve(error).then((error) => {
					console.log(error);
					alert(`${error.status} ${error.statusText}`);
				});
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

	return (
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
