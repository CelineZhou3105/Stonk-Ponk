import React, { useState } from 'react';
import clsx from 'clsx';
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
import SummaryChart from './SummaryChart';
import { NormalText } from '../css/Text';
import { RightAlignedButtonContainer } from '../css/Div';
import { CustomButton } from '../css/Button';
import { lighten, makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import CreateModal from './CreateModal';


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
                            {cell.id === "performance" ? (cell.label) : (
                                <TableSortLabel
                                    active={orderBy === cell.id}
                                    direction={orderBy === cell.id ? order : 'asc'}
                                    onClick={createSortHandler(cell.id)}
                                >
                                    {cell.label}
                                </TableSortLabel>)
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
    const { numSelected, handleDelete } = props;

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
                    Your Stocks
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
    const { data, headings, place, setRows, pageDirection, setPageDirection, page, setPage } = props;

    console.log(data);

    const [previousRows, setPreviousRows] = useState(data);

    const handleSort = (property) => {
        const ascending = (orderBy === property && order === 'asc');
        setOrder(ascending ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const changePage = (event, newPage) => {
        event.preventDefault();
        console.log('new page is: ', newPage);
        setPage(newPage);
    };

    const changeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const onChange = (e, changedRow, changedColumn) => {
        console.log(Date.parse(e.target.value));
        const newValue = (changedColumn === 'last_purchased') ? Date.parse(e.target.value) / 1000 : e.target.value;

        const newRows = data.map(row => {
            if (row.ticker === changedRow.ticker) {
                return { ...row, [changedColumn]: newValue };
            } else {
                return { ...row };
            }
        })
        setRows(newRows);
    };

    function saveChanges() {
        // TODO: Call the API to save changes
        setEditMode(false);
        console.log("Changes saved.");
        setPreviousRows(data);
        setSelected([]);
    }

    function cancelChanges() {
        // TODO: Call the API to save changes
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

        setSelected(newSelected);
    };

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
            {place === 'portfolio' &&
                <RightAlignedButtonContainer>
                    {!editMode &&
                        <CustomButton backgroundColor="#9e22ff" hoverColor="#b55cfa" onClick={() => setEditMode(true)}><EditIcon />&nbsp;Edit Portfolio</CustomButton>
                    }
                    {editMode &&
                        <>
                            <CustomButton id="save-button" backgroundColor="#00AD30" hoverColor="#2de361" onClick={() => saveChanges()}>Save</CustomButton>
                            <CustomButton id="cancel-button" backgroundColor="#e80000" hoverColor="#ff5757" onClick={() => cancelChanges()}>Cancel</CustomButton>
                        </>
                    }
                </RightAlignedButtonContainer>
            }
            <TableToolbar numSelected={selected.length} handleDelete={handleDelete}></TableToolbar>
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
                                            key={row.name}
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
                                                <SummaryChart pricePoints={[]} />
                                            </TableCell>
                                            {editMode ?
                                                <>
                                                    <CustomTableCell row={row} column='last_purchased' onChange={onChange}></CustomTableCell>
                                                    <CustomTableCell row={row} column='purchase_price' onChange={onChange}></CustomTableCell>
                                                    <CustomTableCell row={row} column='units_owned' onChange={onChange}></CustomTableCell>
                                                </> :
                                                <>
                                                    <TableCell align="right">{formatDate(row.last_purchased)}</TableCell>
                                                    <TableCell align="right">{row.purchase_price}</TableCell>
                                                    <TableCell align="right">{row.units_owned}</TableCell>
                                                </>
                                            }

                                            <TableCell align="right">{row.price}</TableCell>
                                            <TableCell align="right">{(row.units_owned * row.price).toFixed(2)}</TableCell>
                                        </TableRow> :

                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.name}
                                        >
                                            <TableCell component="th" scope="row" padding="none">
                                                <NormalText>{row.name}</NormalText>
                                                <a href={`/stocks/${row.ticker}`}>{row.ticker}</a>
                                            </TableCell>
                                            <TableCell align="center">
                                                <SummaryChart points={[]} />
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
            <TablePagination
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
    const value = (column === 'last_purchased') ? formatDate(row[column]) : row[column];
    const type = (column === 'last_purchased') ? 'date' : 'number';

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

export default StockTable;


/**
 * formatDate - converts a unix timestamp to a readable date
 * @param {number} date - number of seconds in Unix time  
 */
function formatDate(date) {
    var d = new Date(date * 1000),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


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
