import React from "react";
import Chart from "react-google-charts";

import CircularProgress from "@material-ui/core/CircularProgress";
/**
 * Summary Chart - Line graph displayed on the Market Page to demonstrate the performance of each stock.
 */
function SummaryChart(props) {
	const { points } = props;

	const data = [];
	data.push(["date", "price"]);
	for (let i = 0; i < points.length; i++) {
		data.push([points[i].date, points[i].price]);
	}

	return (
		<Chart
			width={350}
			height={150}
			chartType="LineChart"
			loader={<CircularProgress />}
			data={data}
			options={{
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
			}}
		/>
	);
}

export default SummaryChart;
