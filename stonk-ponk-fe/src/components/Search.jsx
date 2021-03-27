import React, { useState } from 'react';
import { SearchButton } from '../css/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

/**
 * 
 * @param {Array} data - list of data options that the user can choose from 
 * @param {funtion} setResults - the setter for the useState of the data we're changing 
 */
function Search(props) {
    const {options, setResults} = props;
    const [searchItem, setSearchItem] = useState('');

    // TODO - Remove the hardcoding and add an API call.
    const onSearch = () => {
        switch (searchItem.name) {
            case "Wesfarmers":
                setResults([options[0]]);
                break;
            case "Atlassian":
                setResults([options[1]]);
                console.log("the new results", [options[1]])
                break;
            case "Alphabet Inc Class C":
                setResults([options[2]]);
                break;
            case "Kogan.com Ltd":
                setResults([options[3]]);
                break;
            case "BHP Group":
                setResults([options[4]]);
                break;
            case "Santos Limited":
                setResults([options[5]]);
                break;
            case "Australia and New Zealand Banking Group Limited":
                setResults([options[6]]);
                break;
            case "Westpac Banking Corporation":
                setResults([options[7]]);
                break;
            case "Airtasker Limited":
                setResults([options[8]]);
                break;
            case "Bendigo and Adelaide Bank Limited":
                setResults([options[9]]);
                break;
            default:
                setResults([]);
                break;
        }
    };

    return(
        <>
            <Autocomplete
                id="search"
                options={options}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                onChange={(e, value) => {
                    console.log("changing value to ", value);
                    setSearchItem(value)
                    // console.log(searchItem);
                    // onSearch();
                }}
                renderInput={(params) => <TextField {...params} label="Search..." variant="outlined" />}
            />
            <SearchButton aria-label="search for the stock in the search bar" onClick={onSearch}>Search</SearchButton>
        </>
    )
}

export default Search;