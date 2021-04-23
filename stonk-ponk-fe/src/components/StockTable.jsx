import React, { useState } from "react";
import clsx from "clsx";

import PortfolioPricesChart from "./PortfolioPricesChart";
import SummaryChart from "./SummaryChart";
import CreateModal from "./CreateModal";

import { portfolio } from "../services/portfolio";
import { watchlist } from "../services/watchlist";

import { NormalText, SubText } from "../css/Text";
import { RightAlignedButtonContainer } from "../css/Div";
import { CustomButton } from "../css/Button";

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { lighten, makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import Alert from "@material-ui/lab/Alert";

/**
 * StockTableHead - The header column of the table
 * @param {string} order - Ascending or descending
 * @param {string} orderBy - The property you wish to order by (e.g. name, price)
 * @param {function} onRequestSort - The function you wish to trigger when a sort event is triggered
 * (i.e. someone clicks 'sort' on a table column)
 * @param {Array} headings - an array of strings for headings of each column in the table
 */
function StockTableHead(props) {
	const { order, orderBy, onRequestSort, headings, numSelected, rowCount, onSelectAllClick, editMode } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{editMode && (
					<TableCell padding="checkbox">
						<Checkbox
							indeterminate={numSelected > 0 && numSelected < rowCount}
							checked={rowCount > 0 && numSelected === rowCount}
							onChange={onSelectAllClick}
							inputProps={{ "aria-label": "select all stocks" }}
						/>
					</TableCell>
				)}

				{headings.map((cell) => {
					return (
						<TableCell
							key={cell.id}
							align={cell.numeric ? "right" : "left"}
							padding={cell.disablePadding ? "none" : "default"}
							sortDirection={orderBy === cell.id ? order : false}
						>
							{cell.id === "performance" ? (
								<Tooltip
									title="A graph showing the historical prices of the stock."
									placement="bottom-start"
								>
									<span>{cell.label}</span>
								</Tooltip>
							) : (
								<TableSortLabel
									active={orderBy === cell.id}
									direction={orderBy === cell.id ? order : "asc"}
									onClick={createSortHandler(cell.id)}
								>
									{cell.id === "value" ? (
										<Tooltip
											title="Total value is equal to #units owned * current market price"
											placement="bottom-end"
										>
											<span>{cell.label}</span>
										</Tooltip>
									) : (
										cell.label
									)}
								</TableSortLabel>
							)}
						</TableCell>
					);
				})}
			</TableRow>
		</TableHead>
	);
}

/**
 * TableToolbar - header that appears in when the user is in edit mode and has selected items
 * @param {number} numSelected - number of items selected in the table
 * @param {function} handleDelete - the function to handle deleting the selected items
 */
