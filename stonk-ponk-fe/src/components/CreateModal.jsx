import React, {useState} from 'react';
import { ModalContainer, ModalContent} from '../css/Div';
import { GenericForm, GenericSubmitButton, InputUnderlineDiv, ModalLabel, TextField } from '../css/Form';
import { TextField as AutocompleteTextField } from '@material-ui/core';
import { CloseButton } from '../css/Button';
import { SubTitle } from '../css/Text';
import Autocomplete from '@material-ui/lab/Autocomplete';


function CreateModal(props) {
    const {setVisibility, setRows} = props;

    //TODO NOTE: Params will need the stock data from the BE, and the ability to set the rows

    const [purchasePrice, setPurchasePrice] = useState(0);
    const [unitsOwned, setUnitsOwned] = useState(1);
    const [purchaseDate, setPurchaseDate] = useState(Date.now());
    const [selectedStock, setSelectedStock] = useState('');

    //TODO - Get options from the backend
    const options = [
        { name: 'Company A', ticker: 'ABC', performance: 'graph', price: 590.48, sector: 'aus', type: 'etf' },
        { name: 'Company B', ticker: 'DEF', performance: 'graph', price: 300.42, sector: 'aus', type: 'etf' },
        { name: 'Company C', ticker: 'GHI', performance: 'graph', price: 2061.92, sector: 'aus', type: 'etf' },
        { name: 'Company D', ticker: 'JKL', performance: 'graph', price: 2061.92, sector: 'aus', type: 'stock' },
    ];

    function createStockRow() {
        const newRow = {};
        newRow['name'] = selectedStock.name;
        newRow['ticker'] = selectedStock.ticker;
        newRow['price'] = selectedStock.price;
        newRow['sector'] = selectedStock.sector;
        newRow['type'] = selectedStock.type;
        newRow['first_purchase_date'] = Date.parse(purchaseDate)/1000;
        newRow['units_owned'] = unitsOwned;
        newRow['purchase_price'] = purchasePrice;
        newRow['original_contribution'] = purchasePrice * unitsOwned;

        return newRow;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const newRow = createStockRow();
        setRows(rows => [...rows, newRow])
        setVisibility(false);
    }


    return(
        <ModalContainer>
            <ModalContent>
                <GenericForm onSubmit={(event) => handleSubmit(event)}>
                    <CloseButton onClick={() => setVisibility(false)} >&times;</CloseButton>
                    <SubTitle>Add a new stock</SubTitle>
                    
                    <ModalLabel htmlFor="search">Stock Name</ModalLabel>
                    <Autocomplete
                        id="search"
                        options={options}
                        getOptionLabel={(option) => option.name}
                        style={{ width: '100%' }}
                        onChange={(e, value) => { setSelectedStock(value)}}
                        renderInput={(params) => <AutocompleteTextField {...params} label="Search..." variant="outlined" />}
                    />
                    <InputUnderlineDiv width="100%" className="underline"/>

                    <ModalLabel htmlFor="purchase-data">Purchase Date</ModalLabel>
                    <TextField id="purchase-data" type="date" defaultValue={purchaseDate} required onChange={(e) => { setPurchaseDate(e.target.value) }} />
                    <InputUnderlineDiv width="100%" className="underline"/>

                    <ModalLabel htmlFor="purchase-price">Purchase Price</ModalLabel>
                    <TextField id="purchase-price" type="text" defaultValue={purchasePrice} required onChange={(e) => { setPurchasePrice(e.target.value) }} />
                    <InputUnderlineDiv width="100%" className="underline"/>

                    <ModalLabel htmlFor="units-owned">Units Owned</ModalLabel>
                    <TextField id="units-owned" type="number" min={1} defaultValue={unitsOwned} required onChange={(e) => { setUnitsOwned(e.target.value) }} />
                    <InputUnderlineDiv width="100%" className="underline"/>

                    <GenericSubmitButton type="submit" value="Add Stock" aria-label="Button to login" />
                </GenericForm>
            </ModalContent>
        </ModalContainer>
        
    )
}

export default CreateModal;