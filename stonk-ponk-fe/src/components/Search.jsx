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
        const index = options.findIndex([searchItem]);
        console.log(searchItem);
        console.log(index);
        // setResults(options[index]);
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