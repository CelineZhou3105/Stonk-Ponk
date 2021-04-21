import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import {
	Container,
	PageContainer,
	FlexRowDiv,
	FlexRowEndDiv,
	WatchlistTable,
	ModalContainer,
	ModalContent,
	FlexColumnCenterDiv,
	SettingModalDiv,
} from "../css/Div";
import { PageTitle, SubTitle, SubText } from "../css/Text";
import { CustomButton, CloseButton } from "../css/Button";
import { TextField, SettingsModalLabel } from "../css/Form";
import Select from "react-select";
import { customStyles } from "../helpers/styles";
import StockTable from "./StockTable";
import { watchlist } from "../services/watchlist";

const headings = [
	{ id: "name", disablePadding: true, numeric: false, label: "Name" },
	{
		id: "performance",
		disablePadding: false,
		numeric: false,
		label: "Performance",
	},
	{
		id: "price",
		disablePadding: false,
		numeric: true,
		label: "Current Price",
	},
];

const Watchlist = () => {
	const [watchlistId, setWatchlistId] = useState(-1);
	const [watchlistNames, setWatchlistNames] = useState([{ id: -1, label: "" }]);
	const [newWatchlist, setNewWatchlist] = useState("");
	const [modalDisabled, setModalDisabled] = useState(true);
	const [currentWatchlist, setCurrentWatchlist] = useState("");
	const [watchlistData, setWatchlistData] = useState([]);
	const [page, setPage] = useState(0);
	const [tableVisible, setTableVisible] = useState(false);

	useEffect(() => {
		watchlist
			.getWatchlistName()
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				if (json.watchlists.length !== watchlistNames.length) {
					setWatchlistNames(json.watchlists);
				}
			})
			.catch((error) => {
				Promise.resolve(error).then((error) => {
					console.log(error);
				});
			});
	}, []);
	console.log(watchlistNames);
	const addNewWatchlist = () => {
		console.log(newWatchlist.trim());
		watchlist
			.createWatchlist(newWatchlist.trim())
			.then((response) => response.json())
			.then((json) => {
				console.log("Added new watchlist");
				console.log(json);
				if (watchlistNames[0].label !== "") {
					setWatchlistNames((watchlistNames) => watchlistNames.concat(json));
				} else {
					setWatchlistNames(json);
				}
				setModalDisabled(true);
			})
			.catch((error) => {
				Promise.resolve(error).then((error) => {
					alert(`${error.status} ${error.statusText}`);
				});
			});
	};

	const viewWatchlist = (watchlistLabel) => {
		console.log(watchlistLabel);
		setCurrentWatchlist(watchlistLabel);
		const id = watchlistNames.find((item) => item.label === watchlistLabel);
		setWatchlistId(id.id);
		setTableVisible(true);
		watchlist
			.getWatchlistStocks(id.id)
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				setWatchlistData(json);
			})
			.catch((error) => {
				Promise.resolve(error).then((error) => {
					alert(`${error.status} ${error.statusText}`);
				});
			});
	};
	return (
		<>
			<Navigation />
			<PageContainer>
				<FlexRowDiv>
					<PageTitle>Watchlist</PageTitle>
					<CustomButton
						backgroundColor="#9e22ff"
						hoverColor="#b55cfa"
						onClick={() => setModalDisabled(false)}
					>
						Add New Watchlist
					</CustomButton>
					{!modalDisabled && (
						<ModalContainer>
							<ModalContent>
								<CloseButton onClick={() => setModalDisabled(true)}>&times;</CloseButton>
								<FlexColumnCenterDiv>
									<SettingModalDiv>
										<SettingsModalLabel htmlFor="newWatchlist">Watchlist Name</SettingsModalLabel>
										<TextField
											type="text"
											id="newWatchlist"
											value={newWatchlist}
											required
											onChange={(e) => setNewWatchlist(e.target.value)}
										></TextField>
									</SettingModalDiv>
									<CustomButton
										backgroundColor="#9e22ff"
										hoverColor="#b55cfa"
										onClick={addNewWatchlist}
										style={{ marginTop: "8%" }}
									>
										Add
									</CustomButton>
								</FlexColumnCenterDiv>
							</ModalContent>
						</ModalContainer>
					)}
				</FlexRowDiv>
				<FlexRowEndDiv>
					<SubText style={{ marginRight: "10px" }}>Watchlist:</SubText>
					<Select
						styles={customStyles}
						options={watchlistNames}
						defaultValue={"Select"}
						aria-label="Drop down to select to view different watchlists"
						onChange={(e) => viewWatchlist(e.label)}
					/>
				</FlexRowEndDiv>
				<Container
					flex_direction="column"
					gap="1em"
					justify_content="center"
					align_items="center"
					style={{ padding: "20px" }}
				>
					{tableVisible ? (
						<>
							<FlexRowDiv style={{ width: "100%" }}>
								<SubTitle style={{ margin: "5px" }}>{currentWatchlist}</SubTitle>
								<FlexRowDiv style={{ margin: "5px" }}>
									<CustomButton
										backgroundColor="#44BCFF"
										hoverColor="#68c7fc"
										style={{ marginRight: "10px" }}
									>
										What if I owned this?
									</CustomButton>
								</FlexRowDiv>
							</FlexRowDiv>

							<WatchlistTable>
								<StockTable
									data={watchlistData}
									headings={headings}
									place="watchlist"
									setRows={setWatchlistData}
									page={page}
									setPage={setPage}
									watchlistId={watchlistId}
								></StockTable>
							</WatchlistTable>
						</>
					) : (
						<p>Please select a watchlist or add a new watchlist.</p>
					)}
				</Container>
			</PageContainer>
		</>
	);
};

export default Watchlist;
