import React, { useState } from 'react';
import Navigation from './Navigation';
import Select from 'react-select'
import { MarketFilterContainer } from '../css/Div';
import { SearchButton } from '../css/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';

import StockTable from './StockTable';
import { TextField } from '@material-ui/core';

// Headings for each table column
const headings = [
    { id: 'name', disablePadding: true, numeric: false, label: 'Name' },
    { id: 'performance', disablePadding: false, numeric: false, label: 'Performance' },
    { id: 'price', disablePadding: false, numeric: true, label: 'Current Price' },
];

// Filter for sectors
const sectorOptions = [
    { value: 'all', label: 'All' },
    { value: 'aus', label: 'Australia' },
    { value: 'us', label: 'US' },
];

// Filter for security type (ETFs, Shares)
const securityTypeOption = [
    { value: 'all', label: 'All' },
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
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
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
        { name: 'Alphabet Inc Class C', ticker: 'GOOG', performance: 'graph', price: 2061.92, sector: 'aus', type: 'etf' },
        { name: 'Kogan.com Ltd', ticker: 'KGN', performance: 'graph', price: 2061.92, sector: 'aus', type: 'stock' },
        { name: 'BHP Group', ticker: 'BHP', performance: 'graph', price: 2399.32, sector: 'aus', type: 'stock' },
        { name: 'Santos Limited', ticker: 'STO', performance: 'graph', price: 499.00, sector: 'us', type: 'stock' },
        { name: 'Australia and New Zealand Banking Group Limited', ticker: 'ANZ', performance: 'graph', price: 80.42, sector: 'us', type: 'derivative' },
        { name: 'Westpac Banking Corporation', ticker: 'WBC', performance: 'graph', price: 320.00, sector: 'us', type: 'derivative' },
        { name: 'Airtasker Limited', ticker: 'ART', performance: 'graph', price: 20.53, sector: 'us', type: 'derivative' },
        { name: 'Bendigo and Adelaide Bank Limited', ticker: 'BEN', performance: 'graph', price: 443.0, sector: 'us', type: 'derivative' },
    ];

    // Component will rerender upon filtering the rows
    const [rows, setRows] = useState(data);

    const [searchItem, setSearchItem] = useState('');
    // boi this is hardcoded for now cuz we got no api 
    const onSearch = () => {
        switch (searchItem.name) {
            case "Wesfarmers":
                setRows([data[0]]);
                break;
            case "Atlassian":
                setRows([data[1]]);
                break;
            case "Alphabet Inc Class C":
                setRows([data[2]]);
                break;
            case "Kogan.com Ltd":
                setRows([data[3]]);
                break;
            case "BHP Group":
                setRows([data[4]]);
                break;
            case "Santos Limited":
                setRows([data[5]]);
                break;
            case "Australia and New Zealand Banking Group Limited":
                setRows([data[6]]);
                break;
            case "Westpac Banking Corporation":
                setRows([data[7]]);
                break;
            case "Airtasker Limited":
                setRows([data[8]]);
                break;
            case "Bendigo and Adelaide Bank Limited":
                setRows([data[9]]);
                break;
            default:
                setRows([]);
                break;
        }
    };

    return (
        <>
            <Navigation />
            <h1>Market</h1>
            <MarketFilterContainer>
                <Select styles={customStyles} options={sectorOptions} defaultValue={{ value: 'all', label: 'All' }} aria-label="Dropdown for filtering by sector." onChange={(e) => { setRows(onSectorChange(e, data)) }} />
                <Select styles={customStyles} options={securityTypeOption} defaultValue={{ value: 'all', label: 'All' }} aria-label="Dropdown for filtering by security type." onChange={(e) => { setRows(onSecurityChange(e, data)) }} />
                <Autocomplete
                    id="search"
                    options={data}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300 }}
                    onChange={(e, value) => setSearchItem(value)}
                    renderInput={(params) => <TextField {...params} label="Search..." variant="outlined" />}
                />
                <SearchButton aria-label="search for the stock in the search bar" onClick={onSearch}>Search</SearchButton>
            </MarketFilterContainer>
            <div className="stock-container">
                <StockTable data={rows} headings={headings} place="market"></StockTable>
            </div>
        </>
    )
}

export default Market;