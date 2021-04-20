import React, { useState } from 'react';
import clsx from 'clsx';

import PortfolioPricesChart from './PortfolioPricesChart';
import SummaryChart from './SummaryChart';
import CreateModal from './CreateModal';

import { portfolio } from '../services/portfolio';

import { NormalText } from '../css/Text';
import { RightAlignedButtonContainer } from '../css/Div';
import { CustomButton } from '../css/Button';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
} from '@material-ui/core';
import Input from "@material-ui/core/Input";
import Checkbox from '@material-ui/core/Checkbox';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten, makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';

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
                {editMode &&
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{ 'aria-label': 'select all stocks' }}
                        />
                    </TableCell>
                }

                {headings.map((cell) => {
                    return (
                        <TableCell
                            key={cell.id}
                            align={cell.numeric ? 'right' : 'left'}
                            padding={cell.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === cell.id ? order : false}
                        >
                            {cell.id === "performance" 
                                ? <Tooltip title='A graph showing the historical prices of the stock.' placement='bottom-start'>
                                    <span>{cell.label}</span>
                                </Tooltip>
                                : (
                                    <TableSortLabel
                                        active={orderBy === cell.id}
                                        direction={orderBy === cell.id ? order : 'asc'}
                                        onClick={createSortHandler(cell.id)}
                                    >
                                        {cell.id === 'value' ? 
                                            <Tooltip title='Total value is equal to #units owned * current market price' placement="bottom-end">
                                                <span>{cell.label}</span>
                                            </Tooltip>
                                            : cell.label
                                        }
                                    </TableSortLabel>
                                )  
                            }
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    )
};

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
                    {place === 'portfolio' ? 'Your Stocks' : 'Most Active Stocks (Daily)'}
                </Typography>
            )}

            {numSelected > 0 &&
                <Tooltip title="Delete">
                    <IconButton onClick={handleDelete} aria-label="filter list">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            }
        </Toolbar>
    );
};

/**
 * StockTable - the body of the table which displays the data
 * @param {} data - the list of data you want to display on the table
 * @param {Array} headings - the list of headings you want to display on the header of the table
 */
