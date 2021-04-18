import React, { useEffect, useState } from 'react';
import { ModalContainer, ModalContent } from '../css/Div';
import { GenericForm, InputUnderlineDiv, ModalLabel, TextField } from '../css/Form';
import { TextField as AutocompleteTextField } from '@material-ui/core';
import { CloseButton, CustomButton } from '../css/Button';
import { ColorText, SubText, SubTitle } from '../css/Text';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { market } from '../services/market';


function CreateModal(props) {
    const { setVisibility, setRows, place } = props;

    //TODO NOTE: Params will need the stock data from the BE, and the ability to set the rows

    const [purchasePrice, setPurchasePrice] = useState(0);
    const [unitsOwned, setUnitsOwned] = useState(1);
    const [purchaseDate, setPurchaseDate] = useState(Date.now());
    const [selectedStock, setSelectedStock] = useState({ name: '', ticker: '' });
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);
    const [stockOptions, setStockOptions] = useState([]);

    function createStockRow() {
        const newRow = {};
        newRow['name'] = selectedStock.name;
        newRow['ticker'] = selectedStock.ticker;
        newRow['price'] = selectedStock.price; // current price, gotten from backend
        if (place === 'portfolio') {
            newRow['first_purchase_date'] = purchaseDate;
            newRow['volume'] = unitsOwned;
            newRow['vwap'] = purchasePrice; // This is the price that they purchased at - will be recalculated TODO
        }
        console.log(`row here`);
        console.log(newRow);
        return newRow;
    };

    function handleSubmit(event) {
        event.preventDefault();
        const newRow = createStockRow();
        setRows(rows => [...rows, newRow]);
        setVisibility(false);
    };

    useEffect(() => {
        let results = [];
        setError(false);
        market.getStockDetail(input)
            .then(response => response.json())
            .then(res => {
                results.push(res);
            })
            .catch((e) => {
                console.log('Could not find stock on US market.');
            }).then(() => market.getStockDetail(input + ".AX"))
            .then(response => response.json())
            .then(res => {
                results.push(res);
            }).catch((e) => {
                console.log('Could not find stock on AUS market.');
            }).finally(() => {
                setStockOptions(results);
            })
    }, [input]);

    return (
        <ModalContainer>
            <ModalContent>
                <CloseButton onClick={() => setVisibility(false)} >&times;</CloseButton>
                <GenericForm onSubmit={(event) => handleSubmit(event)}>
                    <SubTitle>Add a new stock</SubTitle>

                    <ModalLabel htmlFor="search">Stock Ticker</ModalLabel>
                    <SubText>Don't know the ticker? Find it on: </SubText>
                    <Autocomplete
                        options={stockOptions}
                        getOptionLabel={(option) => option.name}
                        onChange={(e, value) => setSelectedStock(value)}
                        style={{ width: '100%' }}
                        renderInput={(params) => <AutocompleteTextField {...params} label="Enter your ticker..." variant="outlined" />}
                        onInputChange={(e, value) => { console.log("Setting input to: ", value); setInput(value); }}
                        noOptionsText="No stocks found."
                        filterOptions={x => x}
                    />
                    {error &&
                        <ColorText color="#e80000">Error, this stock does not exist.</ColorText>
                    }
                    <InputUnderlineDiv width="100%" className="underline" />
                    {place === 'portfolio' &&
                        <>
                            <ModalLabel htmlFor="purchase-data">Purchase Date</ModalLabel>
                            <TextField id="purchase-date" type="date" defaultValue={purchaseDate} required onChange={(e) => { setPurchaseDate(e.target.value) }} />
                            <InputUnderlineDiv width="100%" className="underline" />

                            <ModalLabel htmlFor="purchase-price">Purchase Price</ModalLabel>
                            <TextField id="purchase-price" type="number" min={1} step="0.01" defaultValue={purchasePrice} required onChange={(e) => { setPurchasePrice(e.target.value) }} />
                            <InputUnderlineDiv width="100%" className="underline" />

                            <ModalLabel htmlFor="units-owned">Units Bought</ModalLabel>
                            <TextField id="units-owned" type="number" min={1} defaultValue={unitsOwned} required onChange={(e) => { setUnitsOwned(e.target.value) }} />
                            <InputUnderlineDiv width="100%" className="underline" />
                        </>
                    }

                    <CustomButton type="submit" margin="2em 0" value="Add Stock" aria-label="Button to add stock">Add Stock</CustomButton>
                </GenericForm>
            </ModalContent>
        </ModalContainer>

    )
}

export default CreateModal;