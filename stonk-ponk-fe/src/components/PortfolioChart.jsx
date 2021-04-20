import React from "react";

import { NormalText } from "../css/Text";

import Chart from "react-google-charts";
import CircularProgress from "@material-ui/core/CircularProgress";

/**
 * PortfolioChart - pie chart that displays the make-up of a user's portfolio.
 * @param {Array} stockData - the stocks in the user's portfolio
 * @param {number} portfolioValue - The cumulative value of the user's portfolio, in AUD
 */
function PortfolioChart(props) {
	const { stockData, portfolioValue } = props;

	// Reformat the data for the chart to understand
	const data = [["stock name", "value"]];
	let empty = false;
	if (stockData.length === 0) {
		// The user has no stocks in their portfolio
		empty = true;
	} else {
		let topStocksTotalValue = 0;
		for (let i = 0; i < stockData.length; i++) {
			data.push([stockData[i].name, stockData[i].value]);
			topStocksTotalValue += stockData[i].value;
		}

		let otherValue = portfolioValue - topStocksTotalValue;
		if (otherValue / portfolioValue > 0.01) {
			data.push(["Other", portfolioValue - topStocksTotalValue]);
		}
	}

	return empty ? (
		<NormalText>There are no stocks in your portfolio. Add some now!</NormalText>
	) : (
		<Chart
			width={"400px"}
			height={"auto"}
			chartType="PieChart"
			loader={<CircularProgress />}
			data={data}
			options={{
				title: "Portfolio makeup",
				backgroundColor: "transparent",
			}}
		/>
	);
}

export default PortfolioChart;