const TableToolbar = (props) => {
	const classes = useToolbarStyles();
	const { numSelected, handleDelete, place } = props;

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			{numSelected > 0 ? (
				<Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
					{numSelected} selected
				</Typography>
			) : (
				<Typography className={classes.title} variant="h6" id="tableTitle" component="div">
					{place === "portfolio" ? "Your Stocks" : "Most Active Stocks (Daily)"}
				</Typography>
			)}

			{numSelected > 0 && (
				<Tooltip title="Delete">
					<IconButton onClick={handleDelete} aria-label="filter list">
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
};

/**
 * StockTable - the body of the table which displays the data
 * @param {} data - the list of data you want to display on the table
 * @param {Array} headings - the list of headings you want to display on the header of the table
 */
function StockTable(props) {
	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("");
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [editMode, setEditMode] = useState(false);
	const { data, headings, place, setRows, setPageDirection, page, setPage, watchlistId } = props;

	const [previousRows, setPreviousRows] = useState(data);
	const [deleteVisible, setDeleteVisible] = useState(false);

	// Handles errors
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	// Handles success when saving
	const [success, setSuccess] = useState(false);
	const [successMsg, setSuccessMsg] = useState("");

	// Handle sorting when user clicks on a sort label
	const handleSort = (event, property) => {
		const ascending = orderBy === property && order === "asc";
		setOrder(ascending ? "desc" : "asc");
		setOrderBy(property);
	};

	// Handles changing the page on the table
	const changePage = (event, newPage) => {
		event.preventDefault();
		setPage(newPage);
	};

	// Change the number of rows per page
	const changeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

	// Function to determine whether the row is selected
	const isSelected = (name) => selected.indexOf(name) !== -1;

	// For portfolio view - when a user makes edits to their portfolio this function handles the change
	const onChange = (e, changedRow, changedColumn) => {
		if (place === "portfolio") {
			const newValue = e.target.value;

			if (changedColumn === "first_purchase_date") {
				// Check that the date is not a weekend
				const day = new Date(newValue).getUTCDay();
				if ([6, 0].includes(day)) {
					setError(true);
					setErrorMsg("Cannot enter weekends as they are not valid trading days.");
					return;
				}
			} else if (changedColumn === "volume") {
				// Check that the volume is not 0
				if (newValue === "0") {
					setError(true);
					setErrorMsg("You cannot own 0 units of a stock. Please enter a positive integer.");
					return;
				}
			}

			const newRows = data.map((row) => {
				if (row.ticker === changedRow.ticker) {
					return { ...row, [changedColumn]: newValue };
				} else {
					return { ...row };
				}
			});
			setRows(newRows);
		}
	};

	// For portfolio view - saves changes for a portfolio by making the API call
	const saveChanges = () => {
		if (place === "portfolio") {
			const newPortfolio = {};
			const newStocks = [];
			const newStockMapping = {};

			for (let i = 0; i < data.length; i++) {
				let currentTicker = data[i].ticker;
				if (!(currentTicker in newStockMapping)) {
					newStockMapping[currentTicker] = newStocks.length;
					newStocks.push({
						ticker: currentTicker,
						transactions: [],
					});
				}
				newStocks[newStockMapping[currentTicker]].transactions.push({
					date: data[i].first_purchase_date,
					volume: data[i].volume,
					price: data[i].vwap,
				});
			}
			newPortfolio["stocks"] = newStocks;

			portfolio
				.editPortfolio(newPortfolio)
				.then(() => {
					setEditMode(false);
					setPreviousRows(data);
					setSelected([]);
					setSuccess(true);
					setSuccessMsg("Changes saved.");
					window.location.reload();
				})
				.catch((e) => {
					setError(true);
					setErrorMsg(e);
				});
		} else if (place === "watchlist") {
			watchlist
				.updateStockToWatchlist(watchlistId, data)
				.then(() => {
					setEditMode(false);
				})
				.catch((error) => {
					setError(true);
					setErrorMsg(error);
				});
		}
	};

	// For portfolio view - Revert changes to the old portfolio
	function cancelChanges() {
		setEditMode(false);
		setRows(previousRows);
		setSelected([]);
	}

	const [selected, setSelected] = useState([]);
	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = data.map((n) => n.ticker);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	// For portfolio view - allows the user to select rows in the stock table
	const handleClick = (event, ticker) => {
		const selectedIndex = selected.indexOf(ticker);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, ticker);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		// Only allow the user to select if edit mode is on
		if (editMode) {
			setSelected(newSelected);
			setDeleteVisible(true);
		}
	};

	// For portfolio view - allows the user to delete rows in the stocktable
	const handleDelete = () => {
		const newRows = data.filter((row) => {
			if (selected.indexOf(row.ticker) === -1) {
				return true;
			}
			return false;
		});
		setRows(newRows);
		setDeleteVisible(false);
	};

	const [createModalOpen, setCreateModalOpen] = useState(false);

	return (
		<div>
			{(place === "portfolio" || place === "watchlist") && (
				<RightAlignedButtonContainer>
					{editMode ? (
						<>
							<CustomButton
								id="save-button"
								backgroundColor="#00AD30"
								hoverColor="#2de361"
								onClick={() => saveChanges()}
							>
								Save
							</CustomButton>
							<CustomButton
								id="cancel-button"
								backgroundColor="#e80000"
								hoverColor="#ff5757"
								onClick={() => cancelChanges()}
							>
								Cancel
							</CustomButton>
						</>
					) : (
						<>
							<CustomButton
								backgroundColor="#9e22ff"
								hoverColor="#b55cfa"
								onClick={() => {
									setEditMode(true);
									setPreviousRows(data);
								}}
							>
								<EditIcon />
								&nbsp;Edit {place === "portfolio" ? "Portfolio" : "Watchlist"}
							</CustomButton>
						</>
					)}
				</RightAlignedButtonContainer>
			)}
			{(place === "portfolio" || place === "watchlist") && editMode === true && deleteVisible === true && (
				<TableToolbar
					setVisibility={deleteVisible}
					numSelected={selected.length}
					place={place}
					handleDelete={handleDelete}
				></TableToolbar>
			)}
			{error && (
				<Alert onClose={() => setError(false)} variant="filled" severity="error">
					{errorMsg}
				</Alert>
			)}
			{success && (
				<Alert onClose={() => setSuccess(false)} variant="filled" severity="success">
					{successMsg}
				</Alert>
			)}
			<TableContainer>
				<Table size="medium" aria-label="Table of stocks in the market">
					<StockTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleSort}
						rowCount={data.length}
						numSelected={selected.length}
						headings={headings}
						editMode={editMode}
						onSelectAllClick={handleSelectAllClick}
					></StockTableHead>
					<TableBody>
						{stableSort(data, getComparator(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => {
								const isItemSelected = isSelected(row.ticker);
								return (
									<>
										{place === "portfolio" && (
											<>
												<TableRow hover role="checkbox" tabIndex={-1} key={row.ticker}>
													{editMode && (
														<TableCell padding="checkbox">
															<Checkbox
																checked={isItemSelected}
																onChange={(event) => handleClick(event, row.ticker)}
															/>
														</TableCell>
													)}
													<TableCell component="th" scope="row" padding="none">
														<NormalText>{row.name}</NormalText>
														<a href={`/stocks/${row.ticker}`}>{row.ticker}</a>
														<SubText>Currency: {row.ticker.includes('.AX') ? 'AUD' : 'USD' }</SubText>
													</TableCell>
													<TableCell align="center">
														<PortfolioPricesChart ticker={row.ticker} period="last_month" />
													</TableCell>
													{editMode ? (
														<>
															<CustomTableCell
																row={row}
																column="first_purchase_date"
																onChange={onChange}
															></CustomTableCell>
															<CustomTableCell
																row={row}
																column="vwap"
																onChange={onChange}
															></CustomTableCell>
															<CustomTableCell
																row={row}
																column="volume"
																onChange={onChange}
															></CustomTableCell>
														</>
													) : (
														<>
															<TableCell align="right">
																{row.first_purchase_date}
															</TableCell>
															<TableCell align="right">{row.vwap}</TableCell>
															<TableCell align="right">{row.volume}</TableCell>
														</>
													)}

													<TableCell align="right">{row.price.toFixed(2)}</TableCell>
													<TableCell align="right">
														{(row.volume * row.price).toFixed(2)}
													</TableCell>
												</TableRow>
											</>
										)}
										{place === "watchlist" && (
											<>
												<TableRow
													hover
													role="checkbox"
													tabIndex={-1}
													key={row.ticker}
													onClick={(event) => handleClick(event, row.ticker)}
												>
													{editMode && (
														<TableCell padding="checkbox">
															<Checkbox checked={isItemSelected} />
														</TableCell>
													)}
													<TableCell component="th" scope="row" padding="none">
														<NormalText>{row.name}</NormalText>
														<a href={`/stocks/${row.ticker}`}>{row.ticker}</a>
														<SubText>Currency: {row.ticker.includes('.AX') ? 'AUD' : 'USD' }</SubText>
													</TableCell>
													<TableCell align="right">
														<PortfolioPricesChart ticker={row.ticker} period="last_month" />
													</TableCell>
													<TableCell align="right">{row.price.toFixed(2)}</TableCell>
												</TableRow>
											</>
										)}
										{place === "market" && (
											<>
												<TableRow hover role="checkbox" tabIndex={-1} key={row.ticker}>
													<TableCell component="th" scope="row" padding="none">
														<NormalText>{row.name}</NormalText>
														<a href={`/stocks/${row.ticker}`}>{row.ticker}</a>
														<SubText>Currency: {row.ticker.includes('.AX') ? 'AUD' : 'USD' }</SubText>
													</TableCell>
													<TableCell align="center">
														<SummaryChart points={row.prev_week_prices} />
													</TableCell>
													<TableCell align="right">{row.price}</TableCell>
												</TableRow>
											</>
										)}
									</>
								);
							})}
						{emptyRows > 0 && (
							<TableRow style={{ height: 53, emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			{editMode && (
				<CustomButton backgroundColor="#9e22ff" hoverColor="#b55cfa" onClick={() => setCreateModalOpen(true)}>
					<AddCircleIcon />
					&nbsp;Add New Stock
				</CustomButton>
			)}
			{place === "portfolio" ? (
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={changePage}
					onChangeRowsPerPage={changeRowsPerPage}
				/>
			) : (
				<TablePagination
					rowsPerPageOptions={[10]}
					component="div"
					count={place === "watchlist" ? data.length : 300}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={changePage}
					onChangeRowsPerPage={changeRowsPerPage}
					nextIconButtonProps={{
						onClick: () => {
							setPage((page) => page + 1);
							setPageDirection("right");
						},
					}}
					backIconButtonProps={{
						onClick: () => {
							setPage((page) => page - 1);
							setPageDirection("left");
						},
					}}
				/>
			)}
			{createModalOpen && <CreateModal setVisibility={setCreateModalOpen} setRows={setRows} place={place} />}
		</div>
	);
}

/**
 * comparator - compares objects to determine order which they must be in
 * @param {Object} a
 * @param {Object} b
 * @param {string} orderBy - property to order the two objects by
 */
function comparator(a, b, orderBy) {
	if (orderBy === "value") {
		const aValue = a["volume"] * a["price"];
		const bValue = b["volume"] * b["price"];
		if (bValue > aValue) {
			return -1;
		}
		if (bValue > aValue) {
			return 1;
		}
		return 0;
	} else {
		if (b[orderBy] < a[orderBy]) {
			return -1;
		}
		if (b[orderBy] > a[orderBy]) {
			return 1;
		}
		return 0;
	}
}

/**
 * getComparator - returns the correct comparator based on the order given
 * @param {*} order - must be ascending or descending
 * @param {*} orderBy - the property to order by (e.g. name, price)
 */
function getComparator(order, orderBy) {
	return order === "desc" ? (a, b) => comparator(a, b, orderBy) : (a, b) => -comparator(a, b, orderBy);
}

/**
 * stableSort - sorts the provided data based on a given comparator
 * @param {Array} array - data to sort
 * @param {function} comparator - the function to sort the data
 */
function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

/**
 * CustomTableCell - a cell which renders an input that the user can modify.
 * @param {object} row - Row in the data provided which has changed
 * @param {string} column - The column key which has changed
 */
const CustomTableCell = (props) => {
	const { row, column, onChange } = props;

	const value = column === "first_purchase_date" ? row[column] : row[column];
	const type = column === "first_purchase_date" ? "date" : "number";

	return (
		<TableCell align="left">
			<Input name={column} value={value} onChange={(e) => onChange(e, row, column)} type={type} />
		</TableCell>
	);
};

/**
 * useToolbarStyles - Creates the styling for the toolbar
 */
const useToolbarStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
		display: "flex",
		alignItems: "center",
	},
	highlight:
		theme.palette.type === "light"
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark,
			  },
	title: {
		flex: "1 1 100%",
	},
}));

export default StockTable;
