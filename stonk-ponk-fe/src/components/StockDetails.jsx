import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import StockDetailsChart from "./StockDetailsChart";
import Navigation from "./Navigation";

import { getNews } from "../services/news";
import { market } from "../services/market";
import { getStockDetailTooltipText } from "../helpers/tooltipText";

import { CustomButton } from "../css/Button";
import {
	ChartContainer,
	Container,
	FlexRowDiv,
	FlexColumnCenterDiv,
	GraphAndPeriodDiv,
	PageContainer,
	StockDetailTopBar,
	NewsContainer,
	NewsTitleContainer,
} from "../css/Div";
import { Link, NormalText, SubText } from "../css/Text";
import { PageTitle } from "../css/Text";

import { Tooltip, Chip } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { Table, TableCell, TableContainer, TableRow, Tabs, Tab } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

/**
 * StockDetails - Page showing the details of an individual stock.
 */
function StockDetails() {
	let { id } = useParams(); // gets the ticker of the share

	// Variables for information related to the stock
	const [name, setName] = useState("");
	const [ticker, setTicker] = useState("");
	const [price, setPrice] = useState("");
	const [marketName, setMarketName] = useState("");
	const [exchange, setExchange] = useState("");

	// News related variables
	const [articles, setArticles] = useState(null);
	const [articlesShown, setArticlesShown] = useState([]);
	const [pageNum, setPageNum] = useState(1);
	const [pages, setPages] = useState(0);

	// Tracks errors
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	// Tracks whether data has loaded from api
	const [loading, setLoading] = useState(true);

	const [stats, setStats] = useState([
		{ label: "Bid", value: "N/A" },
		{ label: "Ask", value: "N/A" },
		{ label: "High", value: "N/A" },
		{ label: "Low", value: "N/A" },
		{ label: "Open", value: "N/A" },
		{ label: "Close", value: "N/A" },
		{ label: "Change", value: "N/A" },
		{ label: "Change Percentage", value: "N/A" },
		{ label: "52 Week Range", value: "N/A" },
		{ label: "Market Cap", value: "N/A" },
	]);

	// navigate back to sign in
	const history = useHistory();
	const navigateBack = () => {
		history.goBack();
	};

	// useEffect to make API call for stock data
	useEffect(() => {
		market
			.getStockDetail(id)
			.then((response) => response.json())
			.then((json) => {
				setName(json.name);
				setTicker(json.ticker);
				setPrice(json.price);
				setMarketName(json.market);
				setExchange(json.exchange);
				setStats([
					{ label: "Bid", value: json.bid },
					{ label: "Ask", value: json.ask },
					{ label: "High", value: json.high },
					{ label: "Low", value: json.low },
					{ label: "Open", value: json.open },
					{ label: "Close", value: json.close },
					{ label: "Change", value: json.change },
					{ label: "Change Percentage", value: json.change_perc },
					{ label: "52 Week Range", value: json.fifty_two_week_range },
					{ label: "Market Cap", value: json.market_cap },
				]);
				setLoading(false);
			})
			.catch(() => {
				setError(true);
				setErrorMsg("An error occured while getting stock details. Please refresh.");
			});
	}, [id, setStats, setName, setTicker, setPrice, setMarketName, setExchange]);

	// useEffect to get news articles related to the stock
	useEffect(() => {
		if (ticker !== "") {
			getNews(ticker)
				.then((response) => {
					setArticles(response);
					if (response.length > 10) {
						setArticlesShown(response.slice(0, 10));
						setPages(Math.floor(response.length / 10));
					} else {
						setArticlesShown(response);
						setPages(1);
					}
				})
				.catch(() => {
					setError(true);
					setErrorMsg("An error occured while getting stock news. Please refresh.");
				});
		}
	}, [ticker]);

	function renderArticles(page) {
		const start = page * 10;
		const end = page * 10 + 10;

		const newArticles = articles.slice(start, end);
		setArticlesShown(newArticles);
	}

	const handlePageChange = (event, value) => {
		setPageNum(value);
		renderArticles(value - 1);
	};
	const [period, setPeriod] = useState("last_week");
	const [tabValue, setTabValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setTabValue(newValue);
		switch (newValue) {
			case 0:
				setPeriod("last_week");
				break;
			case 1:
				setPeriod("last_month");
				break;
			case 2:
				setPeriod("last_six_months");
				break;
			case 3:
				setPeriod("last_year");
				break;
			default:
				setPeriod("last_week");
				break;
		}
	};
	return (
		<div>
			<Navigation />
			{error && (
				<Alert onClose={() => setError(false)} variant="filled" severity="error">
					{errorMsg}
				</Alert>
			)}
			{loading ? (
				<FlexColumnCenterDiv>
					<CircularProgress />
				</FlexColumnCenterDiv>
			) : (
				<>
					<PageContainer>
						<StockDetailTopBar>
							<PageTitle>
								{name} <span>({ticker})</span>
							</PageTitle>
							<CustomButton
								backgroundColor="#d6d6d6"
								color="#000000"
								hoverColor="#c2c2c2"
								aria-label="Navigate back to previous page"
								onClick={navigateBack}
							>
								Back
							</CustomButton>
						</StockDetailTopBar>
						<h1>${parseFloat(price).toFixed(2)} {exchange === 'ASX' ? 'AUD' : 'USD'}</h1>
						<p>Market: {marketName}</p>
						<p>Exchange: {exchange}</p>
						<TableContainer>
							<Table>
								{stats.map((value) => {
									return (
										<TableRow>
											<TableCell variant="head">
												<Tooltip
													title={getStockDetailTooltipText(value.label)}
													placement="right"
													style={{ cursor: "pointer" }}
												>
													<span>{value.label}</span>
												</Tooltip>
											</TableCell>
											<TableCell>{value.value}</TableCell>
										</TableRow>
									);
								})}
							</Table>
						</TableContainer>
						<ChartContainer style={{ width: "100%" }}>
							<GraphAndPeriodDiv>
								<StockDetailsChart period={period} id={id} />
								<Tabs
									value={tabValue}
									indicatorColor="primary"
									textColor="primary"
									onChange={handleChange}
									aria-label="tabs to switch between different periods to view the graph with"
								>
									<Tab label="Week" />
									<Tab label="Month" />
									<Tab label="6 months" />
									<Tab label="Year" />
								</Tabs>
							</GraphAndPeriodDiv>
						</ChartContainer>
						<div>
							<h1>News feed for {name}</h1>
						</div>
						{articles && articles.length === 0 && <div>No search results.</div>}
						{articles && articles.length > 0 && (
							<Container flex_direction="column" gap="1em">
								{articlesShown.map((article) => {
									return (
										<NewsContainer>
											<div>
												<NewsTitleContainer>
													<Chip color="primary" size="small" label={article.ticker} />
													<NormalText>
														<Link color="black" href={article.link} target="_blank">
															{article.title}
														</Link>
													</NormalText>
												</NewsTitleContainer>
												<SubText>{article.published}</SubText>
												<SubText>{article.summary}...</SubText>
											</div>
										</NewsContainer>
									);
								})}
								<FlexRowDiv>
									Page: {pageNum}
									<Pagination count={pages} page={pageNum} onChange={handlePageChange} />
								</FlexRowDiv>
							</Container>
						)}
						{articles === null && <div>Loading...</div>}
					</PageContainer>
				</>
			)}
		</div>
	);
}

export default StockDetails;
