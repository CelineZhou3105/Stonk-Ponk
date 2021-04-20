import React, { useEffect, useRef, useState } from 'react';

import { market } from '../services/market';

import { 
    ModalContainer,
    ModalContent,
    RightAlignedButtonContainer
} from '../css/Div';
import { 
    CreateModalForm,
    InputUnderlineDiv, 
    ModalLabel, 
    TextField 
} from '../css/Form';
import { CloseButton, CustomButton } from '../css/Button';
import { ColorText, Link, SubText, SubTitle } from '../css/Text';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField as AutocompleteTextField } from '@material-ui/core';

/**
 * CreateModal - Modal for adding stocks to a user's portfolio.
 * @param {function} setVisibility - useState setter for controlling the visibility of the create modal 
 * @param {function} setRows - useState setter for controlling the rows of data in the stock table
 */
function CreateModal(props) {
    const {setVisibility, setRows} = props;

    const [purchasePrice, setPurchasePrice] = useState(0);
    const [unitsOwned, setUnitsOwned] = useState(1);
    const [purchaseDate, setPurchaseDate] = useState(Date.now());
    const [selectedStock, setSelectedStock] = useState({name: '', ticker: ''});
    const [input, setInput] = useState('');
    const [stockOptions, setStockOptions] = useState([]);

    // For errors
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Aborter for cancelling previous API calls
    const lastAbortController = useRef();

    // Selected stock on the menu
    const [stockTicker, setStockTicker] = useState('');

    function createStockRow() {
        const newRow = {};
        newRow['name'] = selectedStock.name;
        newRow['ticker'] = selectedStock.ticker;
        newRow['price'] = selectedStock.price; // current price, gotten from backend
        newRow['first_purchase_date'] = purchaseDate;
        newRow['volume'] = unitsOwned;
        newRow['vwap'] = purchasePrice; // This is the price that they purchased at - will be recalculated TODO
        return newRow;
    };

    function handleSubmit(event) {
        event.preventDefault();
        
        // Check that the date is not a weekend
        const day = new Date(purchaseDate).getUTCDay();
        console.log("DAY", day);
        if([6,0].includes(day)) {
            setError(true);
            setErrorMsg('Cannot enter weekends as they are not valid trading days.')
            return;
        }
        const newRow = createStockRow();
        setRows(rows => [...rows, newRow])
        setVisibility(false);
    };

    // Makes an API call to retrieve search results when user has entered a ticker
    useEffect(() => {
        if (input !== null) {
            if (lastAbortController.current) {
                lastAbortController.current.abort();
            }
            // Create new AbortController for the new request and store it in the ref
            const currentAbortController = new AbortController();
            lastAbortController.current = currentAbortController;

            const currentPromise = market.checkTickerExists(input, currentAbortController)
            .then(response => response.json())
            
            currentPromise
            .then(res => {
                console.log(res);
                setStockOptions(res);
            }).catch(error => {
                // Do nothing - this means there are no search results, which is normal
            })
        }
    }, [input])

    // Gets the rest of the details of the stock selected
    useEffect(() => {
        market.getStockDetail(stockTicker)
        .then(response => response.json())
        .then(res => {
            setSelectedStock(res);
        }).catch(() => {
            console.log("No stock with that ticker");
        })
    }, [stockTicker])

    // Do nothing if the person clears the search bar, otherwise get news for the stock
    const handleInputChange = (event, value, reason) => {
        if (reason === "clear" ||  value === '') {
            // Set it back to market news
            setSelectedStock(null);
            setInput(null);
        } else {
            console.log("Getting results for...", value);
            setInput(value);
        }
    }

    return(
        <ModalContainer>
            <ModalContent>
                <RightAlignedButtonContainer>
                    <CloseButton onClick={() => setVisibility(false)} >&times;</CloseButton>
                </RightAlignedButtonContainer>
                <CreateModalForm onSubmit={(event) => handleSubmit(event)}>
                    
                    <SubTitle>Add a new stock</SubTitle>
                    
                    <ModalLabel htmlFor="search">Stock Ticker</ModalLabel>
                    <SubText>Don't know the ticker? Find it on: <Link href="https://www.marketwatch.com/tools/quotes/lookup.asp">Market Watch</Link></SubText>
                    <Autocomplete
                        options={stockOptions}
                        getOptionLabel={(option) => option.name}
                        onChange={(e, value) => { setStockTicker(value.ticker)}}
                        style={{ width: '100%' }}
                        renderInput={(params) => <AutocompleteTextField {...params} label="Enter your ticker..." variant="outlined" />}
                        onInputChange={(e, value, reason) => { 
                            console.log("Setting input to: ", value); 
                            handleInputChange(e, value, reason);
                        }}
                        noOptionsText="No stocks found."
                        filterOptions={x => x}
                    />
                    <InputUnderlineDiv width="100%" className="underline"/>

                    <ModalLabel htmlFor="purchase-date">Purchase Date</ModalLabel>
                    <TextField id="purchase-date" type="date" defaultValue={purchaseDate} required onChange={(e) => { setPurchaseDate(e.target.value) }} />
                    <InputUnderlineDiv width="100%" className="underline"/>

                    <ModalLabel htmlFor="purchase-price">Purchase Price</ModalLabel>
                    <TextField id="purchase-price" type="number" min={1} step="0.01" defaultValue={purchasePrice} required onChange={(e) => { setPurchasePrice(e.target.value) }} />
                    <InputUnderlineDiv width="100%" className="underline"/>

                    <ModalLabel htmlFor="units-owned">Units Bought</ModalLabel>
                    <TextField id="units-owned" type="number" min={1} defaultValue={unitsOwned} required onChange={(e) => { setUnitsOwned(e.target.value) }} />
                    <InputUnderlineDiv width="100%" className="underline"/>

                    <CustomButton type="submit" margin="2em auto" value="Add Stock" aria-label="Button to add stock to portfolio">Add Stock</CustomButton>
                </CreateModalForm>
                {error && (
                    <ColorText color="red">{errorMsg}</ColorText>
                )}
            </ModalContent>
        </ModalContainer>
        
    )
}

export default CreateModal;