function StockTable(props) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [editMode, setEditMode] = useState(false);
    const { data, headings, place, setRows, setPageDirection, page, setPage } = props;

    console.log(data);

    const [previousRows, setPreviousRows] = useState(data);

    // Handle sorting when user clicks on a sort label
    const handleSort = (property) => {
        const ascending = (orderBy === property && order === 'asc');
        setOrder(ascending ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Handles changing the page on the table
    const changePage = (event, newPage) => {
        event.preventDefault();
        console.log('new page is: ', newPage);
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
        const newValue = (changedColumn === 'last_purchased') ? e.target.value : e.target.value;

        const newRows = data.map(row => {
            if (row.ticker === changedRow.ticker) {
                return { ...row, [changedColumn]: newValue };
            } else {
                return { ...row };
            }
        })
        setRows(newRows);
    };

    // For portfolio view - saves changes for a portfolio by making the API call
    function saveChanges() {
        const newPortfolio = {};
        const newStocks = [];
        const newStockMapping = {};

        for (let i = 0; i < data.length; i++) {
            let currentTicker = data[i].ticker;
            if (!(currentTicker in newStockMapping)) {
                newStockMapping[currentTicker] = newStocks.length;
                newStocks.push({
                    ticker: currentTicker,
                    transactions: []
                })
            }
            newStocks[newStockMapping[currentTicker]].transactions.push({
                date: data[i].first_purchase_date,
                volume: data[i].volume,
                price: data[i].vwap,
            })
        }
        newPortfolio['stocks'] = newStocks;

        portfolio.editPortfolio(newPortfolio).then(() => {
            setEditMode(false);
            console.log("Changes saved.");
            setPreviousRows(data);
            setSelected([]);
        }).catch(error => {
            console.log("???");
            alert(error);
        })
    }

    // For portfolio view - Revert changes to the old portfolio 
    function cancelChanges() {
        setEditMode(false);
        console.log("Changes cancelled.");
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
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        // Only allow the user to select if edit mode is on
        if (editMode) {
            setSelected(newSelected);
        }
    };

    // For portfolio view - allows the user to delete rows in the stocktable
    const handleDelete = () => {
        const newRows = data.filter(row => {
            if (selected.indexOf(row.ticker) === -1) {
                return true;
            }
            return false;
        })
        setRows(newRows);
    }

    const [createModalOpen, setCreateModalOpen] = useState(false);

    return (
        <div>
            {(place === 'portfolio' || place === 'watchlist') &&
                <RightAlignedButtonContainer>
                    {editMode ?
                    <>
                        <CustomButton id="save-button" backgroundColor="#00AD30" hoverColor="#2de361" onClick={() => saveChanges()}>Save</CustomButton>
                        <CustomButton id="cancel-button" backgroundColor="#e80000" hoverColor="#ff5757" onClick={() => cancelChanges()}>Cancel</CustomButton>
                    </>
                    :   <CustomButton backgroundColor="#9e22ff" onClick={() => setEditMode(true)}><EditIcon />&nbsp;Edit {place === 'portfolio' ? 'Portfolio' : 'Watchlist'}</CustomButton>
                    }
                </RightAlignedButtonContainer>
            }
            {(place === 'portfolio') && (editMode === true) && (
                <TableToolbar numSelected={selected.length} place={place} handleDelete={handleDelete}></TableToolbar>
            )}
            <TableContainer>
                <Table
                    size="medium"
                    aria-label="Table of stocks in the market"
                >
                    <StockTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleSort}
                        rowCount={data.length}
                        numSelected={selected.length}
                        headings={headings}
                        editMode={editMode}
                        onSelectAllClick={handleSelectAllClick}
                    >
                    </StockTableHead>
                    <TableBody>
                        {stableSort(data, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.ticker);
                                return (
                                    place === "portfolio" ?
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.ticker}
                                            onClick={(event) => handleClick(event, row.ticker)}
                                        >
                                            {editMode &&
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                    />
                                                </TableCell>
                                            }
                                            <TableCell component="th" scope="row" padding="none">
                                                <NormalText>{row.name}</NormalText>
                                                <a href={`/stocks/${row.ticker}`}>{row.ticker}</a>
                                            </TableCell>
                                            <TableCell align="center">
                                                <PortfolioPricesChart ticker={row.ticker} period="last_month"/>
                                            </TableCell>
                                            {editMode ?
                                                <>
                                                    <CustomTableCell row={row} column='first_purchase_date' onChange={onChange}></CustomTableCell>
                                                    <CustomTableCell row={row} column='vwap' onChange={onChange}></CustomTableCell>
                                                    <CustomTableCell row={row} column='volume' onChange={onChange}></CustomTableCell>
                                                </> :
                                                <>
                                                    <TableCell align="right">{row.first_purchase_date}</TableCell>
                                                    <TableCell align="right">{row.vwap}</TableCell>
                                                    <TableCell align="right">{row.volume}</TableCell>
                                                </>
                                            }

                                            <TableCell align="right">{row.price.toFixed(2)}</TableCell>
                                            <TableCell align="right">{(row.volume * row.price).toFixed(2)}</TableCell>
                                        </TableRow> :

                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.ticker}
                                        >
                                            <TableCell component="th" scope="row" padding="none">
                                                <NormalText>{row.name}</NormalText>
                                                <a href={`/stocks/${row.ticker}`}>{row.ticker}</a>
                                            </TableCell>
                                            <TableCell align="center">
                                                <SummaryChart points={row.prev_week_prices} />
                                            </TableCell>
                                            <TableCell align="right">{row.price}</TableCell>
                                        </TableRow>
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
            {editMode &&
                <CustomButton backgroundColor="#9e22ff" hoverColor="#b55cfa" onClick={() => setCreateModalOpen(true)}>
                    <AddCircleIcon />&nbsp;Add New Stock
                </CustomButton>
            }
            {place === 'portfolio' ?
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={changePage}
                    onChangeRowsPerPage={changeRowsPerPage}
                />
                : <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={300}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={changePage}
                    onChangeRowsPerPage={changeRowsPerPage}
                    nextIconButtonProps={{
                        onClick: () => {
                            setPage(page => page + 1);
                            setPageDirection('right')
                        }
                    }}
                    backIconButtonProps={{
                        onClick: () => {
                            setPage(page => page - 1);
                            setPageDirection('left');
                        }
                    }}
                />
            }
            {createModalOpen &&
                <CreateModal setVisibility={setCreateModalOpen} setRows={setRows} />
            }
        </div>
    )
}

/**
 * comparator - compares objects to determine order which they must be in
 * @param {Object} a 
 * @param {Object} b 
 * @param {string} orderBy - property to order the two objects by
 */
function comparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

/**
 * getComparator - returns the correct comparator based on the order given
 * @param {*} order - must be ascending or descending
 * @param {*} orderBy - the property to order by (e.g. name, price)
 */
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => comparator(a, b, orderBy)
        : (a, b) => -comparator(a, b, orderBy);
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

    const value = (column === 'first_purchase_date') ? row[column] : row[column];
    console.log("value: ", value);
    const type = (column === 'first_purchase_date') ? 'date' : 'number';

    return (
        <TableCell align="left">
            <Input
                name={column}
                value={value}
                onChange={e => onChange(e, row, column)}
                type={type}
            />
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
        display: 'flex',
        alignItems: 'center',
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

export default StockTable;
