import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

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
import Alert from "@material-ui/lab/Alert";

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
	const [watchlistNames, setWatchlistNames] = useState([]);
	const [newWatchlist, setNewWatchlist] = useState("");
	const [modalDisabled, setModalDisabled] = useState(true);
	const [currentWatchlist, setCurrentWatchlist] = useState("");
	const [watchlistData, setWatchlistData] = useState([]);
	const [page, setPage] = useState(0);
	const [tableVisible, setTableVisible] = useState(false);

	// Tracks when errors occurs - for showing error banners to the user
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const history = useHistory();

	// Handle errors when they are returned by the fetch calls
	const handleError = useCallback(
		(error) => {
			setError(true);
			if (error === "Expired token") {
				setErrorMsg("Your session has expired. Logging out...");
				setTimeout(() => {
					localStorage.removeItem("token");
					history.push("/");
				}, 3000);
			} else {
				setErrorMsg(error);
			}
		},
		[history]
	);

	useEffect(() => {
		watchlist
			.getWatchlistName()
			.then((response) => response.json())
			.then((json) => {
				setWatchlistNames(json.watchlists);
			})
			.catch((error) => {
				handleError(error);
			});
	}, []);

	const addNewWatchlist = () => {
		watchlist
			.createWatchlist(newWatchlist.trim())
			.then((response) => response.json())
			.then((json) => {
				if (watchlistNames.length !== 0) {
					setWatchlistNames((watchlistNames) => watchlistNames.concat(json));
				} else {
					setWatchlistNames(json);
				}
				setModalDisabled(true);
			})
			.catch((error) => {
				handleError(error);
			});
	};

	const viewWatchlist = (watchlistLabel) => {
		setCurrentWatchlist(watchlistLabel);
		const id = watchlistNames.find((item) => item.label === watchlistLabel);
		setWatchlistId(id.id);
		setTableVisible(true);
		watchlist
			.getWatchlistStocks(id.id)
			.then((response) => response.json())
			.then((json) => {
				setWatchlistData(json);
			})
			.catch((error) => {
				handleError(error);
			});
	};

	const deleteWatchlist = () => {
		watchlist
			.deleteWatchlist(watchlistId)
			.then(() => {
				window.location.reload();
			})
			.catch((error) => {
				handleError(error);
			});
	};

	return (
		<>
			<Navigation />
			{error && (
				<Alert onClose={() => setError(false)} variant="filled" severity="error">
					{errorMsg}
				</Alert>
			)}
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
										<SettingsModalLabel style={{ width: "100%" }} htmlFor="newWatchlist">
											Watchlist Name
										</SettingsModalLabel>
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
								<SubTitle style={{ margin: "10px" }}>{currentWatchlist}</SubTitle>
								<CustomButton
									backgroundColor="#e80000"
									hoverColor="#ff5757"
									onClick={deleteWatchlist}
									margin="10px"
								>
									Delete Watchlist
								</CustomButton>
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
								/>
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
