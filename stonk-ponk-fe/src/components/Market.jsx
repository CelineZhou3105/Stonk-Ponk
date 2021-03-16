import React, { useState } from 'react';

import Navigation from './Navigation';
import SummaryChart from './SummaryChart';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from '@material-ui/core';

import Select from 'react-select'

import { MarketFilterContainer } from '../css/Div';

import { history } from '../helpers/history';
  
// Headings for each table column
const headings = [
    { id: 'name', disablePadding: true, numeric: false, label: 'Name' },
    { id: 'performance', disablePadding: false, numeric: false, label: 'Performance' },
    { id: 'price', disablePadding: false, numeric: true, label: 'Current Price' },
];


// Comparator to determine the order which items should be displayed
function comparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => comparator(a, b, orderBy)
        : (a, b) => -comparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

/** StockTableHead - Header row for the table */
function StockTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headings.map((cell) => {
                    return(
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

function StockTable(props) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { data } = props;

    const handleSort = (event, property) => {
        const ascending = (orderBy === property && order === 'asc');
        setOrder(ascending ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const changePage = (event, newPage) => {
        setPage(newPage);
    };

    const changeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
        <div>
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
                    >
                    </StockTableHead>
                    <TableBody>
                        {stableSort(data, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {

                            return (
                                <TableRow 
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.name}
                                >
                                    <TableCell component="th" scope="row" padding="none">
                                        {row.name}
                                        <br/>
                                        <a href={`/stocks/${row.ticker}`}>{row.ticker}</a>
                                    </TableCell>
                                    <TableCell align="center">
                                        <SummaryChart/>
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
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={changePage}
                onChangeRowsPerPage={changeRowsPerPage}
            />
        </div>
    )

}

// Filter for sectors
const sectorOptions = [
    { value: 'all', label: 'All'},
    { value: 'aus', label: 'Australia' },
    { value: 'us', label: 'US' },
];

// Filter for security type (ETFs, Shares)
const securityTypeOption = [
    { value: 'all', label: 'All'},
    { value: 'stock', label: 'Stocks' },
    { value: 'derivative', label: 'Deriviatives' },
    { value: 'etf', label: 'ETFs' },
];


export function onSectorChange(event, stocks) {
    if (event.value === 'all') {
        return stocks;
    }
    const filteredData = stocks.filter((stock) => stock.sector === event.value);
    return filteredData;
};

export function onSecurityChange(event, stocks) {
    if (event.value === 'all') {
        return stocks;
    }
    const filteredData = stocks.filter((stock) => stock.type === event.value);
    return filteredData;
};

const customStyles = {
    menu: (provided, state) => ({
        ...provided,
        width: 200,
        backgroundColor: 'white',
        padding: 10,
    }),
    control: (styles) => ({
        ...styles,
        width: 200,
    }),
    option: (styles, {data, isDisabled, isFocused, isSelected}) => {
        return{
            ...styles,
            color: 'black',
            backgroundColor: isFocused ? 'rgba(158, 34, 255, 0.48)' : null,
        }
    }
};

function Market() {

    // TODO - Remove dummy data to populate table
    const data = [
        { name: 'Wesfarmers', ticker: 'WES', performance: 'graph', price: 590.48, sector: 'aus', type: 'etf' },
        { name: 'Atlassian', ticker: 'TEAM', performance: 'graph', price: 300.42, sector: 'aus', type: 'etf' },
        { name: 'Alphabet Inc Class C', ticker: 'GOOG', performance: 'graph', price: 2061.92, sector: 'aus', type: 'etf'},
        { name: 'Kogan.com Ltd', ticker: 'KGN', performance: 'graph', price: 2061.92, sector: 'aus', type: 'stock'},
        { name: 'BHP Group', ticker: 'BHP', performance: 'graph', price: 2399.32, sector: 'aus', type: 'stock'},
        { name: 'Santos Limited', ticker: 'STO', performance: 'graph', price: 499.00, sector: 'us', type: 'stock'},
        { name: 'Australia and New Zealand Banking Group Limited', ticker: 'ANZ', performance: 'graph', price: 80.42, sector: 'us', type: 'derivative' },
        { name: 'Westpac Banking Corporation', ticker: 'WBC', performance: 'graph', price: 320.00, sector: 'us', type: 'derivative' },
        { name: 'Airtasker Limited', ticker: 'ART', performance: 'graph', price: 20.53, sector: 'us', type: 'derivative' },
        { name: 'Bendigo and Adelaide Bank Limited', ticker: 'BEN', performance: 'graph', price: 443.0, sector: 'us', type: 'derivative'},
    ];

    // Component will rerender upon filtering the rows
    const [rows, setRows] = useState(data);

    return (
        <>
            <Navigation />
            <h1>Market</h1>
            <MarketFilterContainer>
                <Select styles={customStyles} options={sectorOptions} defaultValue={{value: 'all', label: 'All'}} aria-label="Dropdown for filtering by sector." onChange={(e) => {setRows(onSectorChange(e, data))}}/>
                <Select styles={customStyles} options={securityTypeOption} defaultValue={{value: 'all', label: 'All'}} aria-label="Dropdown for filtering by security type." onChange={(e) => {setRows(onSecurityChange(e, data))}}/>
            </MarketFilterContainer>
            <div className="stock-container">
                <StockTable data={rows}></StockTable>
            </div>
        </>
    )
}

export default Market;