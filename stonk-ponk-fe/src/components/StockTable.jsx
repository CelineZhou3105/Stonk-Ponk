import React, { useState } from 'react';
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
import SummaryChart from './SummaryChart';
import { NormalText } from '../css/Text';

/**
 * StockTableHead - The header column of the table
 * @param {string} order - Ascending or descending
 * @param {string} orderBy - The property you wish to order by (e.g. name, price)
 * @param {function} onRequestSort - The function you wish to trigger when a sort event is triggered 
 * (i.e. someone clicks 'sort' on a table column)
 * @param {Array} headings - an array of strings for headings of each column in the table 
 */
function StockTableHead(props) {
    const { order, orderBy, onRequestSort, headings } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
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
 * StockTable - the body of the table which displays the data
 * @param {} data - the list of data you want to display on the table
 * @param {Array} headings - the list of headings you want to display on the header of the table
 */
function StockTable(props) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { data, headings, place } = props;

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
                        headings={headings}
                    >
                    </StockTableHead>
                    <TableBody>
                        {stableSort(data, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    place === "portfolio" ?
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
                                                <SummaryChart />
                                            </TableCell>
                                            <TableCell align="right">{new Date(row.last_purchased).toDateString()}</TableCell>
                                            <TableCell align="right">{row.purchase_price}</TableCell>
                                            <TableCell align="right">{row.price}</TableCell>
                                            <TableCell align="right">{row.units_owned}</TableCell>
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
                                                <SummaryChart />
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

export default StockTable;